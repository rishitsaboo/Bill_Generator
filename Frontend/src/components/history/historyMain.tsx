import React, { useEffect, useState } from "react";
import { editBill, getBills } from "../../api/billHistory";
import type { billInformation } from "../../types/bill";
import { Pencil, Trash2, Eye, X } from "lucide-react";
import { data } from "react-router-dom";

type Bill = billInformation;

// Dummy bills for testing


export default function HistoryMain() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1); // 1-based month
  const [filteredBills, setFilteredBills] = useState<Bill[]>([]);


  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true);
        // Comment line below to use real API data
         const data = await getBills();
        setBills(data);
        // initialize filteredBills based on current month selection
        const initFiltered = data.filter((b) => new Date(b.date).getMonth() + 1 === selectedMonth);
        setFilteredBills(initFiltered);
      } catch (error) {
        console.error("Failed to fetch bills:", error);
        // Fallback to dummy data on error
        setBills([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBills();
  }, []);

  // Filter bills when selectedMonth or bills change. This mirrors the dashboard date safety logic.
  useEffect(() => {
    let mounted = true;
    try {
      const today = new Date();
      const daysInSelectedMonth = new Date(today.getFullYear(), selectedMonth, 0).getDate();
      const safeDay = Math.min(today.getDate(), daysInSelectedMonth);
      const selectedDate = new Date(today.getFullYear(), selectedMonth - 1, safeDay);

      if (!mounted) return;
      const filtered = bills.filter((b) => {
        const billDate = new Date(b.date);
        return billDate.getFullYear() === selectedDate.getFullYear() && billDate.getMonth() === selectedDate.getMonth();
      });
      setFilteredBills(filtered);
    } catch (e) {
      // ignore and keep existing filteredBills on error
    }
    return () => {
      mounted = false;
    };
  }, [selectedMonth, bills]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  const handleItemChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    if (!selectedBill) return;

    const updatedItems = [...selectedBill.items];

    updatedItems[index] = {
      ...updatedItems[index],
      [field]: field === "name" ? value : Number(value),
    };

    updatedItems[index].total =
      updatedItems[index].price * updatedItems[index].quantity;

    setSelectedBill({
      ...selectedBill,
      items: updatedItems,
      totalAmount: updatedItems.reduce((sum, item) => sum + item.total, 0),
    });
    
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Bill History</h1>
          <p className="mt-1 text-sm text-gray-500">
            Browse and manage monthly invoice records.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <label htmlFor="month-select" className="text-sm font-medium text-gray-600">
            Month
          </label>
          <div className="relative inline-flex">
            <select
              id="month-select"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="appearance-none rounded-2xl border border-gray-300 bg-white px-4 py-2 pr-10 text-sm font-medium text-gray-700 shadow-sm outline-none transition duration-150 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value={1}>January</option>
              <option value={2}>February</option>
              <option value={3}>March</option>
              <option value={4}>April</option>
              <option value={5}>May</option>
              <option value={6}>June</option>
              <option value={7}>July</option>
              <option value={8}>August</option>
              <option value={9}>September</option>
              <option value={10}>October</option>
              <option value={11}>November</option>
              <option value={12}>December</option>
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading bills...</p>
        </div>
      ) : (
        <div className=" bg-gray-50 p-6 rounded-lg shadow-sm ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(filteredBills.length ? filteredBills : bills).map((bill) => (
                <div
                key={bill._id ?? bill.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col justify-between"
                >
                {/* Date */}
                <div className="flex flex-row flex-wrap items-center justify-between gap-2 bg-white rounded-lg transition-shadow relative group">
                    <div className="min-w-0">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Date
                        </p>
                        <p className="text-gray-800 font-medium">
                        {formatDate(bill.date)}
                        </p>
                    </div>
                    <div className="flex items-center justify-end gap-2 mt-0 md:absolute md:top-2 md:right-4 md:opacity-0 md:group-hover:opacity-100 md:transition-opacity">
                        <button className="text-gray-500 hover:text-blue-500"
                            onClick={() => {
                                setSelectedBill(JSON.parse(JSON.stringify(bill)));
                                setIsEditMode(true);
                            }}
                        >
                        <Pencil size={16} />
                        </button>

                        <button className="text-gray-500 hover:text-red-600">
                        <Trash2 size={16} />
                        </button>
                    </div>
                </div>
                <div className="h-0.5 bg-gray-300 w-full my-6"></div>
                {/* Items Count */}
                <div className="grid grid-cols-2 gap-1 items-center">
                    <div>
                        <p className="text-sm text-gray-600 tracking-wide">
                            {bill.items.length} Items
                        </p>
                        <p className="text-lg font-bold text-gray-900 mt-1">
                            ₹{bill.totalAmount}
                        </p>
                    </div>
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => {
                            setSelectedBill(JSON.parse(JSON.stringify(bill)));
                            setIsEditMode(false);
                        }}
                        className="inline-flex w-full justify-center bg-gray-100 hover:bg-gray-200 border border-gray-300 hover:border-gray-400 text-gray-800 font-medium text-sm py-1.5 px-3 rounded-md items-center gap-2 shadow-sm hover:shadow md:w-auto"
                      >
                        <Eye size={15} />
                        <span>View Details</span>
                      </button>
                    </div>
                </div>
                {/* View Details Button */}
                
                </div>
            ))}
            </div>
        </div>
      )}

      {/* Bill Details Modal */}
      {selectedBill && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-[95vw] sm:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start mb-6">
              <div className="min-w-0">
                {isEditMode ? (
                  <input
                    value={selectedBill.customerName}
                    onChange={(e) => setSelectedBill({ ...selectedBill, customerName: e.target.value })}
                    className="border rounded px-2 py-1 text-xl font-bold w-full"
                  />
                ) : (
                  <h2 className="text-2xl font-bold mb-1 truncate">
                    {selectedBill.customerName}
                  </h2>
                )}
                <p className="text-sm text-gray-500">Date: {formatDate(selectedBill.date)}</p>
              </div>
              <button
                onClick={() => setSelectedBill(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors self-start"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 mb-6">
              <table className="w-full min-w-[600px]">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Item</th>
                    <th className="px-4 py-3 text-center font-semibold">Qty</th>
                    <th className="px-4 py-3 text-right font-semibold">Price</th>
                    <th className="px-4 py-3 text-right font-semibold">Total</th>
                    {isEditMode && (<th className="px-4 py-3 text-center">Action</th>
)}
                  </tr>
                </thead>

                <tbody>
                  {selectedBill.items.map((item, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleItemChange(index, "name", e.target.value)}
                          className="border rounded px-2 py-1 w-full"
                          placeholder="Item Name"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        {isEditMode ? (
                          <input
                            type="number"
                            value={item.quantity}
                            className="w-16 border rounded px-1 py-0 text-center"
                            onChange={(e) => {
                              const updatedQuantity = [...selectedBill.items];
                              updatedQuantity[index].quantity = Number(e.target.value);
                              setSelectedBill({ ...selectedBill, items: updatedQuantity });
                            }}
                          />
                        ) : (
                          item.quantity
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        ₹{Number(item.price).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        ₹{(Number(item.price) * Number(item.quantity)).toFixed(2)}
                      </td>
                      {isEditMode && (
                        <td className="text-center">
                          <button
                            onClick={() => {
                              const updatedItems = selectedBill.items.filter((_, i) => i !== index);
                              setSelectedBill({ ...selectedBill, items: updatedItems });
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {isEditMode && (
                <button
                  onClick={() => {
                    setSelectedBill({
                      ...selectedBill,
                      items: [
                        ...selectedBill.items,
                        {
                          name: "",
                          quantity: 1,
                          price: 0,
                          total: 0,
                        },
                      ],
                    });
                  }}
                  className="inline-flex items-center justify-center bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200 px-4 py-2 rounded"
                >
                  + Add Item
                </button>
              )}

              <div className="flex flex-col items-start sm:items-end gap-2">
                <span className="text-sm font-medium text-gray-600">Total Amount</span>
                <span className="text-xl font-semibold">₹{Number(selectedBill.totalAmount).toFixed(2)}</span>
              </div>
            </div>

            {isEditMode && (
              <div className="mt-4 flex justify-end">
                <button
                  // onClick={handleSaveBill}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
              </div>
            )}

            {/* Close Button */}

          </div>
        </div>
      )}
    </div>
  );
}