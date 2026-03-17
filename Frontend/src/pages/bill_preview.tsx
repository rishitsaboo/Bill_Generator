import React, { useEffect, useState } from "react";
import AddItemModal from "../components/AddItemModalt.tsx";
import RightSide from "../components/right_side.tsx";
import html2canvas from "html2canvas";
import { Search } from "lucide-react";
import { getItemsBycategory } from "../api/productApi";
import type { Item as ApiItem } from "../types/Item";
import toast from "react-hot-toast";

/* ---------------------- Types ---------------------- */

type Category =
  | "Namkeens"
  | "Sweets"
  | "Nasta_Items"
  | "Sabzi"
  | "Others";

type DisplayItem = {
  id: string;
  name: string;
  image: string;
  amount: number;
  category?: string;
  isCustom?: boolean;
};

type AddedItem = DisplayItem & {
  qtyType: string;
  kg?: string;
  gram?: string;
  pcs?: string;
  total: number;
};

type BillItem = {
  id: string;
  name: string;
  qty: number;
  amount: number;
  category?: string;
  isCustom?: boolean;
};

/* ---------------------- Constants ---------------------- */

const categories: Category[] = [
  "Namkeens",
  "Sweets",
  "Nasta_Items",
  "Sabzi",
  "Others",
];

/* ---------------------- Save Bill ---------------------- */

