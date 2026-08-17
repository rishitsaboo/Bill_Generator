import React from "react";
import type { Item } from "../../types/Item";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

interface BestSellerCarouselProps {
    items: Item[];
}

export default function BestSellerCarousel({
    items,
}: BestSellerCarouselProps) {
    const [selectedProduct, setSelectedProduct] =
        React.useState<Item | null>(null);

    if (!items || items.length === 0) {
        return null;
    }

    return (
        <>
            {/* BEST SELLERS SECTION */}
            <section className="mb-8 rounded-2xl border border-[#f1d8b5] bg-[#fff8ed] p-4 shadow-sm sm:p-5 md:p-6">

                {/* HEADER */}
                <div className="mb-5 flex items-start justify-between">

                    {/* LEFT */}
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">🔥</span>

                            <h2 className="text-2xl font-bold text-[#3f241c] sm:text-3xl">
                                Best Sellers
                            </h2>
                        </div>

                        <p className="mt-1 text-sm text-[#765d52] sm:text-base">
                            Our customers' most loved items
                        </p>
                    </div>

                    {/* SEE ALL */}
                    <button
                        type="button"
                        className="
                            hidden
                            items-center
                            gap-2
                            rounded-lg
                            px-2
                            py-2
                            text-sm
                            font-semibold
                            text-[#5a2c1d]
                            transition
                            hover:bg-[#f8ead8]
                            sm:flex
                        "
                    >
                        See all
                        <span className="text-lg">→</span>
                    </button>
                </div>


                {/* PRODUCTS */}
                <div
                    className="
                        flex
                        gap-4
                        overflow-x-auto
                        pb-3
                        scrollbar-thin
                        scrollbar-thumb-[#d7b28a]
                        scrollbar-track-transparent
                    "
                >

                    {items.map((item, index) => (
                        <div
                            key={item._id}
                            className="
                                relative
                                w-[210px]
                                shrink-0
                                sm:w-[225px]
                                md:w-[235px]
                            "
                        >

                            {/* RANK BADGE */}
                            <div
                                className={`
                                    absolute
                                    left-[-5px]
                                    top-[-5px]
                                    z-20
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-full
                                    text-lg
                                    font-bold
                                    shadow-md
                                    ${
                                        index === 0
                                            ? "bg-[#fbbf24] text-[#4a2b00]"
                                            : index === 1
                                            ? "bg-[#d1d5db] text-[#374151]"
                                            : index === 2
                                            ? "bg-[#d97706] text-white"
                                            : "bg-white text-[#5a2c1d]"
                                    }
                                `}
                            >
                                {index + 1}
                            </div>


                            {/* PRODUCT CARD */}
                            <ProductCard
                                items={item}
                                onClick={() =>
                                    setSelectedProduct(item)
                                }
                            />

                        </div>
                    ))}

                </div>


                {/* MOBILE SEE ALL */}
                <button
                    type="button"
                    className="
                        mt-3
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-[#ead2b2]
                        bg-white
                        py-2.5
                        text-sm
                        font-semibold
                        text-[#5a2c1d]
                        transition
                        hover:bg-[#fffaf3]
                        sm:hidden
                    "
                >
                    See all
                    <span className="text-lg">→</span>
                </button>

            </section>


            {/* PRODUCT MODAL */}
            {selectedProduct && (
                <ProductModal
                    items={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </>
    );
}