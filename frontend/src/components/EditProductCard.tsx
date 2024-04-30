import { Product } from "types/cart";
import EditProductModal from "./EditProductModal";

type props = {
  product: Product;
  refetch: () => Promise<void>;
  queryKey: string;
};
const EditProductCard = ({ product, refetch, queryKey }: props) => {
  return (
    <div className="p-2 w-full relative">
      <div className="bg-slate-300 dark:bg-slate-700 p-2 flex flex-col gap-2">
        <h2 className="text-center text-lg font-semibold text-ellipsis">
          {product.name}
        </h2>

        <div className="flex items-center justify-between w-full">
          <p>{product.brand}</p>
          <p>{product.price}$</p>
        </div>

        <EditProductModal
          product={product}
          refetch={refetch}
          queryKey={queryKey}
        />
      </div>
    </div>
  );
};

export default EditProductCard;
