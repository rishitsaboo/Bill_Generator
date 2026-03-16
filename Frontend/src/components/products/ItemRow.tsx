import { FiEdit } from "react-icons/fi";
import type { Item } from "../../types/Item";
import { MdDelete } from "react-icons/md";

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
            
            <td className="px-4 py-3 flex items-center gap-2">
                <button
                onClick={() => onEdit(item)}
                className="flex items-center gap-2 shadow-md bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                >
                    <FiEdit />
                    Edit
                </button>
                <button
                onClick={() => onDelete(item._id!)}
                className=" flex items-center gap-2 bg-red-500 shadow-md text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                >
                    <MdDelete />
                    Delete
                </button>
            </td>
        </tr>   
            
    )
}  
export default ItemRow;
