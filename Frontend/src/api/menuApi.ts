import API from "./axios";

export const getAllMenus = async () => {
  const response = await API.get('/api/menu/items');
  return response.data;
};
export const getMenuById = async (id: string) => {
  const response = await API.get(`/api/menu/items/${id}`);
  return response.data;
};
export const getMenuByCategory = async (category: string) => {
  const response = await API.get(`/api/menu/items/category/${category}`);
  return response.data;
};