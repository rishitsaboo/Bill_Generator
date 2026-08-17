export type cartUnit = "plate" | "piece" | "per/kg";

export interface CartItem {
  productId: string;
  name: string;
  category?: string;
  price: number;
  quantity: number;
  unit: cartUnit;
  image?: string;
  weightInGrams?: number;
}