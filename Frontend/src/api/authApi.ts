import API from "./axios";

export const logiUser  = async(data:any) =>{
    const response = await API.post("/auth/login",data);
    return response.data
}

export const registerUser = async (data: any) => {
  const response = await API.post("/auth/register", data);
  return response.data;
};