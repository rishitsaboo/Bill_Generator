import type { Item } from "../../types/Item";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import WeightModal from "./WeightModal";

interface ProductModalProps {
  items: Item;
  onClose: () => void;
}

export default function ProductModal({ items, onClose }: ProductModalProps) {
  const { addToCart } = useCart();
  const [showWeightModal, setShowWeightModal] = useState(false);

  const handleAddToCart = () => {
    if (items.unit === "per/kg") {
      setShowWeightModal(true);
      return;
    }

    addToCart({
      productId: items._id,
      name: items.name,
      price: items.price,
      unit: items.unit === "plate" ? "plate" : "piece",
      quantity: 1,
      image: items.image,
    });

    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow-md hover:bg-gray-100"
          >
            ×
          </button>
          {/* Product Image */}
          <div className="h-72 w-full bg-gray-200">
            {items.image ? (
              <img
                src={items.image}
                alt={items.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
          {/* Product Details */}
          <div className="p-6">
            <p className="mb-2 text-sm font-medium text-amber-700">
              {items.category}
            </p>
            <h2 className="text-2xl font-bold text-gray-900">{items.name}</h2>
          </div>
          {/* Description */}
          <p className="mt-3 text-gray-600">
            {items.description || "A delicious homemade item."}
          </p>
          {/* Ingredients */}
          {items.ingredients && items.ingredients.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900">Ingredients</h3>
              <p className="mt-1 text-gray-600">{items.ingredients.join(", ")}</p>
            </div>
          )}
          {/* Price and Unit */}
          <div className="mt-6 flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">₹{items.price}</p>
              <p className="text-sm text-gray-500">{items.unit || "Per Piece"}</p>
            </div>
            {/* Add To Cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="rounded-xl bg-amber-700 px-6 py-3 font-semibold text-white transition hover:bg-amber-800"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      {showWeightModal && (
        <WeightModal item={items} onClose={() => setShowWeightModal(false)} />
      )}
    </>
  );
}

