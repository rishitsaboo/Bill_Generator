import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useCart } from "../../context/CartContext";
import { createOrder } from "../../api/orderApi";

const CheckoutForm = () => {
    const navigate = useNavigate();

    const {cartItems,cartTotal,clearCart} = useCart();

    const [customerName, setCustomerName] = useState("");
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handelSubmit = async (
        event:React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (cartItems.length === 0){
            toast.error("Your cart is empty.")
            return;
        }
        const trimmedName = customerName.trim();
        if (!trimmedName){
            toast.error("Please enter your name.")
            return;
        }
        const trimmedPhone = customerPhoneNumber.trim();
        if (!trimmedPhone){
            toast.error("Please enter your name.")
            return;
        }
        if (!/^[0-9+\-\s()]{7,20}$/.test(trimmedPhone)) {
            toast.error("Please enter a valid phone number.");
            return;
        }

        setIsSubmitting(true);
        try {
            const orderItems = cartItems.map((items) => ({
                itemId: items.productId,
                name: items.name,
                category: items.category,
                price: items.price,
                quantity: items.quantity,
                total: items.price * items.quantity,
                unit: items.unit,
                weightInGrams:items.weightInGrams ?? null,
            }));
            const order = await createOrder({
                customerName: trimmedName,
                customerPhoneNumber: trimmedPhone,
                items: orderItems,
                totalAmount: cartTotal,
            });
            clearCart();
            navigate("/order-success",{
                state: {order,},
                replace:true,
            });
        }catch (error){
            console.error(
                "Error creating order:",
                error
            );

            toast.error(
                "Unable to place your order. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (cartItems.length === 0){
        return (
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
                <h2 className="text-xl font-bold text-gray-900">
                    Your cart is empty
                </h2>

                <p className="mt-2 text-gray-500">
                    Add some items before checking out.
                </p>

                <button
                    type="button"
                    onClick={() => navigate("/menu")}
                    className="mt-6 rounded-xl bg-amber-700 px-6 py-3 font-semibold text-white hover:bg-amber-800"
                >
                    Browse Menu
                </button>
            </div>
        );
    }
    return (
        <form 
            onSubmit={handelSubmit}
            className="grid gap-6 lg:grid-cols-[1fr_420px]">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900">
                    Customer Information
                </h2>
                <div className="mt-6 space-y-5">
                    <div>
                        <label htmlFor="customerName" className="mb-2 block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={customerName}
                            onChange={(event) => setCustomerName(event.target.value)}
                            placeholder="Enter your name"
                            disabled={isSubmitting}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
                        />
                    </div>
                    <div>
                        <label htmlFor="customerPhoneNumber" className="mb-2 block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            value={customerPhoneNumber}
                            onChange={(event) => setCustomerPhoneNumber(event.target.value)}
                            placeholder="Enter your phone number"
                            disabled={isSubmitting}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
                        />
                    </div>
                </div>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                <div className="mt-5 space-y-4">
                    {cartItems.map((items) => {
                        const itemTotal = items.price * items.quantity;
                        return (
                            <div
                                key={`${items.productId}-${items.unit}-${items.weightInGrams ?? ""}`}
                                className="border-b border-gray-100 pb-4">
                                <div className="flex justify-between gap-4">
                                    <div>
                                        <p className="font-semibold text-gray-900">{items.name}</p>
                                        <p className="mt-1 text-sm text-gray-500">{items.quantity} × ₹{items.price.toFixed(2)}</p>
                                        {items.weightInGrams != null && (
                                            <p className="text-sm text-gray-500">Weight:{" "}{items.weightInGrams} g</p>
                                        )}
                                    </div>
                                    <p className="font-semibold text-gray-900">₹{itemTotal.toFixed(2)}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="mt-5 flex justify-between border-t pt-5">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-xl font-bold text-amber-700">₹{cartTotal.toFixed(2)}</span>
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-6 w-full rounded-xl bg-amber-700 px-5 py-3 font-semibold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-60">
                    {isSubmitting ? "Placing Order..." : "Place Order"}
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;