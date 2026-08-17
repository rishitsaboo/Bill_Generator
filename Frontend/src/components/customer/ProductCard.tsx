import React from "react";
import { useCart } from "../../context/CartContext";
import WeightModal from "./WeightModal";
import type { Item } from "../../types/Item";

interface ProductCardProps {
    items: Item;
    onClick?: () => void;
}

export default function ProductCard({
    items,
    onClick,
}: ProductCardProps) {

    const {
        cartItems,
        addToCart,
        updateQuantity,
    } = useCart();

    const [showWeightModal, setShowWeightModal] = React.useState(false);

const cartItem = cartItems.find(
    (cartItem) =>
        cartItem.productId === items._id &&
        cartItem.unit === (
            items.unit === "plate"
                ? "plate"
                : "piece"
        )
);

    const getCartUnit = () => {
        if (items.unit === "per/kg") {
            return "per/kg";
        }

        if (items.unit === "plate") {
            return "plate";
        }

        return "piece";
    };

    // =========================
    // ADD TO CART
    // =========================

    const handleAddToCart = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {

        event.stopPropagation();

        // KG PRODUCT
        if (items.unit === "per/kg") {
            
            setShowWeightModal(true);
            return;
        }

        // PIECE / PLATE PRODUCT
        addToCart({
            productId: items._id,
            name: items.name,
            price: items.price,
            unit: getCartUnit(),
            quantity: 1,
            image: items.image,
        });
    };


    // =========================
    // PRODUCT CARD CLICK
    // =========================

    const handleCardClick = () => {

        // If KG product → open WeightModal
        if (items.unit === "per/kg") {
            setShowWeightModal(true);
            return;
        }

        // Otherwise → open ProductModal
        if (onClick) {
            onClick();
        }
    };


    // =========================
    // INCREASE
    // =========================

    const handleIncrease = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {

        event.stopPropagation();

        if (!cartItem) return;

        updateQuantity(
            items._id,
            cartItem.unit,
            cartItem.quantity + 1
        );
    };


    // =========================
    // DECREASE
    // =========================

    const handleDecrease = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {

        event.stopPropagation();

        if (!cartItem) return;

        updateQuantity(
            items._id,
            cartItem.unit,
            cartItem.quantity - 1
        );
    };


    return (
    <>
        <div
            onClick={handleCardClick}
            className="
                cursor-pointer
                overflow-hidden
                rounded-xl
                bg-white
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-1
                hover:shadow-lg
            "
        >
            {/* IMAGE */}

            <div className="h-44 overflow-hidden bg-gray-100">
                {items.image ? (
                    <img
                        src={items.image}
                        alt={items.name}
                        className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-300
                            hover:scale-105
                        "
                    />
                ) : (
                    <div
                        className="
                            flex
                            h-full
                            w-full
                            items-center
                            justify-center
                            text-gray-400
                        "
                    >
                        No Image
                    </div>
                )}
            </div>

            {/* PRODUCT NAME */}

            <h2
                className="
                    truncate
                    px-4
                    pt-3
                    text-lg
                    font-semibold
                    text-gray-800
                "
            >
                {items.name}
            </h2>

            {/* PRICE + BUTTON */}

            <div
                className="
                    flex
                    items-center
                    justify-between
                    px-4
                    py-3
                "
            >
                {/* PRICE */}

                <div>
                    <p
                        className="
                            text-xl
                            font-bold
                            text-gray-900
                        "
                    >
                        ₹{items.price}
                    </p>

                    <p
                        className="
                            text-xs
                            text-gray-500
                        "
                    >
                        {items.unit || "piece"}
                    </p>
                </div>

                {/* CART ACTION */}

                {items.unit === "per/kg" ? (
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        className="
                            rounded-xl
                            bg-[#c6530a]
                            px-4
                            py-2
                            text-xs
                            font-semibold
                            text-white
                            transition
                            hover:bg-[#a94408]
                        "
                    >
                        Add to Cart
                    </button>
                ) : !cartItem ? (
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        className="
                            rounded-xl
                            bg-[#c6530a]
                            px-4
                            py-2
                            text-xs
                            font-semibold
                            text-white
                            transition
                            hover:bg-[#a94408]
                        "
                    >
                        Add to Cart
                    </button>
                ) : (
                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-orange-200
                            bg-orange-50
                            px-2
                            py-1
                        "
                        onClick={(event) => {
                            event.stopPropagation();
                        }}
                    >
                        <button
                            type="button"
                            onClick={handleDecrease}
                            className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-lg
                                bg-white
                                font-bold
                                shadow-sm
                            "
                        >
                            -
                        </button>

                        <span
                            className="
                                min-w-[24px]
                                text-center
                                font-semibold
                            "
                        >
                            {cartItem.quantity}
                        </span>

                        <button
                            type="button"
                            onClick={handleIncrease}
                            className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-lg
                                bg-white
                                font-bold
                                shadow-sm
                            "
                        >
                            +
                        </button>
                    </div>
                )}
            </div>
        </div>

        {showWeightModal && (
            <WeightModal
                item={items}
                onClose={() => setShowWeightModal(false)}
            />
        )}
    </>
);
}