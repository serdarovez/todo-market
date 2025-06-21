"use client";
import { useState, useEffect } from "react";
import { useCart } from "../store/cart";
import { getProducts } from "../utils/api";
import { OrderForm } from "./OrderForm";
import { Modal } from "./Modal";

export const CartSummary = () => {
  const { items } = useCart();
  const [titles, setTitles] = useState<
    Record<number, { title: string; price: number }>
  >({});

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTitles = async () => {
      const titleMap: Record<number, { title: string; price: number }> = {};
      let page = 1;
      let total = 1;
      while (page <= total) {
        const data = await getProducts(page, 100);
        data.items.forEach((item: any) => {
          titleMap[item.id] = { title: item.title, price: item.price };
        });
        total = Math.ceil(data.total / 100);
        page++;
      }
      setTitles(titleMap);
    };
    fetchTitles();
  }, []);

  return (
    <div className="bg-[#e4e4e4] mt-5 rounded-xl p-4 text-black w-full lg:w-2/3 mx-auto mb-6">
      <p className="text-lg font-semibold mb-2">Добавленные товары</p>

      {items.length === 0 ? (
        <p className="text-sm text-gray-600">Нет товаров</p>
      ) : (
        <ul className="mb-4 space-y-1 text-sm">
          {items.map((item) => {
            const product = titles[item.id];
            return (
              <li key={item.id} className="flex justify-between items-center">
                <span>{product?.title || "товар"}</span>
                <span className="ml-auto">
                  x{item.quantity}{" "}
                  <span className="ml-4">
                    {product ? product.price * item.quantity : 0}₽
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      )}

      <OrderForm onSuccess={() => setShowModal(true)} />

      <Modal visible={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};
