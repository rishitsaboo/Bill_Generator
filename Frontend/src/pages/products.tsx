import { useEffect, useMemo, useState } from "react";
import ItemTable from "../components/products/ItemTable";
import CategoryFilter from "../components/filter/CategoryFilter";
import EditPriceModal from "../components/products/EditPriceModal";
import toast from "react-hot-toast";
import { Search } from "lucide-react";

import type { Item } from "../types/Item";
import { deleteItem, getItemsBycategory, updateItem } from "../api/productApi";

const Products = () => {
  const [category, setCategory] = useState("Namkeens");
  const [items, setItems] = useState<Item[]>([]);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
  const term = searchQuery.trim().toLowerCase();
  if (!term) return items;
  return items.filter((item) =>
    (item.name || "").toLowerCase().includes(term)
  );
}, [items, searchQuery]);
  const fetchItems = async (selectedCategory: string) => {
    try {
      const data = await getItemsBycategory(selectedCategory);
      setItems(data);
    } catch (error) {
      console.error("Error fetching items", error);
    }
  };

  useEffect(() => {
    fetchItems(category);
  }, [category]);

  const handleEdit = (item: Item) => {
    setEditingItem(item);
  };

  const handleCloseModal = () => {
    setEditingItem(null);
  };

  const handleSavePrice = async (newPrice: number) => {
    if (!editingItem) return;

    try {
      await updateItem(editingItem._id!, newPrice);

      const updatedItems = items.map((item) =>
        item._id === editingItem._id
          ? { ...item, price: newPrice }
          : item
      );

      setItems(updatedItems);
      setEditingItem(null);
      toast.success("Price updated successfully");
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Failed to update price");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      setItems((prev) => prev.filter((item) => item._id !== id));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 font-serif">Products</h1>
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

      <div>
        <CategoryFilter selected={category} onSelect={setCategory} />
      </div>

      <ItemTable items={filteredItems} onEdit={handleEdit} onDelete={handleDelete} />

      {editingItem && (
        <EditPriceModal
          item={editingItem}
          onClose={handleCloseModal}
          onSave={handleSavePrice}
        />
      )}
    </div>
  );
};

export default Products;
