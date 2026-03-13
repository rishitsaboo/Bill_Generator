type Props = {
    selected: string
    onSelect: (category: string) => void
}

const categories = [
  "Namkeens",
  "Nasta_Items",
  "Sweets",
  "Sabzi",
]

const CategortFilter = ({selected,onSelect}: Props) =>{
    return(
        <div className="overflow-x-auto whitespace-nowrap flex space-x-2 bg-gray-100 pb-2">
            {categories.map((cat)=> (
                <button
                    key= {cat}
                    onClick={() => onSelect(cat)}
                    className={`px-4 py-2 rounded-lg 
                        ${selected === cat
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                        }
                    `}>
                        {cat}
                </button>
            ))}
        </div>
    )
}
export default CategortFilter;