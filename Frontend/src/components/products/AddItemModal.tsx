import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

interface AddItem {
  name: string;
  price: number;
  category: string;
  image: File | null;
}

const AddItemForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormdata] = useState<AddItem>({
    name: "",
    price: 0,
    category: "",
    image: null,
  });

  const [error, setError] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      setFormdata((prev) => ({
        ...prev,
        image: file,
      }));

      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.price ||
      !formData.category ||
      !formData.image
    ) {
      setError("All fields are required");
      return;
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price.toString());
      data.append("category", formData.category);
      data.append("image", formData.image);

      await axios.post("http://localhost:3000/api/add-item", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product added successfully");
      navigate("/products");
    } catch (error) {
      setError("Failed to add item");
      toast.error("Failed to add item");
    }
  };

  return (
    <div className=" max-w-md font-serif shadow-md p-6 rounded bg-white">
      <h1 className="text-2xl font-bold mb-6">Add New Item</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Left Side */}
          <div className="flex flex-col gap-2">
            <input
              type="text"
              name="name"
              placeholder="Item Name"
              onChange={handleChange}
              className="border p-2 rounded border-gray-300"
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              onChange={handleChange}
              className="border p-2 rounded border-gray-300"
            />

            <select
              name="category"
              onChange={handleChange}
              className="border p-2 rounded border-gray-300 font-gray-300"
            >
              <option value="">Select Category</option>
              <option value="Namkeens">Namkeens</option>
              <option value="Sweets">Sweets</option>
              <option value="Nasta_Items">Nasta Items</option>
              <option value="Sabzi">Sabzi</option>
            </select>
          </div>

          {/* Right Side */}
          <div>
            <input
              type="file"
              id="imageUpload"
              className="hidden"
              onChange={handleImageChange}
            />

            <label
              htmlFor="imageUpload"
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
            >
              {preview ? (
                <img src={preview} className="h-32 object-cover rounded" />
              ) : (
                <>
                  <span className="text-4xl">📷</span>
                  <p className="text-sm text-gray-500 mt-2">
                    Click to upload image
                  </p>
                </>
              )}
            </label>
          </div>
        </div>
        <div className=" grid grid-cols-2 gap-2">
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Item
        </button>
                <button
          type="submit"
          className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
        >
          cancel
        </button>
        </div>
      </form>
    </div>
  );
};

export default AddItemForm;
