import { useState } from "react";
import type { Item } from "../../types/Item";
import { useCart } from "../../context/CartContext";

interface WeightModalProps {
  item: Item;
  onClose: () => void;
}

export default function WeightModal({ item, onClose }: WeightModalProps) {
  const { addToCart } = useCart();
  const [selectedWeight, setSelectedWeight] = useState<number | null>(null);
  const [customWeight, setCustomWeight] = useState("");

  const quickWeights = [
    { label: "250 g", grams: 250 },
    { label: "500 g", grams: 500 },
    { label: "750 g", grams: 750 },
    { label: "1000 g", grams: 1000 },
  ];

  const getWeightInGrams = () => {
    if (customWeight) {
      return Number(customWeight);
    }
    return selectedWeight || 0;
  };

  const weightInGrams = getWeightInGrams();
  const totalPrice = (item.price * weightInGrams) / 1000;

  const handleQuickWeight = (grams: number) => {
    setSelectedWeight(grams);
    setCustomWeight("");
  };

  const handleCustomWeight = (value: string) => {
    if (!/^\d*$/.test(value)) {
      return;
    }
    setCustomWeight(value);
    setSelectedWeight(null);
  };

  const handleAddToCart = () => {
    if (weightInGrams <= 0) {
      alert("Please select a weight.");
      return;
    }

    addToCart({
    productId: item._id,
    name: item.name,
    category: item.category,
    price: totalPrice,
    unit: "per/kg",
    quantity: 1,
    image: item.image,
    weightInGrams,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-amber-700">Select Weight</p>
            <h2 className="mt-1 text-xl font-bold text-gray-900">{item.name}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-lg hover:bg-gray-200"
          >
            ×
          </button>
        </div>

        {/* Price per kg */}
        <div className="mt-5 rounded-xl bg-amber-50 p-4">
          <p className="text-sm text-gray-600">Price per kg</p>
          <p className="text-2xl font-bold text-amber-800">₹{item.price}</p>
        </div>

        {/* Quick weights */}
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-semibold text-gray-800">Choose weight</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickWeights.map((weight) => (
              <button
                key={weight.grams}
                type="button"
                onClick={() => handleQuickWeight(weight.grams)}
                className={`rounded-xl border px-4 py-3 font-medium transition ${
                  selectedWeight === weight.grams
                    ? "border-amber-700 bg-amber-700 text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-amber-600"
                }`}
              >
                {weight.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom weight */}
        <div className="mt-6">
          <label htmlFor="custom-weight" className="mb-2 block text-sm font-semibold text-gray-800">
            Or enter custom weight
          </label>
          <div className="relative">
            <input
              id="custom-weight"
              type="text"
              inputMode="numeric"
              placeholder="Enter grams"
              value={customWeight}
              onChange={(event) => handleCustomWeight(event.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-16 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-200"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">grams</span>
          </div>
        </div>

        {/* Order summary */}
        <div className="mt-6 rounded-xl border border-gray-200 p-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Selected weight</span>
            <span className="font-semibold text-gray-900">
              {weightInGrams > 0 ? `${weightInGrams} g` : "Not selected"}
            </span>
          </div>
          <div className="mt-3 flex justify-between border-t pt-3">
            <span className="font-semibold text-gray-800">Total</span>
            <span className="text-xl font-bold text-amber-800">₹{totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Add to cart */}
        <button
          type="button"
          disabled={weightInGrams <= 0}
          onClick={handleAddToCart}
          className="mt-6 w-full rounded-xl bg-amber-700 px-6 py-3 font-semibold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}


