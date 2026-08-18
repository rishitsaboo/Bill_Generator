import { FiEdit } from "react-icons/fi";
import type { Item } from "../../types/Item";
import { MdDelete } from "react-icons/md";

type ItemRowProps = { item: Item; onEdit: (item: Item) => void; onDelete: (id: string) => void; mobile?: boolean };

const ItemRow = ({ item, onEdit, onDelete, mobile = false }: ItemRowProps) => {
  const actions = <div className="flex items-center gap-2">
    <button onClick={() => onEdit(item)} className="flex flex-1 items-center justify-center gap-2 rounded bg-blue-500 px-3 py-2 text-sm text-white shadow-md hover:bg-blue-600"><FiEdit /> Edit</button>
    <button onClick={() => onDelete(item._id!)} className="flex flex-1 items-center justify-center gap-2 rounded bg-red-500 px-3 py-2 text-sm text-white shadow-md hover:bg-red-600"><MdDelete /> Delete</button>
  </div>;

  if (mobile) return <article className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
    <div className="mb-3 flex items-start justify-between gap-3"><h2 className="font-semibold text-gray-900">{item.name}</h2><span className="whitespace-nowrap font-medium text-gray-900">₹{item.price}</span></div>
    <dl className="mb-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
      <div><dt className="text-gray-500">Category</dt><dd className="font-medium text-gray-800">{item.category}</dd></div>
      <div><dt className="text-gray-500">Best seller</dt><dd className="font-medium text-gray-800">{item.isBestSeller ? "Yes" : "No"}</dd></div>
    </dl>
    {actions}
  </article>;

  return <tr className="border-b hover:bg-gray-50">
    <td className="px-4 py-3">{item.name}</td><td className="px-4 py-3">{item.price}</td><td className="px-4 py-3">{item.category}</td><td className="px-4 py-3">{item.isBestSeller ? "Yes" : "No"}</td><td className="px-4 py-3">{actions}</td>
  </tr>;
};

export default ItemRow;
