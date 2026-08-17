import API from "./axios";

export const getAllMenus = async () => {
  const response = await API.get('/menu/items');
  return response.data;
};