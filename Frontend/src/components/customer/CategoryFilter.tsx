interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { label: "All", value: "All" },
  { label: "Namkeens", value: "Namkeens" },
  { label: "Sweets", value: "Sweets" },
  { label: "Sabzi", value: "Sabzi" },
  { label: "Nasta Items", value: "Nasta_Items" },
  { label: "Others", value: "Others" },
];

export default function CategoryFilter({
  value,
  onChange,
  selectedCategory,
  onCategoryChange,
}: SearchBarProps) {
  return (
    <div className="flex w-full min-w-0 max-w-3xl flex-col gap-3 sm:flex-row">
      
      {/* SEARCH BAR */}
      <div className="relative w-full min-w-0 sm:flex-1">
        {/* Search icon */}
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search sweets, namkeen, snacks..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full
            rounded-full
            border
            border-gray-200
            bg-white
            py-3
            pl-11
            pr-4
            text-sm
            text-gray-800
            shadow-sm
            outline-none
            transition
            duration-200
            placeholder:text-gray-400
            hover:border-gray-300
            focus:border-orange-500
            focus:ring-4
            focus:ring-orange-100
          "
        />
      </div>

      {/* MOBILE: scrollable category pills */}
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:hidden">
        {categories.map((category) => (
          <button
            key={category.value}
            type="button"
            onClick={() => onCategoryChange(category.value)}
            className={`
              shrink-0
              rounded-full
              border
              px-4
              py-2.5
              text-sm
              font-medium
              shadow-sm
              transition
              duration-200
              ${
                selectedCategory === category.value
                  ? "border-orange-500 bg-orange-500 text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-orange-300"
              }
            `}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* DESKTOP: category select */}
      <div className="relative hidden w-44 shrink-0 sm:block">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="
            w-full
            max-w-full
            appearance-none
            rounded-full
            border
            border-gray-200
            bg-white
            px-5
            py-3
            pr-10
            text-sm
            font-medium
            text-gray-700
            shadow-sm
            outline-none
            transition
            duration-200
            hover:border-orange-300
            focus:border-orange-500
            focus:ring-4
            focus:ring-orange-100
          "
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>

        {/* Dropdown arrow */}
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          ▼
        </span>
      </div>
    </div>
  );
}
