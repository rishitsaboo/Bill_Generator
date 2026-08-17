import API from "./axios";
import type {
    CreateOrderPayload,
    Order,
} from "../types/order";

export const createOrder = async (
    orderData: CreateOrderPayload
): Promise<Order> => {
    const response = await API.post<Order>(
        "/orders",
        orderData
    );

    return response.data;
};

export const getAllOrders = async (): Promise<Order[]> => {
    const response = await API.get<Order[]>(
        "/orders"
    );

    return response.data;
};

export const getOrderById = async (
    id: string
): Promise<Order> => {
    const response = await API.get<Order>(
        `/orders/${id}`
    );

    return response.data;
};

export const updateOrderStatus = async(
    id:string,
    status:string,
):Promise<Order> => {
    const response = await API.put<Order>(
        `orders/${id}/status`,
        {status}
    );
    return response.data;
}

