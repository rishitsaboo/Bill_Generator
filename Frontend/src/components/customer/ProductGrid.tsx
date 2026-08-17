import React from "react";
import type { Item } from "../../types/Item";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

interface ProductGridProps {
    items: Item[];
}

export default function ProductGrid({ items }: ProductGridProps) {
    const [selectedProduct, setSelectedProduct] =
        React.useState<Item | null>(null);

    return (
        <>
            <div
                className="
                    grid
                    grid-cols-2
                    gap-4
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    lg:gap-5
                "
            >
                {items.map((item) => (
                    <ProductCard
                        key={item._id}
                        items={item}
                        onClick={() => setSelectedProduct(item)}
                    />
                ))}
            </div>

            {selectedProduct && (
                <ProductModal
                    items={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </>
    );
}