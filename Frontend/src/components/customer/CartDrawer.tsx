import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
}: CartDrawerProps) {

    const {
        cartItems,
        cartTotal,
        updateQuantity,
        removeFromCart,
    } = useCart();

    const navigate = useNavigate();

    if (!isOpen) {
        return null;
    }


    return (
        <div
            className="fixed inset-0 z-50 bg-black/40"
            onClick={onClose}
        >

            <div
                className="
                    absolute
                    right-0
                    top-0
                    h-full
                    w-full
                    max-w-md
                    bg-white
                    shadow-xl
                    flex
                    flex-col
                "
                onClick={(event) => event.stopPropagation()}
            >

                {/* HEADER */}

                <div className="
                    flex
                    items-center
                    justify-between
                    border-b
                    p-5
                ">

                    <h2 className="text-xl font-bold">
                        Your Cart
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            bg-gray-100
                            text-lg
                            hover:bg-gray-200
                        "
                    >
                        ×
                    </button>

                </div>


                {/* CART ITEMS */}

                <div className="flex-1 overflow-y-auto p-5">

                    {cartItems.length === 0 ? (

                        <div className="
                            flex
                            h-full
                            items-center
                            justify-center
                            text-gray-500
                        ">
                            Your cart is empty.
                        </div>

                    ) : (

                        <div className="space-y-4">

                            {cartItems.map((item) => (

                                <div
                                    key={`${item.productId}-${item.unit}-${item.weightInGrams ?? ""}`}
                                    className="
                                        rounded-xl
                                        border
                                        border-gray-200
                                        p-4
                                    "
                                >

                                    {/* PRODUCT */}

                                    <div className="flex gap-3">

                                        {/* IMAGE */}

                                        <div className="
                                            h-16
                                            w-16
                                            shrink-0
                                            overflow-hidden
                                            rounded-lg
                                            bg-gray-100
                                        ">

                                            {item.image ? (

                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="
                                                        h-full
                                                        w-full
                                                        object-cover
                                                    "
                                                />

                                            ) : (

                                                <div className="
                                                    flex
                                                    h-full
                                                    items-center
                                                    justify-center
                                                    text-xs
                                                    text-gray-400
                                                ">
                                                    No image
                                                </div>

                                            )}

                                        </div>


                                        {/* DETAILS */}

                                        <div className="flex-1">

                                            <h3 className="
                                                font-semibold
                                                text-gray-800
                                            ">
                                                {item.name}
                                            </h3>

                                            <p className="
                                                mt-1
                                                text-sm
                                                text-gray-500
                                            ">
                                                ₹{item.price}
                                            </p>


                                            {/* WEIGHT */}

                                            {item.weightInGrams && (

                                                <p className="
                                                    text-sm
                                                    text-gray-500
                                                ">
                                                    Weight: {item.weightInGrams} g
                                                </p>

                                            )}

                                        </div>


                                        {/* REMOVE */}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeFromCart(
                                                    item.productId,
                                                    item.unit,
                                                    item.weightInGrams
                                                )
                                            }
                                            className="
                                                text-sm
                                                text-red-500
                                                hover:text-red-700
                                            "
                                        >
                                            Remove
                                        </button>

                                    </div>


                                    {/* QUANTITY */}

                                    <div className="
                                        mt-4
                                        flex
                                        items-center
                                        justify-between
                                    ">

                                        <div className="
                                            flex
                                            items-center
                                            gap-3
                                            rounded-lg
                                            border
                                            px-2
                                            py-1
                                        ">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.productId,
                                                        item.unit,
                                                        item.quantity - 1,
                                                        item.weightInGrams
                                                    )
                                                }
                                                className="
                                                    h-7
                                                    w-7
                                                    rounded
                                                    bg-gray-100
                                                "
                                            >
                                                -
                                            </button>


                                            <span className="
                                                min-w-[20px]
                                                text-center
                                                font-semibold
                                            ">
                                                {item.quantity}
                                            </span>


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    updateQuantity(
                                                    item.productId,
                                                    item.unit,
                                                    item.quantity - 1,
                                                    item.weightInGrams
                                                    )
                                                }
                                                className="
                                                    h-7
                                                    w-7
                                                    rounded
                                                    bg-gray-100
                                                "
                                            >
                                                +
                                            </button>

                                        </div>


                                        {/* ITEM TOTAL */}

                                        <p className="
                                            font-bold
                                            text-gray-800
                                        ">
                                            ₹{(
                                                item.price *
                                                item.quantity
                                            ).toFixed(2)}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>


                {/* FOOTER */}

                {cartItems.length > 0 && (

                    <div className="
                        border-t
                        bg-white
                        p-5
                    ">

                        <div className="
                            mb-4
                            flex
                            justify-between
                        ">

                            <span className="
                                text-lg
                                font-semibold
                            ">
                                Total
                            </span>

                            <span className="
                                text-xl
                                font-bold
                                text-amber-700
                            ">
                                ₹{cartTotal.toFixed(2)}
                            </span>

                        </div>


                        <button
                            type="button"
                            onClick={() => {
                                onClose();
                                navigate("/checkout");
                            }}
                            className="
                                w-full
                                rounded-xl
                                bg-amber-700
                                px-5
                                py-3
                                font-semibold
                                text-white
                                hover:bg-amber-800
                            "
                        >
                            Proceed to Checkout
                        </button>

                    </div>

                )}

            </div>

        </div>
    );
}