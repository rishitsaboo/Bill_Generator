import type { Item } from "../../types/Item"
import ItemRow from "./ItemRow"

type ItemTableProps = {
    items: Item[];
    onEdit: (item: Item) => void;
    onDelete: (id: string) => void;
}
const ItemTable = ({ items, onEdit, onDelete }: ItemTableProps) =>{
    return(
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
                <tr className="text-left">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Action</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <ItemRow
                    key = {item._id}
                    item = {item}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    />
                ))}
            </tbody>
        </table>
    );
};
export default ItemTable;