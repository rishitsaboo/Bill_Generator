import API from "./axios";
import type { Item } from "../types/Item";

export const getItemsByCategory = async (
  categoryName: string
): Promise<Item[]> => {
  const res = await API.get<Item[]>(`/items/category/${categoryName}`);
  return res.data;
};

export const addItem = async (data: FormData) => {
  const response = await API.post("/add-item", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return { data: response.data };
};

export const deleteItem = async (id: string) => {
  return API.delete(`/delete-item/${id}`);
};

export const updateItem = async (
  id: string,
  name: string,
  price: number,
  unit?: "plate" | "piece" | "per/kg",
  isBestSeller?: boolean
) => {
  return API.put(`/update-price/${id}`, { name, price, unit, isBestSeller });
};
