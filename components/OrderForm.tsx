"use client";
import { useState } from "react";
import { useCart } from "../store/cart";
import { postOrder } from "../utils/api";

export const OrderForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { items, phone, setPhone, reset } = useCart();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const rawPhone = phone.replace(/\D/g, "");
    if (items.length === 0) {
      setError("Добавьте товары в корзину");
      return;
    }
    if (rawPhone.length !== 10) {
      setError("Введите корректный номер телефона");
      return;
    }
    const fullPhone = "7" + rawPhone;
    setError("");
    setLoading(true);
    try {
      const res = await postOrder(fullPhone, items);
      if (res.success) {
        reset();
        onSuccess();
      } else {
        setError(res.error || "Ошибка при отправке заказа");
      }
    } catch {
      setError("Сервер недоступен. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  const formatPhone = (digits: string) => {
    const padded = digits.padEnd(10, "_");
    return `+7 (${padded.slice(0, 3)}) ${padded.slice(3, 6)}-${padded.slice(
      6,
      8
    )}-${padded.slice(8, 10)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").replace(/^7/, "");
    setPhone(digits.slice(0, 10));
    if (error) setError("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const pos = input.selectionStart ?? 0;
    const isFullSelection =
      input.selectionStart === 0 && input.selectionEnd === input.value.length;
    if (
      !isFullSelection &&
      pos <= 4 &&
      (e.key === "Backspace" || e.key === "Delete")
    ) {
      e.preventDefault();
    }
    if (e.key.length === 1 && /\D/.test(e.key)) {
      e.preventDefault(); // prevent letters and symbols
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex gap-2" >
        <input
          type="tel"
          inputMode="numeric"
          value={formatPhone(phone)}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="+7 (___) ___-__-__"
          className={`w-full p-2 rounded-lg text-white bg-[#222222] placeholder-white outline-none ${
            error ? "border border-red-500" : "border border-transparent"
          }`}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-6 py-2 rounded-lg bg-[#222222] text-white font-medium ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Отправка..." : "заказать"}
        </button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
