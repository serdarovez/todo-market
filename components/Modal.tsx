"use client";

export const Modal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-[#222222] border border-gray-700 p-6 rounded-xl shadow-xl max-w-sm w-full text-center text-white">
        <h2 className="text-xl font-semibold mb-3">Заказ успешно отправлен!</h2>
        <p className="text-gray-300 mb-6">Мы скоро с вами свяжемся.</p>
        <button
          onClick={onClose}
          className="bg-[#222222] text-white px-6 py-2 rounded-lg hover:bg-[#333333] transition"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};
