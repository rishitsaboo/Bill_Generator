import type { Item } from "../../types/Item";

type ItemRowProps = {
    item: Item;
    onEdit: (item:Item) =>void;
    onDelete: (item:string) =>void;

};

const ItemRow = ({item,onEdit,onDelete} :ItemRowProps) =>{
    
    return(
        <tr className="border-b hover:bg-gray-50">
            <td className="px-4 py-3"> {item.name} </td>
            <td className="px-4 py-3"> {item.price} </td>
            <td className="px-4 py-3"> {item.category} </td>
            <td>
                <button
                onClick={() => onEdit(item)}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                >
                    Edit
                </button>
                <button
                onClick={() => onDelete(item._id!)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                >
                    Delete
                </button>
            </td>
        </tr>
            
    )
}  
export default ItemRow;