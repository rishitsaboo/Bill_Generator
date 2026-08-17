import React, { useEffect, useMemo, useState } from "react";
import {
  deleteBill,
  editBill,
  getBills,
} from "../../api/billHistory";

import type { billInformation } from "../../types/bill";

import {
  Pencil,
  Trash2,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import toast from "react-hot-toast";

type Bill = billInformation;

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const BILLS_PER_PAGE = 9;

export default function HistoryMain() {
  /* --------------------------------------------------
     STATE
  -------------------------------------------------- */

  const currentDate = new Date();

  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // 1-based month
  const [selectedMonth, setSelectedMonth] = useState<number>(
    currentDate.getMonth() + 1
  );

  const [selectedYear, setSelectedYear] = useState<number>(
    currentDate.getFullYear()
  );

  const [currentPage, setCurrentPage] = useState(1);

  /* --------------------------------------------------
     FETCH BILLS
  -------------------------------------------------- */

  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true);

        const data = await getBills();

        /*
          Sort newest bills first.
          This also protects the UI if backend
          sorting changes later.
        */
        const sortedBills = [...data].sort(
          (a, b) =>
            new Date(b.date).getTime() -
            new Date(a.date).getTime()
        );

        setBills(sortedBills);
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

  /* --------------------------------------------------
     AVAILABLE YEARS
  -------------------------------------------------- */

  const availableYears = useMemo(() => {
    const years = new Set<number>();

    // Always include current year
    years.add(currentDate.getFullYear());

    // Add years that actually exist in bills
    bills.forEach((bill) => {
      const date = new Date(bill.date);

      if (!Number.isNaN(date.getTime())) {
        years.add(date.getFullYear());
      }
    });

    return Array.from(years).sort((a, b) => b - a);
  }, [bills]);

  /* --------------------------------------------------
     FILTER BILLS BY MONTH + YEAR
  -------------------------------------------------- */

  const filteredBills = useMemo(() => {
    return bills.filter((bill) => {
      const billDate = new Date(bill.date);

      if (Number.isNaN(billDate.getTime())) {
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

  /* --------------------------------------------------
     RESET PAGE WHEN FILTER CHANGES
  -------------------------------------------------- */

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedMonth, selectedYear]);

  /* --------------------------------------------------
     PAGINATION
  -------------------------------------------------- */

  const totalPages = Math.ceil(
    filteredBills.length / BILLS_PER_PAGE
  );

  /*
    Safety:
    If deleting/filtering causes the current page
    to become invalid, move back to the last page.
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

  const currentBills = useMemo(() => {
    const startIndex =
      (currentPage - 1) * BILLS_PER_PAGE;

    const endIndex =
      startIndex + BILLS_PER_PAGE;

    return filteredBills.slice(
      startIndex,
      endIndex
    );
  }, [filteredBills, currentPage]);

  /* --------------------------------------------------
     PAGINATION BUTTONS
  -------------------------------------------------- */

  const paginationItems = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    const pages: Array<
      number | "ellipsis-start" | "ellipsis-end"
    > = [1];

    const start = Math.max(
      2,
      currentPage - 1
    );

    const end = Math.min(
      totalPages - 1,
      currentPage + 1
    );

    if (start > 2) {
      pages.push("ellipsis-start");
    }

    for (
      let page = start;
      page <= end;
      page++
    ) {
      pages.push(page);
    }

    if (end < totalPages - 1) {
      pages.push("ellipsis-end");
    }

    pages.push(totalPages);

    return pages;
  }, [currentPage, totalPages]);

  /* --------------------------------------------------
     DATE FORMAT
  -------------------------------------------------- */

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "Invalid date";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /* --------------------------------------------------
     OPEN VIEW MODAL
  -------------------------------------------------- */

  const handleViewBill = (bill: Bill) => {
    setSelectedBill(
      JSON.parse(JSON.stringify(bill))
    );

    setIsEditMode(false);
  };

  /* --------------------------------------------------
     OPEN EDIT MODAL
  -------------------------------------------------- */

  const handleEditBill = (bill: Bill) => {
    setSelectedBill(
      JSON.parse(JSON.stringify(bill))
    );

    setIsEditMode(true);
  };

  /* --------------------------------------------------
     CLOSE MODAL
  -------------------------------------------------- */

  const handleCloseModal = () => {
    setSelectedBill(null);
    setIsEditMode(false);
  };

  /* --------------------------------------------------
     DELETE BILL
  -------------------------------------------------- */

  const handleDeleteBill = async (
    billId?: string
  ) => {
    if (!billId) {
      toast.error("Bill ID not found");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this bill?"
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

      // Close modal if the deleted bill was open
      if (
        selectedBill &&
        (selectedBill._id ?? selectedBill.id) ===
          billId
      ) {
        handleCloseModal();
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

  /* --------------------------------------------------
     CHANGE ITEM
  -------------------------------------------------- */

  const handleItemChange = (
    index: number,
    field: "name" | "quantity",
    value: string
  ) => {
    if (!selectedBill) return;

    const updatedItems = [...selectedBill.items];

    if (field === "name") {
      updatedItems[index] = {
        ...updatedItems[index],
        name: value,
      };
    }

    if (field === "quantity") {
      const quantity = Math.max(
        0,
        Number(value) || 0
      );

      updatedItems[index] = {
        ...updatedItems[index],
        quantity,
        total:
          Number(updatedItems[index].price) *
          quantity,
      };
    }

    /*
      Recalculate entire bill total.
    */
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
      totalAmount,
    });
  };

  /* --------------------------------------------------
     ADD ITEM WHILE EDITING
  -------------------------------------------------- */

  const handleAddItem = () => {
    if (!selectedBill) return;

    const newItem = {
      name: "",
      quantity: 1,
      price: 0,
      total: 0,
      unit: "plate" as const,
    };

    setSelectedBill({
      ...selectedBill,
      items: [
        ...selectedBill.items,
        newItem,
      ],
    });
  };

  /* --------------------------------------------------
     REMOVE ITEM WHILE EDITING
  -------------------------------------------------- */

  const handleRemoveItem = (
    index: number
  ) => {
    if (!selectedBill) return;

    const updatedItems =
      selectedBill.items.filter(
        (_, itemIndex) =>
          itemIndex !== index
      );

    const totalAmount =
      updatedItems.reduce(
        (sum, item) =>
          sum +
          Number(item.price) *
            Number(item.quantity),
        0
      );

    setSelectedBill({
      ...selectedBill,
      items: updatedItems,
      totalAmount,
    });
  };

  /* --------------------------------------------------
     SAVE EDITED BILL
  -------------------------------------------------- */

  const handleSaveBill = async () => {
    if (!selectedBill) return;

    const billId =
      selectedBill._id ?? selectedBill.id;

    if (!billId) {
      toast.error("Bill ID not found");
      return;
    }

    try {
      const normalizedItems =
        selectedBill.items.map((item) => ({
          ...item,
          quantity:
            Number(item.quantity) || 0,
          price:
            Number(item.price) || 0,
          total:
            (Number(item.price) || 0) *
            (Number(item.quantity) || 0),
        }));

      const totalAmount =
        normalizedItems.reduce(
          (sum, item) =>
            sum + item.total,
          0
        );

      const updatedBill: Bill = {
        ...selectedBill,
        items: normalizedItems,
        totalAmount,
      };

      /*
        Send the updated bill to backend.
      */
      await editBill(
        billId,
        {
          customerName:
            updatedBill.customerName,
          items: updatedBill.items,
          totalAmount:
            updatedBill.totalAmount,
        }
      );

      /*
        Update local state immediately.
        No need to reload the page.
      */
      setBills((previousBills) =>
        previousBills.map((bill) =>
          (bill._id ?? bill.id) === billId
            ? updatedBill
            : bill
        )
      );

      setSelectedBill(updatedBill);
      setIsEditMode(false);

      toast.success(
        "Bill updated successfully"
      );
    } catch (error) {
      console.error(
        "Failed to update bill:",
        error
      );

      toast.error(
        "Failed to update bill"
      );
    }
  };

  /* --------------------------------------------------
     MONTH CHANGE
  -------------------------------------------------- */

  const handleMonthChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedMonth(
      Number(event.target.value)
    );
  };

  /* --------------------------------------------------
     YEAR CHANGE
  -------------------------------------------------- */

  const handleYearChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedYear(
      Number(event.target.value)
    );
  };

  /* --------------------------------------------------
     LOADING
  -------------------------------------------------- */

  if (loading) {
    return (
      <div className="min-h-[60vh] bg-gray-50 p-6">
        <div className="flex h-64 items-center justify-center">
          <p className="text-gray-500">
            Loading bills...
          </p>
        </div>
      </div>
    );
  }

  /* --------------------------------------------------
     UI
  -------------------------------------------------- */

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">

      {/* ---------------------------------------------
          HEADER
      --------------------------------------------- */}

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Bill History
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            View and manage your bills
          </p>
        </div>


        {/* MONTH + YEAR FILTER */}

        <div className="flex flex-wrap gap-3">

          {/* MONTH */}

          <div>
            <label
              htmlFor="bill-month"
              className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              Month
            </label>

            <select
              id="bill-month"
              value={selectedMonth}
              onChange={handleMonthChange}
              className="
                min-w-[150px]
                rounded-lg
                border
                border-gray-300
                bg-white
                px-4
                py-2.5
                text-sm
                text-gray-800
                shadow-sm
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
            >
              {MONTHS.map(
                (month, index) => (
                  <option
                    key={month}
                    value={index + 1}
                  >
                    {month}
                  </option>
                )
              )}
            </select>
          </div>


          {/* YEAR */}

          <div>
            <label
              htmlFor="bill-year"
              className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              Year
            </label>

            <select
              id="bill-year"
              value={selectedYear}
              onChange={handleYearChange}
              className="
                min-w-[120px]
                rounded-lg
                border
                border-gray-300
                bg-white
                px-4
                py-2.5
                text-sm
                text-gray-800
                shadow-sm
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
            >
              {availableYears.map(
                (year) => (
                  <option
                    key={year}
                    value={year}
                  >
                    {year}
                  </option>
                )
              )}
            </select>
          </div>

        </div>
      </div>


      {/* ---------------------------------------------
          SUMMARY
      --------------------------------------------- */}

      <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {MONTHS[selectedMonth - 1]}{" "}
            {selectedYear}
          </h2>

          <p className="text-sm text-gray-500">
            {filteredBills.length}{" "}
            {filteredBills.length === 1
              ? "bill"
              : "bills"}{" "}
            found
          </p>
        </div>

      </div>


      {/* ---------------------------------------------
          BILL LIST
      --------------------------------------------- */}

      <div className="rounded-xl bg-gray-50">

        {currentBills.length === 0 ? (

          /* EMPTY STATE */

          <div className="
            flex
            min-h-[350px]
            flex-col
            items-center
            justify-center
            rounded-xl
            border
            border-dashed
            border-gray-300
            bg-white
            px-6
            text-center
          ">

            <div className="
              mb-4
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-gray-100
              text-2xl
            ">
              🧾
            </div>

            <h3 className="text-lg font-semibold text-gray-800">
              No bills found
            </h3>

            <p className="mt-1 max-w-md text-sm text-gray-500">
              There are no bills for{" "}
              {MONTHS[selectedMonth - 1]}{" "}
              {selectedYear}.
            </p>

          </div>

        ) : (

          /* BILL GRID */

          <div className="
            grid
            grid-cols-1
            gap-6
            md:grid-cols-2
            lg:grid-cols-3
          ">

            {currentBills.map(
              (bill) => {

                const billId =
                  bill._id ?? bill.id;

                return (
                  <div
                    key={billId}
                    className="
                      flex
                      flex-col
                      justify-between
                      rounded-xl
                      bg-white
                      p-6
                      shadow-md
                      transition
                      hover:-translate-y-0.5
                      hover:shadow-lg
                    "
                  >

                    {/* DATE + ACTIONS */}

                    <div className="
                      group
                      relative
                      flex
                      items-start
                      justify-between
                      gap-3
                    ">

                      <div className="min-w-0">

                        <p className="
                          text-xs
                          uppercase
                          tracking-wider
                          text-gray-500
                        ">
                          Date
                        </p>

                        <p className="
                          mt-1
                          font-medium
                          text-gray-900
                        ">
                          {formatDate(
                            bill.date
                          )}
                        </p>

                      </div>


                      {/* EDIT + DELETE */}

                      <div className="
                        flex
                        items-center
                        gap-3
                      ">

                        <button
                          type="button"
                          title="Edit bill"
                          onClick={() =>
                            handleEditBill(
                              bill
                            )
                          }
                          className="
                            text-gray-400
                            transition
                            hover:text-blue-600
                          "
                        >
                          <Pencil size={18} />
                        </button>


                        <button
                          type="button"
                          title="Delete bill"
                          onClick={() =>
                            handleDeleteBill(
                              billId
                            )
                          }
                          className="
                            text-gray-400
                            transition
                            hover:text-red-600
                          "
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </div>


                    {/* DIVIDER */}

                    <div className="
                      my-6
                      h-px
                      w-full
                      bg-gray-200
                    " />


                    {/* BILL INFORMATION */}

                    <div className="
                      grid
                      grid-cols-2
                      items-end
                      gap-3
                    ">

                      <div>

                        <p className="
                          text-sm
                          text-gray-500
                        ">
                          {bill.items.length}{" "}
                          {bill.items.length === 1
                            ? "Item"
                            : "Items"}
                        </p>

                        <p className="
                          mt-1
                          text-xl
                          font-bold
                          text-gray-900
                        ">
                          ₹
                          {Number(
                            bill.totalAmount
                          ).toFixed(0)}
                        </p>

                      </div>


                      {/* VIEW DETAILS */}

                      <div className="flex justify-end">

                        <button
                          type="button"
                          onClick={() =>
                            handleViewBill(
                              bill
                            )
                          }
                          className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            rounded-lg
                            border
                            border-gray-300
                            bg-white
                            px-3
                            py-2
                            text-sm
                            font-medium
                            text-gray-800
                            shadow-sm
                            transition
                            hover:border-gray-400
                            hover:bg-gray-50
                          "
                        >
                          <Eye size={16} />

                          <span>
                            View Details
                          </span>

                        </button>

                      </div>

                    </div>

                  </div>
                );
              }
            )}

          </div>
        )}

      </div>


      {/* ---------------------------------------------
          PAGINATION
      --------------------------------------------- */}

      {totalPages > 1 && (

        <div className="
          mt-8
          flex
          flex-wrap
          items-center
          justify-center
          gap-2
        ">

          {/* PREVIOUS */}

          <button
            type="button"
            disabled={
              currentPage === 1
            }
            onClick={() =>
              setCurrentPage(
                (page) =>
                  Math.max(
                    1,
                    page - 1
                  )
              )
            }
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-lg
              border
              border-gray-300
              bg-white
              text-gray-700
              shadow-sm
              transition
              hover:bg-gray-100
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </button>


          {/* PAGE NUMBERS */}

          {paginationItems.map(
            (item) => {

              if (
                item ===
                  "ellipsis-start" ||
                item ===
                  "ellipsis-end"
              ) {
                return (
                  <span
                    key={item}
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      text-gray-400
                    "
                  >
                    ...
                  </span>
                );
              }

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setCurrentPage(
                      item
                    )
                  }
                  aria-current={
                    currentPage === item
                      ? "page"
                      : undefined
                  }
                  className={`
                    flex
                    h-10
                    min-w-10
                    items-center
                    justify-center
                    rounded-lg
                    px-3
                    text-sm
                    font-medium
                    transition
                    ${
                      currentPage ===
                      item
                        ? "bg-gray-900 text-white shadow-sm"
                        : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  {item}
                </button>
              );
            }
          )}


          {/* NEXT */}

          <button
            type="button"
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage(
                (page) =>
                  Math.min(
                    totalPages,
                    page + 1
                  )
              )
            }
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-lg
              border
              border-gray-300
              bg-white
              text-gray-700
              shadow-sm
              transition
              hover:bg-gray-100
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
            aria-label="Next page"
          >
            <ChevronRight size={18} />
          </button>

        </div>

      )}


      {/* ---------------------------------------------
          BILL DETAILS / EDIT MODAL
      --------------------------------------------- */}

      {selectedBill && (

        <div className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/40
          p-4
          backdrop-blur-sm
        ">

          <div className="
            max-h-[90vh]
            w-full
            max-w-4xl
            overflow-y-auto
            rounded-xl
            bg-white
            p-6
            shadow-2xl
          ">

            {/* MODAL HEADER */}

            <div className="
              mb-6
              flex
              items-start
              justify-between
              gap-4
            ">

              <div className="min-w-0">

                {isEditMode ? (

                  <input
                    type="text"
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
                    className="
                      w-full
                      rounded-lg
                      border
                      border-gray-300
                      px-3
                      py-2
                      text-xl
                      font-bold
                      outline-none
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-100
                    "
                  />

                ) : (

                  <h2 className="
                    truncate
                    text-2xl
                    font-bold
                    text-gray-900
                  ">
                    {selectedBill.customerName}
                  </h2>

                )}

                <p className="
                  mt-1
                  text-sm
                  text-gray-500
                ">
                  Date:{" "}
                  {formatDate(
                    selectedBill.date
                  )}
                </p>

              </div>


              <button
                type="button"
                onClick={handleCloseModal}
                className="
                  rounded-lg
                  p-1
                  text-gray-400
                  transition
                  hover:bg-gray-100
                  hover:text-gray-700
                "
                aria-label="Close"
              >
                <X size={24} />
              </button>

            </div>


            {/* ITEMS TABLE */}

            <div className="
              mb-6
              overflow-x-auto
              rounded-lg
              border
              border-gray-200
            ">

              <table className="
                w-full
                min-w-[650px]
              ">

                <thead className="
                  bg-gray-100
                ">

                  <tr>

                    <th className="
                      px-4
                      py-3
                      text-left
                      font-semibold
                      text-gray-700
                    ">
                      Item
                    </th>

                    <th className="
                      px-4
                      py-3
                      text-center
                      font-semibold
                      text-gray-700
                    ">
                      Qty
                    </th>

                    <th className="
                      px-4
                      py-3
                      text-right
                      font-semibold
                      text-gray-700
                    ">
                      Price
                    </th>

                    <th className="
                      px-4
                      py-3
                      text-right
                      font-semibold
                      text-gray-700
                    ">
                      Total
                    </th>

                    {isEditMode && (
                      <th className="
                        px-4
                        py-3
                        text-center
                        font-semibold
                        text-gray-700
                      ">
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
                        className="
                          border-t
                          border-gray-200
                        "
                      >

                        {/* ITEM */}

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
                              className="
                                w-full
                                rounded
                                border
                                border-gray-300
                                px-2
                                py-1.5
                                outline-none
                                focus:border-blue-500
                              "
                              placeholder="Item name"
                            />

                          ) : (

                            <span className="
                              font-medium
                              text-gray-800
                            ">
                              {item.name}
                            </span>

                          )}

                        </td>


                        {/* QUANTITY */}

                        <td className="
                          px-4
                          py-3
                          text-center
                        ">

                          {isEditMode ? (

                            <input
                              type="number"
                              min="0"
                              value={
                                item.quantity
                              }
                              onChange={(event) =>
                                handleItemChange(
                                  index,
                                  "quantity",
                                  event.target.value
                                )
                              }
                              className="
                                w-20
                                rounded
                                border
                                border-gray-300
                                px-2
                                py-1.5
                                text-center
                                outline-none
                                focus:border-blue-500
                              "
                            />

                          ) : (

                            item.quantity

                          )}

                        </td>


                        {/* PRICE */}

                        <td className="
                          px-4
                          py-3
                          text-right
                        ">
                          ₹
                          {Number(
                            item.price
                          ).toFixed(2)}
                        </td>


                        {/* TOTAL */}

                        <td className="
                          px-4
                          py-3
                          text-right
                          font-medium
                        ">
                          ₹
                          {(
                            Number(item.price) *
                            Number(item.quantity)
                          ).toFixed(2)}
                        </td>


                        {/* DELETE ITEM */}

                        {isEditMode && (

                          <td className="
                            px-4
                            py-3
                            text-center
                          ">

                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveItem(
                                  index
                                )
                              }
                              className="
                                rounded
                                p-1
                                text-red-500
                                transition
                                hover:bg-red-50
                                hover:text-red-700
                              "
                              title="Remove item"
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


            {/* MODAL FOOTER */}

            <div className="
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            ">

              {/* ADD ITEM */}

              {isEditMode ? (

                <button
                  type="button"
                  onClick={handleAddItem}
                  className="
                    rounded-lg
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-gray-800
                    transition
                    hover:bg-gray-100
                  "
                >
                  + Add Item
                </button>

              ) : (

                <div />

              )}


              {/* TOTAL */}

              <div className="
                flex
                flex-col
                items-start
                sm:items-end
              ">

                <span className="
                  text-sm
                  font-medium
                  text-gray-500
                ">
                  Total Amount
                </span>

                <span className="
                  mt-1
                  text-2xl
                  font-bold
                  text-gray-900
                ">
                  ₹
                  {Number(
                    selectedBill.totalAmount
                  ).toFixed(2)}
                </span>

              </div>

            </div>


            {/* SAVE / CLOSE */}

            <div className="
              mt-6
              flex
              justify-end
              gap-3
              border-t
              border-gray-200
              pt-5
            ">

              {isEditMode ? (

                <>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="
                      rounded-lg
                      border
                      border-gray-300
                      bg-white
                      px-5
                      py-2.5
                      text-sm
                      font-medium
                      text-gray-700
                      hover:bg-gray-50
                    "
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveBill}
                    className="
                      rounded-lg
                      bg-gray-900
                      px-5
                      py-2.5
                      text-sm
                      font-medium
                      text-white
                      shadow-sm
                      transition
                      hover:bg-gray-800
                    "
                  >
                    Save Changes
                  </button>
                </>

              ) : (

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="
                    rounded-lg
                    bg-gray-900
                    px-5
                    py-2.5
                    text-sm
                    font-medium
                    text-white
                    shadow-sm
                    transition
                    hover:bg-gray-800
                  "
                >
                  Close
                </button>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}