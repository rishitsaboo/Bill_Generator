import { useLocation, useNavigate } from "react-router-dom";
import type { Order } from "../../types/order";

interface OrderSuccessState {
    order?: Order;
}

const OrderSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const state =
        location.state as OrderSuccessState | null;

    const order = state?.order;

    if (!order) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-stone-50 px-4">
                <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Order information unavailable
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Please return to the menu.
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/menu")}
                        className="mt-6 rounded-xl bg-amber-700 px-6 py-3 font-semibold text-white hover:bg-amber-800"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 px-4 py-10">
            <div className="mx-auto max-w-2xl">
                <div className="rounded-2xl bg-white p-8 shadow-sm">
                    <div className="text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
                            ✓
                        </div>

                        <h1 className="mt-5 text-3xl font-bold text-gray-900">
                            Order Placed Successfully!
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Thank you, {order.customerName}.
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            Order ID:{" "}
                            <span className="font-medium text-gray-800">
                                {order._id}
                            </span>
                        </p>
                    </div>

                    <div className="mt-8 rounded-xl bg-gray-50 p-5">
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">
                                Status
                            </span>

                            <span className="font-semibold text-amber-700">
                                {order.status}
                            </span>
                        </div>

                        <div className="mt-5 space-y-4">
                            {order.items.map((item, index) => (
                                <div
                                    key={`${item.itemId ?? item.name}-${index}`}
                                    className="flex justify-between gap-4 border-b border-gray-200 pb-4"
                                >
                                    <div>
                                        <p className="font-semibold">
                                            {item.name}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            {item.quantity} × ₹
                                            {item.price.toFixed(2)}
                                        </p>

                                        {item.weightInGrams != null && (
                                            <p className="text-sm text-gray-500">
                                                Weight:{" "}
                                                {item.weightInGrams} g
                                            </p>
                                        )}
                                    </div>

                                    <span className="font-semibold">
                                        ₹{item.total.toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 flex justify-between">
                            <span className="text-lg font-bold">
                                Total
                            </span>

                            <span className="text-xl font-bold text-amber-700">
                                ₹{order.totalAmount.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/menu")}
                        className="mt-8 w-full rounded-xl bg-amber-700 px-5 py-3 font-semibold text-white hover:bg-amber-800"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;