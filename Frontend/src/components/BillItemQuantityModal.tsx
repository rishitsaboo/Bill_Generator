import React, { useState } from "react";

type Item = {
    id: string;
    name: string;
    image: string;
    amount: number;
    unit?: "plate" | "piece" | "per/kg";
};

type AddedItem = Item & {
    qtyType: string;
    kg?: string;
    gram?: string;
    pcs?: string;
    total: number;
    unit?: "plate" | "piece" | "per/kg";
};

type BillItemQuantityModalProps = {
    item: Item;
    onClose: () => void;
    onAdd: (data: AddedItem) => void;
};

export default function BillItemQuantityModal({ item, onClose, onAdd }: BillItemQuantityModalProps) {
    const qtyType = item.unit === "per/kg" ? "Kg" : "Pcs";
    const [kg, setKg] = useState("");
    const [gram, setGram] = useState("");
    const [pcs, setPcs] = useState("");
    const countLabel = item.unit === "plate" ? "Plates" : item.unit === "piece" ? "Pieces" : "Count";

    const calcTotal = () => {
        if (qtyType === "Kg") {
            const kgVal = parseFloat(kg) || 0;
            const gramVal = (parseFloat(gram) || 0) / 1000;
            return (kgVal + gramVal) * item.amount;
        } else {
            return (parseInt(pcs) || 0) * item.amount;
        }
    };

    const handleAdd = () => {
        onAdd({
            ...item,
            qtyType,
            kg,
            gram,
            pcs,
            total: calcTotal(),
            unit: item.unit,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm  bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
                <h2 className="text-2xl font-bold mb-4">{item.name}</h2>

                <div className="block mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                        Quantity mode: {qtyType} ({item.unit || "piece"})
                    </p>
                </div>

                {qtyType === "Kg" ? (
                    <div className="space-y-2">
                        <input
                            type="number"
                            placeholder="Kg"
                            className="border rounded p-2 w-full"
                            value={kg}
                            onChange={(e) => setKg(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Gram"
                            className="border rounded p-2 w-full"
                            value={gram}
                            onChange={(e) => setGram(e.target.value)}
                        />
                    </div>
                ) : (
                    <div className="space-y-2">
                        <input
                            type="number"
                            placeholder={countLabel}
                            className="border rounded p-2 w-full"
                            value={pcs}
                            onChange={(e) => setPcs(e.target.value)}
                        />
                    </div>
                )}

                <div className="flex justify-between items-center mt-4">
                    <span className="font-semibold">Total: ₹{calcTotal().toFixed(2)}</span>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={handleAdd}>Add</button>
                    <button className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                        onClick={onClose}>Cancel</button>
                </div>

            </div>
        </div>
    );
}
