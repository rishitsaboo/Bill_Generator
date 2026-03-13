import API from "./axios";
import type { Item } from "../types/Item";

// Fetch items in a category, return just the payload (not the full AxiosResponse)
export const getItemsBycategory = async (
  categoryName: string
): Promise<Item[]> => {
  const res = await API.get<Item[]>(`/items/category/${categoryName}`);
  return res.data;
};

export const addItem = async (data: FormData) => {
  return API.post("/add-item", data);
};

export const deleteItem = async (id: string) => {
  return API.delete(`/delete-item/${id}`);
};

export const updateItem = async (id: string, price: number) => {
  return API.put(`/update-price/${id}`, { price });
};
