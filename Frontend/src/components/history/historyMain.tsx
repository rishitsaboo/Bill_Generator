import React, { useEffect, useMemo, useState } from "react";
import { deleteBill, getBills } from "../../api/billHistory";
import type { billInformation } from "../../types/bill";
import { Pencil, Trash2, Eye, X } from "lucide-react";
import toast from "react-hot-toast";

type Bill = billInformation & {
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export default function HistoryMain() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Current month/year by default
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );

  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  const [currentPage, setCurrentPage] = useState(1);

  const billsPerPage = 9;

  /*
   * ---------------------------------------------------------
   * MONTHS
   * ---------------------------------------------------------
   */

  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  /*
   * ---------------------------------------------------------
   * YEARS
   * ---------------------------------------------------------
   *
   * Creates a useful year list based on the current year.
   * You can increase this range if needed.
   */

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();

    return Array.from({ length: 7 }, (_, index) => currentYear - index);
  }, []);

  /*
   * ---------------------------------------------------------
   * FETCH BILLS
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true);

        const data = await getBills();

        console.log("Bills received from API:", data);

        setBills(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch bills:", error);

        setBills([]);

        toast.error("Failed to load bill history");
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  /*
   * ---------------------------------------------------------
   * GET ACTUAL BILL DATE
   * ---------------------------------------------------------
   *
   * IMPORTANT:
   *
   * We prefer the saved bill date so records are shown in
   * their intended billing month and year.
   *
   * If it does not exist, we fall back to createdAt.
   */

  const getBillDate = (bill: Bill): Date | null => {
    const rawDate = bill.date ?? bill.createdAt;

    if (!rawDate) {
      return null;
    }

    const date = new Date(rawDate);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return date;
  };

  /*
   * ---------------------------------------------------------
   * FILTER BY MONTH + YEAR
   * ---------------------------------------------------------
   */

  const filteredBills = useMemo(() => {
    return bills.filter((bill) => {
      const billDate = getBillDate(bill);

      if (!billDate) {
        return false;
      }

      const billMonth = billDate.getMonth() + 1;
      const billYear = billDate.getFullYear();

      return (
        billMonth === selectedMonth &&
        billYear === selectedYear
      );
    });
  }, [bills, selectedMonth, selectedYear]);

  /*
   * ---------------------------------------------------------
   * RESET PAGE WHEN MONTH/YEAR CHANGES
   * ---------------------------------------------------------
   */

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedMonth, selectedYear]);

  /*
   * ---------------------------------------------------------
   * PAGINATION
   * ---------------------------------------------------------
   */

  const totalPages = Math.ceil(
    filteredBills.length / billsPerPage
  );

  const indexOfFirstBill =
    (currentPage - 1) * billsPerPage;

  const indexOfLastBill =
    indexOfFirstBill + billsPerPage;

  const currentBills = filteredBills.slice(
    indexOfFirstBill,
    indexOfLastBill
  );

  /*
   * Keep current page valid
   */

  useEffect(() => {
    if (totalPages === 0) {
      setCurrentPage(1);
      return;
    }

    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  /*
   * ---------------------------------------------------------
   * PAGINATION BUTTONS
   * ---------------------------------------------------------
   */

  const paginationItems = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    const pages: Array<
      number | "ellipsis-start" | "ellipsis-end"
    > = [];

    pages.push(1);

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(
      totalPages - 1,
      currentPage + 1
    );

    if (start > 2) {
      pages.push("ellipsis-start");
    }

    for (let page = start; page <= end; page++) {
      pages.push(page);
    }

    if (end < totalPages - 1) {
      pages.push("ellipsis-end");
    }

    pages.push(totalPages);

    return pages;
  }, [totalPages, currentPage]);

  /*
   * ---------------------------------------------------------
   * FORMAT DATE
   * ---------------------------------------------------------
   */

  const formatDate = (dateValue: string | Date | undefined) => {
    if (!dateValue) {
      return "Unknown date";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "Unknown date";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /*
   * ---------------------------------------------------------
   * SELECTED MONTH LABEL
   * ---------------------------------------------------------
   */

  const selectedMonthLabel =
    months.find(
      (month) => month.value === selectedMonth
    )?.label ?? "";

  /*
   * ---------------------------------------------------------
   * DELETE BILL
   * ---------------------------------------------------------
   */

  const handleDeleteBill = async (billId?: string) => {
    if (!billId) {
      toast.error("Unable to delete bill. Missing bill ID.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this bill? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteBill(billId);

      setBills((previousBills) =>
        previousBills.filter(
          (bill) =>
            (bill._id ?? bill.id) !== billId
        )
      );

      if (
        selectedBill &&
        (selectedBill._id ?? selectedBill.id) === billId
      ) {
        setSelectedBill(null);
      }

      toast.success("Bill deleted successfully");
    } catch (error) {
      console.error(
        "Failed to delete bill:",
        error
      );

      toast.error("Failed to delete bill");
    }
  };

  /*
   * ---------------------------------------------------------
   * HANDLE ITEM CHANGE
   * ---------------------------------------------------------
   */

  const handleItemChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    if (!selectedBill) {
      return;
    }

    const updatedItems = [...selectedBill.items];

    updatedItems[index] = {
      ...updatedItems[index],
      [field]:
        field === "name"
          ? value
          : Number(value),
    };

    updatedItems[index].total =
      Number(updatedItems[index].price) *
      Number(updatedItems[index].quantity);

    const totalAmount = updatedItems.reduce(
      (sum, item) =>
        sum +
        Number(item.price) *
          Number(item.quantity),
      0
    );

    setSelectedBill({
      ...selectedBill,
      items: updatedItems,
      totalAmount: Math.ceil(totalAmount),
    });
  };

  /*
   * ---------------------------------------------------------
   * LOADING
   * ---------------------------------------------------------
   */

  if (loading) {
    return (
      <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex h-64 items-center justify-center">
          <p className="text-gray-500">
            Loading bills...
          </p>
        </div>
      </div>
    );
  }

  /*
   * ---------------------------------------------------------
   * UI
   * ---------------------------------------------------------
   */

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Bill History
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Browse and manage your bills by month.
          </p>
        </div>

        {/* MONTH + YEAR */}

        <div className="flex flex-col gap-3 sm:flex-row">

          {/* MONTH */}

          <div className="flex flex-col gap-1">
            <label
              htmlFor="month-select"
              className="text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              Month
            </label>

            <select
              id="month-select"
              value={selectedMonth}
              onChange={(event) => {
                setSelectedMonth(
                  Number(event.target.value)
                );
                setCurrentPage(1);
              }}
              className="min-w-[180px] rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {months.map((month) => (
                <option
                  key={month.value}
                  value={month.value}
                >
                  {month.label}
                </option>
              ))}
            </select>
          </div>

          {/* YEAR */}

          <div className="flex flex-col gap-1">
            <label
              htmlFor="year-select"
              className="text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              Year
            </label>

            <select
              id="year-select"
              value={selectedYear}
              onChange={(event) => {
                setSelectedYear(
                  Number(event.target.value)
                );
                setCurrentPage(1);
              }}
              className="min-w-[140px] rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {years.map((year) => (
                <option
                  key={year}
                  value={year}
                >
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* =====================================================
          MONTH SUMMARY
      ====================================================== */}

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          {selectedMonthLabel} {selectedYear}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {filteredBills.length}{" "}
          {filteredBills.length === 1
            ? "bill"
            : "bills"}{" "}
          found
        </p>
      </div>

      {/* =====================================================
          BILL LIST
      ====================================================== */}

      <div className="rounded-xl bg-gray-50 p-4 shadow-sm sm:p-6">

        {currentBills.length === 0 ? (

          /* EMPTY STATE */

          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-6 text-center">

            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-3xl">
              🧾
            </div>

            <h3 className="text-xl font-semibold text-gray-900">
              No bills found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              There are no bills for{" "}
              {selectedMonthLabel}{" "}
              {selectedYear}.
            </p>
          </div>

        ) : (

          /* BILL GRID */

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

            {currentBills.map((bill) => {

              const billId =
                bill._id ?? bill.id;

              const billDate =
                getBillDate(bill);

              return (
                <div
                  key={billId}
                  className="group flex flex-col justify-between rounded-xl bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
                >

                  {/* DATE + ACTIONS */}

                  <div className="relative">

                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500">
                        Date
                      </p>

                      <p className="mt-1 font-medium text-gray-900">
                        {formatDate(billDate ?? undefined)}
                      </p>
                    </div>

                    {/* EDIT / DELETE */}

                    <div className="absolute right-0 top-0 flex gap-4 opacity-0 transition-opacity group-hover:opacity-100">

                      <button
                        type="button"
                        className="text-gray-500 transition hover:text-blue-500"
                        title="Edit bill"
                        onClick={() => {
                          setSelectedBill(
                            JSON.parse(
                              JSON.stringify(bill)
                            )
                          );
                          setIsEditMode(true);
                        }}
                      >
                        <Pencil size={19} />
                      </button>

                      <button
                        type="button"
                        className="text-gray-500 transition hover:text-red-600"
                        title="Delete bill"
                        onClick={() =>
                          handleDeleteBill(
                            billId
                          )
                        }
                      >
                        <Trash2 size={19} />
                      </button>

                    </div>
                  </div>

                  {/* DIVIDER */}

                  <div className="my-6 h-px w-full bg-gray-300" />

                  {/* BILL SUMMARY */}

                  <div className="grid grid-cols-2 items-center gap-2">

                    <div>
                      <p className="text-sm text-gray-600">
                        {bill.items.length}{" "}
                        {bill.items.length === 1
                          ? "Item"
                          : "Items"}
                      </p>

                      <p className="mt-1 text-xl font-bold text-gray-900">
                        ₹
                        {Number(
                          bill.totalAmount
                        ).toFixed(0)}
                      </p>
                    </div>

                    {/* VIEW */}

                    <div className="flex justify-end">

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedBill(
                            JSON.parse(
                              JSON.stringify(bill)
                            )
                          );
                          setIsEditMode(false);
                        }}
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-medium text-gray-800 shadow-sm transition hover:border-gray-400 hover:bg-gray-200 hover:shadow"
                      >
                        <Eye size={15} />

                        <span>
                          View Details
                        </span>
                      </button>

                    </div>
                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>

      {/* =====================================================
          PAGINATION
      ====================================================== */}

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">

          {/* PREVIOUS */}

          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() =>
              setCurrentPage(
                (previous) =>
                  Math.max(
                    previous - 1,
                    1
                  )
              )
            }
            aria-label="Previous page"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ❮
          </button>

          {/* PAGE NUMBERS */}

          {paginationItems.map((item) => {

            if (typeof item !== "number") {
              return (
                <span
                  key={item}
                  className="flex h-10 w-8 items-center justify-center text-gray-500"
                >
                  …
                </span>
              );
            }

            return (
              <button
                type="button"
                key={item}
                onClick={() =>
                  setCurrentPage(item)
                }
                aria-label={`Page ${item}`}
                aria-current={
                  currentPage === item
                    ? "page"
                    : undefined
                }
                className={`flex h-10 w-10 items-center justify-center rounded-lg font-medium transition ${
                  currentPage === item
                    ? "border bg-white text-black shadow-md"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                {item}
              </button>
            );
          })}

          {/* NEXT */}

          <button
            type="button"
            disabled={
              currentPage >= totalPages
            }
            onClick={() =>
              setCurrentPage(
                (previous) =>
                  Math.min(
                    previous + 1,
                    totalPages
                  )
              )
            }
            aria-label="Next page"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500 text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ❯
          </button>

        </div>
      )}

      {/* =====================================================
          BILL DETAILS MODAL
      ====================================================== */}

      {selectedBill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-[95vw] overflow-y-auto rounded-xl bg-white p-6 shadow-lg sm:max-w-3xl lg:max-w-4xl">

            {/* HEADER */}

            <div className="mb-6 flex items-start justify-between gap-4">

              <div className="min-w-0">

                {isEditMode ? (
                  <input
                    value={
                      selectedBill.customerName
                    }
                    onChange={(event) =>
                      setSelectedBill({
                        ...selectedBill,
                        customerName:
                          event.target.value,
                      })
                    }
                    className="w-full rounded border px-2 py-1 text-xl font-bold"
                  />
                ) : (
                  <h2 className="mb-1 truncate text-2xl font-bold">
                    {selectedBill.customerName}
                  </h2>
                )}

                <p className="text-sm text-gray-500">
                  Date:{" "}
                  {formatDate(
                    getBillDate(
                      selectedBill
                    ) ?? undefined
                  )}
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedBill(null)
                }
                className="text-gray-400 transition hover:text-gray-600"
              >
                <X size={24} />
              </button>

            </div>

            {/* ITEMS */}

            <div className="mb-6 overflow-x-auto rounded-lg border border-gray-200">

              <table className="w-full min-w-[600px]">

                <thead className="bg-gray-100">

                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">
                      Item
                    </th>

                    <th className="px-4 py-3 text-center font-semibold">
                      Qty
                    </th>

                    <th className="px-4 py-3 text-right font-semibold">
                      Price
                    </th>

                    <th className="px-4 py-3 text-right font-semibold">
                      Total
                    </th>

                    {isEditMode && (
                      <th className="px-4 py-3 text-center font-semibold">
                        Action
                      </th>
                    )}
                  </tr>

                </thead>

                <tbody>

                  {selectedBill.items.map(
                    (item, index) => (
                      <tr
                        key={index}
                        className="border-t border-gray-200"
                      >

                        {/* NAME */}

                        <td className="px-4 py-3">

                          {isEditMode ? (
                            <input
                              type="text"
                              value={item.name}
                              onChange={(event) =>
                                handleItemChange(
                                  index,
                                  "name",
                                  event.target.value
                                )
                              }
                              className="w-full rounded border px-2 py-1"
                              placeholder="Item Name"
                            />
                          ) : (
                            <span>
                              {item.name}
                            </span>
                          )}

                        </td>

                        {/* QUANTITY */}

                        <td className="px-4 py-3 text-center">

                          {isEditMode ? (
                            <input
                              type="number"
                              min="0"
                              value={
                                item.quantity
                              }
                              className="w-16 rounded border px-1 py-1 text-center"
                              onChange={(event) =>
                                handleItemChange(
                                  index,
                                  "quantity",
                                  Number(
                                    event.target
                                      .value
                                  )
                                )
                              }
                            />
                          ) : (
                            item.quantity
                          )}

                        </td>

                        {/* PRICE */}

                        <td className="px-4 py-3 text-right">
                          ₹
                          {Number(
                            item.price
                          ).toFixed(2)}
                        </td>

                        {/* TOTAL */}

                        <td className="px-4 py-3 text-right">
                          ₹
                          {(
                            Number(
                              item.price
                            ) *
                            Number(
                              item.quantity
                            )
                          ).toFixed(2)}
                        </td>

                        {/* DELETE ITEM */}

                        {isEditMode && (
                          <td className="px-4 py-3 text-center">

                            <button
                              type="button"
                              onClick={() => {

                                const updatedItems =
                                  selectedBill.items.filter(
                                    (_, itemIndex) =>
                                      itemIndex !==
                                      index
                                  );

                                const totalAmount =
                                  updatedItems.reduce(
                                    (
                                      sum,
                                      currentItem
                                    ) =>
                                      sum +
                                      Number(
                                        currentItem.price
                                      ) *
                                      Number(
                                        currentItem.quantity
                                      ),
                                    0
                                  );

                                setSelectedBill({
                                  ...selectedBill,
                                  items:
                                    updatedItems,
                                  totalAmount:
                                    Math.ceil(
                                      totalAmount
                                    ),
                                });
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={16} />
                            </button>

                          </td>
                        )}

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

            {/* BOTTOM */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              {/* ADD ITEM */}

              {isEditMode && (
                <button
                  type="button"
                  onClick={() => {

                    const updatedItems = [
                      ...selectedBill.items,
                      {
                        name: "",
                        quantity: 1,
                        price: 0,
                        total: 0,
                          unit: "plate" as const,
                      },
                    ];

                    setSelectedBill({
                      ...selectedBill,
                      items: updatedItems,
                    });
                  }}
                  className="inline-flex items-center justify-center rounded border border-gray-300 bg-gray-100 px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  + Add Item
                </button>
              )}

              {/* TOTAL */}

              <div className="flex flex-col items-start gap-1 sm:items-end">

                <span className="text-sm font-medium text-gray-600">
                  Total Amount
                </span>

                <span className="text-xl font-semibold">
                  ₹
                  {Number(
                    selectedBill.totalAmount
                  ).toFixed(2)}
                </span>

              </div>

            </div>

            {/* SAVE */}

            {isEditMode && (
              <div className="mt-6 flex justify-end">

                <button
                  type="button"
                  onClick={() => {
                    toast(
                      "Save API is not connected yet."
                    );
                  }}
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Save Changes
                </button>

              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
