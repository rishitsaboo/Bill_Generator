import API from "./axios";

export const createOrder = async (orderData: any) => {
  const response = await API.post("/api/orders", orderData);
  return response.data;
};
export const getAllOrders = async () => {
  const response = await API.get("/api/orders");
  return response.data;
};

export const getOrderById = async (id: string) => {
  const response = await API.get(`/api/orders/${id}`);
  return response.data;
};

export const updateOrder = async (id: string, orderData: any) => {
  const response = await API.put(`/api/orders/${id}`, orderData);
  return response.data;
};

export const deleteOrder = async (id: string) => {
  const response = await API.delete(`/api/orders/${id}`);
  return response.data;
};
