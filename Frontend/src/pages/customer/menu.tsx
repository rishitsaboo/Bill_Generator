import { useEffect, useState } from "react";
import { getAllMenus } from "../../api/menuApi";
import ProductGrid from "../../components/customer/ProductGrid";
import CategoryFilter from "../../components/customer/CategoryFilter";
import BestSellerCarousel from "../../components/customer/BestSellerCarousel";
import type { Item } from "../../types/Item";
import Hero from "../../components/customer/hero";

const Menu = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // =========================
    // FILTER PRODUCTS
    // =========================

    const filteredItems = items.filter((item) => {
        const matchesSearchTerm = item.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesCategory =
            selectedCategory === "All" ||
            item.category === selectedCategory;

        return matchesSearchTerm && matchesCategory;
    });

    // =========================
    // LOAD MENU
    // =========================

    useEffect(() => {
        const loadMenu = async () => {
            try {
                const data = await getAllMenus();

                const normalizedItems: Item[] = (data || []).map(
                    (item: any) => ({
                        ...item,
                        unit:
                            item.unit === "plate" ||
                            item.unit === "piece" ||
                            item.unit === "per/kg"
                                ? item.unit
                                : undefined,
                    })
                );

                setItems(normalizedItems);
            } catch (error) {
                console.error("Error fetching menu:", error);
            } finally {
                setLoading(false);
            }
        };

        loadMenu();
    }, []);

    // =========================
    // BEST SELLERS
    // =========================

    const bestSellers = items.filter(
        (item) => item.isBestSeller === true
    );

    // =========================
    // PAGE
    // =========================

    return (
        <>

            {/* =========================
                1. HERO
            ========================= */}

            <Hero />


            {/* =========================
                MAIN CONTENT
            ========================= */}

            <main className="mx-auto max-w-7xl overflow-x-hidden px-4 py-8">


                {/* =========================
                    2. SEARCH & CATEGORY FILTER
                ========================= */}

                <CategoryFilter
                    value={searchTerm}
                    onChange={(value) =>
                        setSearchTerm(value)
                    }
                    selectedCategory={selectedCategory}
                    onCategoryChange={(category) =>
                        setSelectedCategory(category)
                    }
                />


                {/* =========================
                    3. BEST SELLERS
                ========================= */}

                {!loading && bestSellers.length > 0 && (
                    <div className="mt-8">
                        <BestSellerCarousel
                            items={bestSellers}
                        />
                    </div>
                )}


                {/* =========================
                    4. PRODUCT GRID
                ========================= */}

                <div className="mt-8">

                    {loading ? (

                        <p className="text-gray-500">
                            Loading...
                        </p>

                    ) : filteredItems.length === 0 ? (

                        <p className="text-gray-500">
                            No items found.
                        </p>

                    ) : (

                        <ProductGrid
                            items={filteredItems}
                        />

                    )}

                </div>

            </main>

        </>
    );
};

export default Menu;