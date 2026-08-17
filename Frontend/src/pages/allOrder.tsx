import { useEffect, useState } from "react";
import { getAllOrders } from "../api/orderApi";
import type { Order } from "../types/order";
import { useNavigate } from "react-router-dom";

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadOrder = async () => {
            try {
                const data = await getAllOrders();
                setOrders(data);
            } catch (error) {
                console.error("Failed to load orders:", error);
            } finally {
                setLoading(false);
            }
        };

        loadOrder();
    }, []);
    if (loading){
        return (
            <div className="p-6">
                Loading Orders
            </div>
        )
    }
   return (
    <div className="p-6">
        <h1 className="text-2xl font-bold">
            Orders
        </h1>

        {orders.length === 0 ? (
            <p className="mt-6 text-gray-500">
                No orders found.
            </p>
        ) : (
            <div className="mt-6 overflow-hidden rounded-xl border bg-white">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left">
                                Order
                            </th>

                            <th className="px-4 py-3 text-left">
                                Customer
                            </th>

                            <th className="px-4 py-3 text-left">
                                Phone
                            </th>

                            <th className="px-4 py-3 text-left">
                                Total
                            </th>

                            <th className="px-4 py-3 text-left">
                                Status
                            </th>

                            <th className="px-4 py-3 text-left">
                                Items
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr
                                key={order._id}
                                className="border-t"
                                onClick={() =>
                                    navigate(`/admin/orders/${order._id}`)
                                    }>
                                    
                                <td className="px-4 py-4 font-medium">
                                    #{order._id.slice(0, 8)}
                                </td>

                                <td className="px-4 py-4">
                                    {order.customerName}
                                </td>

                                <td className="px-4 py-4">
                                    {order.customerPhoneNumber}
                                </td>

                                <td className="px-4 py-4 font-medium">
                                    ₹{order.totalAmount}
                                </td>

                                <td className="px-4 py-4">
                                    {order.status}
                                </td>

                                <td className="px-4 py-4">
                                    {order.items.length}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
    </div>
);

};

export default Orders;