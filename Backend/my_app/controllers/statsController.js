const Bill = require('../models/billModel')


exports.getDashboardData = async (req, res) => {
  try {

    const { year, month, date } = req.query;

    const selectedDate = new Date(date || Date.now());

    const IST_OFFSET = 5.5 * 60 * 60 * 1000;
    // Convert to IST
    const ist = new Date(selectedDate.getTime() + IST_OFFSET);

    // Start of IST day
    const startOfIST = new Date(ist);
    startOfIST.setHours(0, 0, 0, 0);

    // Convert back to UTC for DB query
    const startOfDay = new Date(startOfIST.getTime() - IST_OFFSET);
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000 - 1);
   
    const istStart = new Date(Date.UTC(year, month - 1, 1));
    const istEnd = new Date(Date.UTC(year, month, 1));  

    const startOfMonth = new Date(istStart.getTime() - IST_OFFSET);
    const endOfMonth = new Date(istEnd.getTime() - IST_OFFSET);

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
            _id: { $dayOfMonth: { date: "$date", timezone: "Asia/Kolkata" } },
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


