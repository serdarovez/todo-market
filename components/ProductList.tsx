// components/ProductList.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { getProducts } from "@/utils/api";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
  initialPage: {
    page: number;
    amount: number;
    total: number;
    items: any[];
  };
}

export const ProductList = ({ initialPage }: ProductListProps) => {
  const [products, setProducts] = useState(initialPage.items);
  const [page, setPage] = useState(initialPage.page + 1);
  const [total] = useState(initialPage.total);
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && products.length < total && !loading) {
          setLoading(true);
          const data = await getProducts(page, 20);
          setProducts((prev) => [...prev, ...data.items]);
          setPage((prev) => prev + 1);
          setLoading(false);
        }
      },
      { threshold: 1 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.disconnect();
      }
    };
  }, [loader, page, total, products.length, loading]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}

      {loading &&
        [...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className="p-4 border rounded-lg bg-white text-black animate-pulse space-y-2"
          >
            <div className="w-full h-48 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-6 bg-gray-300 rounded w-1/3" />
            <div className="h-8 bg-gray-200 rounded w-1/2" />
          </div>
        ))}

      <div ref={loader} className="h-10 col-span-full text-center text-white">
        {products.length < total ? "Загрузка..." : "Все товары загружены"}
      </div>
    </div>
  );
};
