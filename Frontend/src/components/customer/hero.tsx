import { useEffect, useRef, useState } from "react";
import { useCart } from "../../context/CartContext";
import CartDrawer from "./CartDrawer";

const Hero = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const hero = heroRef.current;
      if (!hero) return;

      const { bottom } = hero.getBoundingClientRect();
      setIsFloating(bottom <= 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section ref={heroRef} className="bg-[#fff8ef] py-6">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">

          {/* HERO CARD */}
<div className="relative overflow-hidden rounded-3xl bg-[#f7eadb] shadow-sm">

    {cartCount > 0 && (
      <button
        type="button"
        onClick={() => setIsCartOpen(true)}
        className={`
          z-40
          flex
          items-center
          gap-2
          rounded-xl
          bg-white
          px-4
          py-2.5
          font-semibold
          text-[#48251c]
          shadow-md
          transition
          hover:bg-[#fffaf5]
          ${
            isFloating
              ? "fixed right-4 top-4 sm:right-6 sm:top-6"
              : "absolute right-6 top-5 md:right-8"
          }
        `}
      >
        <span className="text-lg">🛒</span>

        <span>View Cart</span>

        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#c6530a] px-1 text-xs font-bold text-white">
          {cartCount}
        </span>
      </button>
    )}

    {/* HERO CONTENT */}
    <div className="grid items-center gap-8 px-6 pb-8 pt-8 md:px-10 lg:grid-cols-2 lg:px-14 lg:pb-10">

        {/* LEFT SIDE */}
        <div>

            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#c6530a]">
                Homemade • Fresh • Delicious
            </p>

            <h1 className="text-4xl font-bold leading-tight text-[#48251c] md:text-5xl">
                Taste the

                <span className="block text-[#c6530a]">
                    Homemade Goodness
                </span>
            </h1>

            <div className="my-4 flex items-center gap-3">
                <span className="h-px w-10 bg-[#c6530a]" />

                <span className="text-[#c6530a]">
                    ✦
                </span>

                <span className="h-px w-10 bg-[#c6530a]" />
            </div>

            <p className="max-w-lg leading-6 text-[#6b5147]">
                Freshly prepared Indian sweets, namkeen and
                homemade favourites — made with love and
                served with care.
            </p>

            <span className="mt-3 block text-xl font-semibold text-[#c6530a]">
                Our Menu
            </span>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-[#6b5147]">
                <span>✓ Fresh Ingredients</span>
                <span>✓ Homemade Taste</span>
            </div>

        </div>


        {/* RIGHT SIDE IMAGE */}
        <div>
            <img
                src="/images/hero/hero.png"
                alt="Homemade Indian sweets and snacks"
                className="h-[240px] w-full rounded-2xl object-cover shadow-lg md:h-[280px] lg:h-[300px]"
            />
        </div>

    </div>

</div>
        </div>
      </section>


      {/* CART DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
};

export default Hero;