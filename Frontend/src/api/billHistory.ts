import API from "./axios";
import type { billInformation } from "../types/bill";


export const getBills = async (): Promise<billInformation[]> => {
    const res = await API.get<{ success: boolean; count: number; data: billInformation[] }>(`/history`);
    return res.data.data;
}
export const getBillById = async (id: string): Promise<billInformation> => {
    const res = await API.get<{ success: boolean; data: billInformation }>(`/history/${id}`);
    return res.data.data;
}
export const deleteBill = async (id: string) => {
    return API.delete(`/history/${id}`);
}
export const editBill = async (id: string, data: Partial<billInformation>) => {
    return API.put(`/history/${id}`, data);
}
export const addItemToBill = async (id: string, item: { name: string; quantity: number; price: number }) => {
    return API.post(`/history/${id}/items`, item);
}

