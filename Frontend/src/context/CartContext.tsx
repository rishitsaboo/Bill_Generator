import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

import type { CartItem } from "../types/cart";

interface CartContextType {
    cartItems: CartItem[];

    addToCart: (item: CartItem) => void;

    removeFromCart: (
        productId: string,
        unit: CartItem["unit"],
        weightInGrams?: number
    ) => void;

    updateQuantity: (
        productId: string,
        unit: CartItem["unit"],
        quantity: number,
        weightInGrams?: number
    ) => void;

    clearCart: () => void;

    cartCount: number;

    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(
    undefined
);

interface CartProviderProps {
    children: ReactNode;
}

const isSameCartLine = (
    first: CartItem,
    second: CartItem
): boolean => {
    if (
        first.productId !== second.productId ||
        first.unit !== second.unit
    ) {
        return false;
    }

    if (first.unit === "per/kg") {
        return first.weightInGrams === second.weightInGrams;
    }

    return true;
};

export function CartProvider({
    children,
}: CartProviderProps) {

    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCartItems((currentItems) => {

            const existingItem = currentItems.find(
                (cartItem) => isSameCartLine(cartItem, item)
            );

            if (existingItem) {
                return currentItems.map((cartItem) =>
                    isSameCartLine(cartItem, item)
                        ? {
                            ...cartItem,
                            quantity:
                                cartItem.quantity + item.quantity,
                        }
                        : cartItem
                );
            }

            return [...currentItems, item];
        });
    };

    const removeFromCart = (
        productId: string,
        unit: CartItem["unit"],
        weightInGrams?: number
    ) => {
        setCartItems((currentItems) =>
            currentItems.filter((item) => {
                if (
                    item.productId !== productId ||
                    item.unit !== unit
                ) {
                    return true;
                }

                if (unit === "per/kg") {
                    return item.weightInGrams !== weightInGrams;
                }

                return false;
            })
        );
    };

    const updateQuantity = (
        productId: string,
        unit: CartItem["unit"],
        quantity: number,
        weightInGrams?: number
    ) => {

        if (quantity <= 0) {
            removeFromCart(
                productId,
                unit,
                weightInGrams
            );
            return;
        }

        setCartItems((currentItems) =>
            currentItems.map((item) => {

                const matches =
                    item.productId === productId &&
                    item.unit === unit &&
                    (
                        unit !== "per/kg" ||
                        item.weightInGrams === weightInGrams
                    );

                return matches
                    ? {
                        ...item,
                        quantity,
                    }
                    : item;
            })
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const cartTotal = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartCount,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {

    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart must be used inside CartProvider"
        );
    }

    return context;
}