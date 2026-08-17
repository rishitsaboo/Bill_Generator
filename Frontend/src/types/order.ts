import type { cartUnit } from "./cart";

export interface OrderItem {
    itemId?: string;
    name: string;
    category?: string;
    price: number;
    quantity: number;
    total: number;
    unit: cartUnit;
    weightInGrams?: number | null;
}

export type OrderStatus =
    | "Pending"
    | "Accepted"
    | "Preparing"
    | "Ready"
    | "Completed"
    | "Cancelled";

export interface CreateOrderPayload {
    customerName: string;
    customerPhoneNumber: string;
    items: OrderItem[];
    totalAmount: number;
}

export interface Order {
    _id: string;
    customerName: string;
    customerPhoneNumber: string;
    items: OrderItem[];
    totalAmount: number;
    createdAt: string;
    status: OrderStatus;
    deliveryTime: string | null;
}