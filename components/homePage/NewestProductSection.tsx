"use client";

import { useEffect, useState } from "react";
import { getAllProductsApi } from "@/lib/api/products/productsApis";
import { Loader } from "@/components/ui/Loader/Loader";
import Link from "next/link";
import ProductCard from "../shop/productComponents/ProductCard";

const NewestProductSection = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNewestProducts = async () => {
    try {
      setLoading(true);

      // 👇 pass limit / sort params (adjust as per backend)
      const res = await getAllProductsApi({
        limit: 6,
        sortBy: "createdAt",
        order: "desc",
      });

      if (res?.status === 200) {
        setProducts(res.data.results || []);
      }
    } catch (error) {
      console.error("Failed to fetch newest products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewestProducts();
  }, []);

  if (loading) {
    return (
      <div className="h-60 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!products.length) return null;

  return (
    <section className="py-10">
      <div className="wrapper">
        {/* 🔹 Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-3xl font-semibold">Latest Jewellery</h2>
          <Link
            href="/shop/jewellery"
            className="text-logo font-medium hover:underline"
          >
            View All
          </Link>
        </div>

        {/* 🔹 Horizontal Scroll */}
        <div className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-2">
          {products.map((product) => (
            <div key={product._id} className="min-w-[300px]">
              <ProductCard
                id={product._id}
                name={product.name}
                price={product.price}
                images={product.images}
                badge={product?.badge}
                isWishlisted={false}
                onAddToCart={() => {}}
                onToggleWishlist={() => {}}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewestProductSection;
