import { useEffect, useState } from "react";
import ItemTable from "../components/products/ItemTable";
import CategoryFilter from "../components/filter/CategoryFilter";
import EditPriceModal from "../components/products/EditPriceModal";

import type { Item } from "../types/Item";
import { deleteItem, getItemsBycategory, updateItem } from "../api/productApi";

const Products = () => {
  const [category, setCategory] = useState("Namkeens");
  const [items, setItems] = useState<Item[]>([]);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

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
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 font-serif">Products</h1>

      <div>
        <CategoryFilter selected={category} onSelect={setCategory} />
      </div>

      <ItemTable items={items} onEdit={handleEdit} onDelete={handleDelete} />

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
