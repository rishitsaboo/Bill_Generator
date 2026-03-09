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

