const Bill = require('../models/billModel')


exports.getDashboardData = async (req, res) => {
  try {

    const { year, month, date } = req.query;

    const selectedDate = new Date(date || Date.now());
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month, 0).getDate();

    // 🔥 Run everything parallel (VERY IMPORTANT)
    const [
      dailyData,
      monthlyData,
      trendData,
      categoryData,
      topSellerData
    ] = await Promise.all([

      // 1️⃣ Daily Box
      Bill.aggregate([
        { $match: { date: { $gte: startOfDay, $lte: endOfDay } } },
        {
          $group: {
            _id: null,
            totalSales: { $sum: "$totalAmount" },
            totalBills: { $sum: 1 }
          }
        }
      ]),

      // 2️⃣ Monthly Box
      Bill.aggregate([
        { $match: { date: { $gte: startOfMonth, $lt: endOfMonth } } },
        {
          $group: {
            _id: null,
            totalSales: { $sum: "$totalAmount" },
            totalBills: { $sum: 1 }
          }
        }
      ]),

      // 3️⃣ Trend Graph
      Bill.aggregate([
        { $match: { date: { $gte: startOfMonth, $lt: endOfMonth } } },
        {
          $group: {
            _id: { $dayOfMonth: "$date" },
            totalSales: { $sum: "$totalAmount" }
          }
        }
      ]),

      // 4️⃣ Pie Chart
      Bill.aggregate([
        { $match: { date: { $gte: startOfMonth, $lt: endOfMonth } } },
        { $unwind: "$items" },
        {
          $group: {
            _id: "$items.category",
            totalRevenue: { $sum: "$items.total" }
          }
        }
      ]),

      // 5️⃣ Top Seller
      Bill.aggregate([
        { $match: { date: { $gte: startOfMonth, $lt: endOfMonth } } },
        { $unwind: "$items" },
        {
          $group: {
            _id: "$items.name",
            totalQuantity: { $sum: "$items.quantity" }
          }
        },
        { $sort: { totalQuantity: -1 } },
        { $limit: 5 }
      ])
    ]);

    // 🔥 Fill Missing Days for Trend
    const salesMap = {};
    trendData.forEach(item => {
      salesMap[item._id] = item.totalSales;
    });

    const finalTrend = [];
    for (let day = 1; day <= daysInMonth; day++) {
      finalTrend.push({
        day,
        totalSales: salesMap[day] || 0
      });
    }

    // Normalize aggregation results to frontend-friendly shape
    const formattedCategorySales = categoryData.map(item => ({
      category: item._id || "Unknown",
      totalRevenue: item.totalRevenue
    }));

    const formattedTopSellers = topSellerData.map(item => ({
      category: item._id || "Unknown",
      totalQuantity: item.totalQuantity
    }));

    res.json({
      daily: dailyData[0] || { totalSales: 0, totalBills: 0 },
      monthly: monthlyData[0] || { totalSales: 0, totalBills: 0 },
      trend: finalTrend,
      categorySales: formattedCategorySales,
      topSellers: formattedTopSellers
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


