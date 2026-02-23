const Bill = require('../models/billModel')


exports.getDashboardData = async (req, res) => {
  try {

    const { year, month, date } = req.query;

    const selectedDate = new Date(date || Date.now());
    const startOfDay = new Date(selectedDate.setHours(0,0,0,0));
    const endOfDay = new Date(selectedDate.setHours(23,59,59,999));

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

    res.json({
      daily: dailyData[0] || { totalSales: 0, totalBills: 0 },
      monthly: monthlyData[0] || { totalSales: 0, totalBills: 0 },
      trend: finalTrend,
      categorySales: categoryData,
      topSellers: topSellerData
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// //box1
// exports.getDailySales = async (req,res) => {
//     try{
//         const {date} = req.query;

//         if (!date) {
//             return res.status(400).json({message:"Date is required"});
//         }
//         const selectDate = new Date(date)

//         const startOfTheDay = new Date(selectDate.setHours(0,0,0,0));
//         const endOfTheDay = new Date(selectDate.setHours(23,59,59,999)); 


//         const result = await Bill.aggregate([
//             {
//                 $match:{
//                     date:{
//                         $gte: startOfTheDay,
//                         $lte: endOfTheDay
//                     }
//                 }
//             },
//             {
//                 $group:{
//                     _id: null,
//                     totalSales:{ $sum: "$totalAmount"},
//                     totalBills:{ $sum: 1}
//                 }
//             }
//         ]);
//         res.json(result[0] || {totalSales:0,totalBills:0});
//     }catch (err) {
//         res.status(500).json({error: err.message });
//     }
// };

// //box 2
// exports.getMonthlySales = async (req,res) => {
//     try{
//         const { year, month } = req.query;
//         const startDate = new Date(year,month-1,1)
//         const endDate = new Date(year,month,1)

//         const result = await Bill.aggregate([
//             {
//                 $match:{
//                     date:{
//                         $gte: startDate,
//                         $lt: endDate
//                     }
//                 }
//             },
//             {
//                 $group:{
//                     _id:null,
//                     totalSales:{ $sum: "$totalAmount"},
//                     totalBills:{ $sum: 1}
//                 }
//             }
//         ]);
//         res.json(result[0] || {totalSales:0,totalBills:0});

//         }
//         catch (err) {
//         res.status(500).json({error: err.message });
//     }
// };

// //trend graph
// exports.monthlySalesTrend = async (req, res) => {
//   try {
//     const { year, month } = req.query;

//     const startDate = new Date(year, month - 1, 1);
//     const endDate = new Date(year, month, 1);

//     // Get number of days in month
//     const daysInMonth = new Date(year, month, 0).getDate();

//     const salesData = await Bill.aggregate([
//       {
//         $match: {
//           date: { $gte: startDate, $lt: endDate }
//         }
//       },
//       {
//         $group: {
//           _id: { $dayOfMonth: "$date" },
//           totalSales: { $sum: "$totalAmount" }
//         }
//       }
//     ]);

//     // Convert aggregation result to map
//     const salesMap = {};
//     salesData.forEach(item => {
//       salesMap[item._id] = item.totalSales;
//     });

//     // Create full month data (1 to last day)
//     const finalData = [];

//     for (let day = 1; day <= daysInMonth; day++) {
//       finalData.push({
//         day,
//         totalSales: salesMap[day] || 0
//       });
//     }

//     res.json(finalData);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// //bar chart
// exports.topSellerForCurrentMonth = async (req,res) => {
//     try
//     {
//         const { year,month } = req.query;
//         const startDate = new Date(year,month-1,1)
//         const endDate = new Date(year,month,1)

//         const result = await Bill.aggregate([
//         {
//             $match:{
//                 date:{
//                     $gte: startDate,
//                     $lt: endDate
//                 }
//             }
//         },

//         {$unwind: "$items"},

//         {
//             $group: {
//                 _id:
//                 {
//                     category:"$items.category",
//                     itemName:"$item.name"
//                 },
//                 totalQuantity: { $sum: "$items.quantity"},
//             }
//         }, 
//         { 
//             $sort: {
//                 "_id.categoty": 1,
//                 totalQuantity : -1}
//         },
//         {
//             $group:{
//                 _id:"$_id.categoty",
//                 topItem:{$firs: "$_id.itemName"},
//                 totalQuantity:{ $first: "$totalQuantity"}
//             }
//         }
//     ]);
//     res.json(result[0] || {message:"No data" });
//     }
//     catch (err) {
//         res.status(500).json({error: err.message });
//     }
// };

// //pie    chart
// exports.getMonthlySalesByCategories = async (req,res) => {  
//     try{
//         const{ year, month} = req.query;
//         const startDate = new Date(year,month-1,1)
//         const endDate = new Date(year,month,1)

//         const result = await Bill.aggregate([
//             {
//             $match:{
//                 date:
//                 {
//                     $gte: startDate,
//                     $lt: endDate
//                 }
//             }
//             },
//             { $unwind: "$items"},
//             {
//                 $group:{
//                     _id:"$items.category",
//                     totalRevenue: { $sum: "$items.total"},
//                     totalQuantity: { $sum: "$items.quantity"}
//                 }
//             },
//             {$sort: { totalRevenue:-1 } }
//         ]);
//         res.json(result);
//     }
//     catch (err) {
//         res.status(500).json({error: err.message });
//     }
// };