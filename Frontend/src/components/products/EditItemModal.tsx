import { useState } from "react";
import type { Item } from "../../types/Item";

type EditPriceModalProps = {
  item: Item;
  onClose: () => void;
  onSave: (name: string, price: number) => Promise<void>;
};

const EditItemModal = ({ item, onClose, onSave }: EditPriceModalProps) => {
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(name, price);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">
          Edit Item 
        </h2>

        <p className="text-gray-600 mb-2">
          Item: <span className="font-semibold">{item.name}</span>
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full rounded mb-4"
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="border p-2 w-full rounded mb-4"
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditItemModal;
