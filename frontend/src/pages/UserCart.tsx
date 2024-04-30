import CartListItem from "components/CartListItem";
import ProductCard from "components/ProductCard";
import { Button } from "components/ui/button";
import { useToast } from "components/ui/useToast";
import { ROUTES } from "constants/routes";
import { getErrorMessage } from "lib/errors";
import { MoveLeft } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, Navigate, useLocation } from "react-router-dom";
import {
  addToCart,
  checkout,
  getProducts,
  getUserCart,
  removeFromCart,
  updateCartItemQuantity,
} from "services/apiClient";
import { Product } from "types/cart";

const UserCart = () => {
  const { state } = useLocation();
  const user = state?.user;
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const queryKey = `userCart-${user?.id}`;
  const {
    data,
    isLoading,
    refetch: refetchCart,
  } = useQuery(queryKey, () => {
    if (!user) return;
    return getUserCart(user.id);
  });

  const { data: Products, isLoading: loadingProducts } = useQuery({
    queryKey: "allProducts",
    queryFn: () => getProducts(),
  });

  const { mutate: addItemToCart, isLoading: isAddingToCart } = useMutation({
    mutationKey: `addToCart-${user?.id}`,
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: number;
      quantity: number;
    }) => {
      if (!user) return;
      addToCart(user.id, productId, quantity);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(queryKey);
      await queryClient.invalidateQueries("allUsers");
      await refetchCart();
      toast({ description: "Product added to cart" });
    },
    onError: (error: unknown) => {
      const message = getErrorMessage(error);
      toast({ description: message, variant: "destructive" });
    },
  });
  const { mutate: removeItemFromCart } = useMutation({
    mutationKey: `removeFromCart-${user?.id}`,
    mutationFn: async (productId: number) => {
      if (!user) return;
      removeFromCart(user.id, productId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(queryKey);
      await queryClient.invalidateQueries("allUsers");
      await refetchCart();
      toast({ description: "Product removed from cart" });
    },
    onError: (error: unknown) => {
      const message = getErrorMessage(error);
      toast({ description: message, variant: "destructive" });
    },
  });
  const { mutate: updateItemQaunatity } = useMutation({
    mutationKey: `updateCartItemQuantity-${user?.id}`,
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: number;
      quantity: number;
    }) => {
      if (!user) return;
      updateCartItemQuantity(user.id, productId, quantity);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(queryKey);
      await queryClient.invalidateQueries("allUsers");
      await refetchCart();
      toast({ description: "Cart item quantity updated" });
    },
  });
  const { mutate: checkoutCart, isLoading: loadingCheckout } = useMutation({
    mutationKey: `checkout-${user?.id}`,
    mutationFn: async () => checkout(user?.id),
    onSuccess: async () => {
      await queryClient.invalidateQueries(queryKey);
      await queryClient.invalidateQueries("allUsers");
      await refetchCart();
      toast({ description: "Cart checked out" });
    },
    onError: (error: unknown) => {
      const message = getErrorMessage(error);
      toast({ description: message, variant: "destructive" });
    },
  });

  const handleAddToCart = (productId: number, quantity: number) => {
    addItemToCart({ productId, quantity });
  };
  const handleRemoveFromCart = (productId: number) => {
    removeItemFromCart(productId);
  };
  const handleUpdateCartItemQuantity = (
    productId: number,
    quantity: number
  ) => {
    updateItemQaunatity({ productId, quantity });
  };
  const handleCheckout = () => {
    checkoutCart();
  };

  if (!user) return <Navigate to={ROUTES.DASHBOARD} replace />;
  return (
    <div className="h-full w-full p-4 flex flex-col overflow-hidden gap-4">
      <div className="w-full flex items-center gap-4">
        <Link to={ROUTES.DASHBOARD} className="hover:opacity-70">
          <MoveLeft />
        </Link>
        <h1 className="text-2xl font-semibold">
          {user?.fullName || "User"} Cart
        </h1>
      </div>

      {/* Cart */}
      {isLoading ? (
        <p>Loading cart...</p>
      ) : !data ? (
        <p>No cart found</p>
      ) : (
        <div className="grid gap-1 flex-[2] overflow-hidden">
          <div className="max-h-full mb-2 w-full overflow-auto grid gap-2">
            {data?.items?.map((item) => {
              return (
                <CartListItem
                  key={item.id}
                  item={item}
                  handleRemoveFromCart={handleRemoveFromCart}
                  handleQuantityChange={handleUpdateCartItemQuantity}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p>
                Total items:{" "}
                {data?.items?.reduce((acc, item) => acc + item.quantity, 0) ||
                  0}
              </p>
              <p>Total price: {data?.total}$</p>
            </div>
            <Button onClick={handleCheckout} disabled={!!loadingCheckout}>
              {loadingCheckout ? "Loading..." : "Checkout"}
            </Button>
          </div>
        </div>
      )}

      {/* Product Catalog */}

      {loadingProducts ? (
        <p>Loading products...</p>
      ) : !Products ? (
        <p>No products found</p>
      ) : (
        <div className="grid gap-1 h-full w-full flex-[4] overflow-hidden">
          <div className="max-h-full w-full overflow-auto grid grid-cols-2">
            {Products.map((product: Product) => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  handleAddToCart={handleAddToCart}
                  isLoading={isAddingToCart}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCart;
