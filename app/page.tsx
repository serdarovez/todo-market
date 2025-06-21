import { ReviewList } from "@/components/ReviewList";
import { ProductList } from "@/components/ProductList";
import { CartSummary } from "@/components/CartSummary";
import { getProducts, getReviews } from "@/utils/api";

export default async function Page() {
  const reviews = await getReviews(); // SSR fetch
  const productPage = await getProducts(1, 20); // SSR fetch

  return (
    <div className="min-h-screen p-4 lg:w-[90%] w-[95%] mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-white rounded-lg p-3 bg-[#777777] text-center">
        тестовое задание
      </h1>

      <div className="lg:w-2/3 mx-auto w-full space-y-8">
        <ReviewList initialReviews={reviews} />
        <CartSummary />
        <ProductList initialPage={productPage} />
      </div>
    </div>
  );
}
