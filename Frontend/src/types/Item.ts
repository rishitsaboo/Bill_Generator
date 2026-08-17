export type Item = {
    _id: string;
    name: string;
    price: number;
    category: string;
    image?: string;
    unit?: "plate" | "piece" | "per/kg";
    description?: string;
    ingredients?: string[];
    isBestSeller?: boolean;
};
