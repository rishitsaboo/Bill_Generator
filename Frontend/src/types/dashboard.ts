export type TrendPoint = {
    day:number;
    totalSales:number;
};

export type CategorySale = {
    category:string;
    totalRevenue:number;
};

export type TopSeller={
   category: string;
   totalQuantity:number;
};

export interface DashboardData{
    daily:{
        totalSales:number;
        totalBills:number;
    };
    monthly:{
        totalSales:number;
        totalBills:number;
    };
    trend: TrendPoint[];
    categorySales:CategorySale[];
    topSellers:TopSeller[];
}
