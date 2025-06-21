"use client";
import { useCart } from "../store/cart";

interface ProductProps {
  product: {
    id: number;
    title: string;
    description: string;
    price: number;
    image_url: string;
  };
}

export const ProductCard = ({ product }: ProductProps) => {
  const { items, addItem, setQuantity } = useCart();
  const item = items.find((i) => i.id === product.id);

  return (
    <div className="bg-[#e4e4e4] text-black rounded-xl overflow-hidden shadow-lg p-4 flex flex-col justify-between min-h-[470px]">
      <img
        src={product.image_url}
        alt={product.title}
        loading="lazy"
        className="w-full h-52 object-cover rounded-t-xl mb-3"
      />

      <div className="flex-1">
        <h3 className="text-center font-bold text-lg mb-2">{product.title}</h3>
        <p className="text-sm mb-3 whitespace-pre-wrap">
          {product.description}
        </p>
        <p className="text-lg font-semibold text-center mt-2">
          цена: {product.price}₽
        </p>
      </div>

      {!item ? (
        <button
          onClick={() => addItem(product.id)}
          className="mt-4 bg-[#1e1e1e] text-white w-full py-2 rounded-lg text-lg font-medium"
        >
          купить
        </button>
      ) : (
        <div className="flex items-center justify-between mt-4 bg-[#1e1e1e] text-white rounded-lg px-4 py-2">
          <button
            className="text-xl font-bold"
            onClick={() =>
              setQuantity(product.id, Math.max(1, item.quantity - 1))
            }
          >
            –
          </button>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              setQuantity(product.id, Math.max(1, +e.target.value))
            }
            className="bg-transparent appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
 text-center w-10 text-lg outline-none"
          />
          <button
            className="text-xl font-bold"
            onClick={() => setQuantity(product.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};
