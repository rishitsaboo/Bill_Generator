import API from "./axios";
export const getDashboardData  = async (
    year:number,
    month:number,
    date:string
) =>{
    const response = await API.get("/stats/dashboard", {
        params: {year,month,date},
    });
    return response.data
};

export const getTopSellers = async (
  year: number,
  month: number,
  category: string
) => {
  const response = await API.get("/stats/dashboard/top-sellers", {
    params: { year, month, category },
  });

  return response.data;
};