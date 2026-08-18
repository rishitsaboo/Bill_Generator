import type { Item } from "../../types/Item";
import ItemRow from "./ItemRow";

type ItemTableProps = { items: Item[]; onEdit: (item: Item) => void; onDelete: (id: string) => void };

const ItemTable = ({ items, onEdit, onDelete }: ItemTableProps) => (
  <>
    <div className="hidden overflow-x-auto rounded-lg border border-gray-300 md:block">
      <table className="w-full min-w-[700px]">
        <thead className="bg-gray-100"><tr className="text-left">
          <th className="px-4 py-3">Name</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Best Seller</th><th className="px-4 py-3">Action</th>
        </tr></thead>
        <tbody>{items.map((item) => <ItemRow key={item._id} item={item} onEdit={onEdit} onDelete={onDelete} />)}</tbody>
      </table>
    </div>
    <div className="space-y-3 md:hidden">
      {items.map((item) => <ItemRow key={item._id} item={item} onEdit={onEdit} onDelete={onDelete} mobile />)}
      {items.length === 0 && <p className="rounded-lg border border-dashed border-gray-300 p-5 text-center text-sm text-gray-500">No items found.</p>}
    </div>
  </>
);

export default ItemTable;