const saveBillToDatabase = async (billItems: BillItem[], customerName: string) => {
  try {
    const formattedItems = billItems.map((item) => ({
      name: item.name,
      quantity: item.qty,
      price: item.amount,
      total: item.qty * item.amount,
      category: item.category || (item.isCustom ? "Custom" : "General"),
      itemId: null,
    }));

    const totalAmount = formattedItems.reduce(
      (sum, item) => sum + item.total,
      0
    );

    const billData = {
      customerName: customerName.trim() || "Walk-in customer",
      items: formattedItems,
      totalAmount: totalAmount,
    };

    const response = await fetch("http://localhost:3000/api/generate-bill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(billData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Save failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log("Bill saved :", data);
    toast.success("Bill generated successfully");
  } catch (error) {
    console.error("Error saving bill:", error);
    toast.error("Failed to generate bill");
  }
};

/* ---------------------- Main Component ---------------------- */

function BillGenerator() {
  const [items, setItems] = useState<DisplayItem[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("Namkeens");

  const [billItems, setBillItems] = useState<BillItem[]>([]);

  const [currentItem, setCurrentItem] = useState<DisplayItem | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [customName, setCustomName] = useState("");
  const [customQty, setCustomQty] = useState("");
  const [customPrice, setCustomPrice] = useState("");
  const [customerName, setCustomerName] = useState("");

  /* ---------------------- Clear Bill ---------------------- */

  const handleClearBill = () => {
    setBillItems([]);
    setCustomName("");
    setCustomPrice("");
    setCustomQty("");
    setCustomerName("");
    setCurrentItem(null);
    setShowModal(false);
  };

  /* ---------------------- Generate Bill ---------------------- */

  const handleGenerateBill = async () => {
    console.log("Generate Bill button clicked");

    await saveBillToDatabase(billItems, customerName);

    try {
      const billElement = document.getElementById("bill-preview");

      if (!billElement) {
        console.error("Bill preview element not found");
        return;
      }

      const images = billElement.querySelectorAll("img");

      await Promise.all(
        [...images].map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((resolve) => {
                img.onload = resolve;
              })
        )
      );

      const canvas = await html2canvas(billElement, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const link = document.createElement("a");
      link.download = `bill-Kavita's Kitchen.jpg`;
      link.href = canvas.toDataURL("image/jpeg", 0.95);
      link.click();
    } catch (error) {
      console.error("Error generating bill:", error);
    }
  };

  /* ---------------------- Custom Item ---------------------- */

  function addCustomItem() {
    if (!customName.trim() || !customPrice) return;

    const qty = Number(customQty) || 1;
    const unitPrice = Number(customPrice);

    setBillItems((prev) => [
      ...prev,
      {
        id: `custom-${Date.now()}`,
        name: customName,
        qty,
        amount: unitPrice,
        isCustom: true,
        category: "Custom",
      },
    ]);

    setCustomName("");
    setCustomPrice("");
    setCustomQty("");
  }

  /* ---------------------- Fetch Items ---------------------- */

  const fetchItems = async (selectedCategory: string) => {
    try {
      const data: ApiItem[] = await getItemsBycategory(selectedCategory);

      const normalized: DisplayItem[] = data.map((item) => ({
        id: item._id,
        name: item.name,
        image: item.image || "",
        amount: item.price,
        category: item.category,
      }));

      setItems(normalized);
    } catch (error) {
      console.error("Error fetching items", error);
    }
  };

  useEffect(() => {
    fetchItems(selectedCategory);
  }, [selectedCategory]);

  /* ---------------------- Filter Items ---------------------- */

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* ---------------------- UI ---------------------- */

  return (
    <div className="h-full " >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-screen">
        {/* LEFT SIDE */}
        <div className="w-full bg-white p-4 ">
          {/* Search */}
          <div className="relative ">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full mt-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 mb-4 pb-3 pl-10"
            />
          </div>

          {/* Categories */}

          <div className="overflow-x-auto whitespace-nowrap flex space-x-2 bg-gray-100 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded ${
                  selectedCategory === cat
                    ? "bg-blue-500 text-white"
                    : "bg-white shadow text-gray-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Items */}

          <div className="mt-4">
            <h2 className="font-semibold mb-2">{selectedCategory}</h2>

            {selectedCategory !== "Others" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {filteredItems.length === 0 && (
                  <p className="text-sm text-gray-500 col-span-full">
                    No items found.
                  </p>
                )}

                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setCurrentItem(item);
                      setShowModal(true);
                    }}
                    className="bg-white rounded-xl p-2 shadow hover:shadow-lg cursor-pointer"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-24 object-cover rounded-md"
                      />
                    )}

                    <p className="text-center mt-2 font-medium">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Custom Items */}

            {selectedCategory === "Others" && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                <input
                  type="text"
                  placeholder="Item name"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="col-span-2 border px-2 py-1 rounded"
                />

                <input
                  type="number"
                  placeholder="Qty"
                  value={customQty}
                  onChange={(e) => setCustomQty(e.target.value)}
                  className="border px-2 py-1 rounded"
                />

                <input
                  type="number"
                  placeholder="Price"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  className="border px-2 py-1 rounded"
                />

                <button
                  onClick={addCustomItem}
                  className="bg-black text-white py-1 rounded"
                >
                  Add to Bill
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
      <div className=" shadow-md rounded bg-white ">
        <div className="flex-1 overflow-hidden  ">
          <RightSide
            billItems={billItems}
            customerName={customerName}
            onCustomerNameChange={setCustomerName}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4">
            <button
              onClick={handleGenerateBill}
              className="py-4 text-base font-semibold bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            >
              Generate Bill (JPG)
            </button>

            <button
              onClick={handleClearBill}
              className="py-4 text-base font-semibold bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
            >
              Clear
            </button>
          </div>
        </div>
        </div>
      </div>

      {/* Modal */}

      {showModal && currentItem && (
        <AddItemModal
          item={currentItem}
          onClose={() => setShowModal(false)}
          onAdd={(addedItem: AddedItem) => {
            const qty =
              addedItem.qtyType === "Kg"
                ? parseFloat(addedItem.kg || "0") +
                  parseFloat(addedItem.gram || "0") / 1000
                : parseFloat(addedItem.pcs || "0");

            setBillItems((prev) => [
              ...prev,
              {
                id: addedItem.id,
                name: addedItem.name,
                qty,
                amount: addedItem.total,
                category: addedItem.category,
              },
            ]);

            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

export default BillGenerator;
