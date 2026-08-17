import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Order } from "../types/order";
import { getOrderById, updateOrderStatus } from "../api/orderApi";

const statuses: string[] = [
    "Pending",
    "Accepted",
    "Preparing",
    "Ready",
    "Completed",
    "Cancelled",
];

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [updatingStatus, setUpdatingStatus] = useState(false);

    const handleStatusChange = async (
    newStatus: string
        ) => {
    if (!order) return;

    try {
        setUpdatingStatus(true);

        const updatedOrder =
            await updateOrderStatus(
                order._id,
                newStatus
            );

        setOrder(updatedOrder);
    } catch (error) {
        console.error(
            "Failed to update order status:",
            error
        );
    } finally {
        setUpdatingStatus(false);
    }
};
    useEffect(() => {
        const loadOrder = async () => {
            if (!id) return;

            try {
                const data = await getOrderById(id);
                setOrder(data);
            } catch (error) {
                console.error(
                    "Failed to load order:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadOrder();
    }, [id]);

    if (loading) {
        return (
            <div className="p-6">
                Loading order...
            </div>
        );
    }

    if (!order) {
        return (
            <div className="p-6">
                <p>Order not found.</p>

                <button
                    onClick={() =>
                        navigate("/admin/orders")
                    }
                    className="mt-4 rounded-lg border px-4 py-2"
                >
                    Back to Orders
                </button>
            </div>
        );
    }

    return (
        <div className="p-6">
            <button
                onClick={() =>
                    navigate("/orders")
                }
                className="mb-6 rounded-lg border px-4 py-2"
            >
                ← Back to Orders
            </button>

            <h1 className="text-2xl font-bold">
                Order Details
            </h1>

            <div className="mt-6 rounded-xl border bg-white p-6">
                <h2 className="text-lg font-semibold">
                    Customer
                </h2>

                <p className="mt-3">
                    <strong>Name:</strong>{" "}
                    {order.customerName}
                </p>

                <p>
                    <strong>Phone:</strong>{" "}
                    {order.customerPhoneNumber}
                </p>
            </div>

            <div className="mt-6 rounded-xl border bg-white p-6">
                <h2 className="text-lg font-semibold">
                    Items
                </h2>

                <div className="mt-4 space-y-3">
                    {order.items.map((items, index) => (
                        <div
                            key={items.itemId ?? index}
                            className="flex justify-between border-b pb-3"
                        >
                            <div>
                                <p className="font-medium">
                                    {items.name}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Quantity:{" "}
                                    {items.quantity}
                                </p>

                                {items.weightInGrams && (
                                    <p className="text-sm text-gray-500">
                                        Weight:{" "}
                                        {items.weightInGrams}g
                                    </p>
                                )}
                            </div>

                            <p className="font-medium">
                                ₹{items.total}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex justify-between text-lg font-bold">
                    <span>Total</span>

                    <span>
                        ₹{order.totalAmount}
                    </span>
                </div>
            </div>

            <div className="mt-6 rounded-xl border bg-white p-6">
                <h2 className="text-lg font-semibold">
                    Status
                </h2>
                <div className="mt-4">
                    <select
                        value={order.status}
                        onChange={(event) =>
                            handleStatusChange(
                                event.target.value)}
                        disabled={updatingStatus}
                        className="rounded-lg border px-4 py-2"
                    >
                        {statuses.map((status) => (
                        <option
                            key={status}
                            value={status}
                        >
                            {status}
                            </option>
                    ))}
                    </select>
                {updatingStatus && (
            <p className="mt-2 text-sm text-gray-500">
                Updating status...
            </p>
        )}
    </div>
</div>
        </div>
    );
};

export default OrderDetails;