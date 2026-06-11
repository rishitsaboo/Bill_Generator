export type billInformation = {
    _id?: string;
    id?: string;
    customerName: string;
    date: string;
    totalAmount: number;
    items: {
        name: string;
        quantity: number;
        price: number;
        total: number;
    }[];
};