import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { getProducts } from "services/apiClient";
import { Product } from "types/cart";
import EditProductCard from "components/EditProductCard";
import { Input } from "components/ui/input";
import { debounce } from "lib/string";

const Products = () => {
  const [filters, setFilters] = useState({
    name: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const queryKey = `filteredProducts-${searchQuery}`;
  const {
    data: products,
    error,
    isLoading: loadingProducts,
    refetch,
  } = useQuery({
    queryKey: queryKey,
    queryFn: () => getProducts(searchQuery),
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return;
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  const debouncedSearch = useMemo(() => {
    return debounce((query: string) => {
      setSearchQuery(query);
    }, 300);
  }, []);
  useEffect(() => {
    if (!filters) return;
    let query = "";
    if (filters.name) {
      query += `name=${filters.name}&`;
    }
    if (filters.brand) {
      query += `brand=${filters.brand}&`;
    }
    if (filters.minPrice) {
      query += `minPrice=${filters.minPrice}&`;
    }
    if (filters.maxPrice) {
      query += `maxPrice=${filters.maxPrice}&`;
    }
    debouncedSearch(query);
  }, [filters]);
  return (
    <div className="h-full w-full p-4 flex flex-col overflow-hidden gap-4">
      <h1 className="text-2xl font-semibold text-center">Products Dashboard</h1>

      <div className="flex justify-between flex-wrap sm:flex-nowrap gap-4 p-2 w-full overflow-auto">
        <Input
          type="text"
          name="name"
          placeholder="Search by name"
          value={filters.name}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="brand"
          placeholder="Search by brand"
          value={filters.brand}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="minPrice"
          placeholder="Min price"
          value={filters.minPrice}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="maxPrice"
          placeholder="Max price"
          value={filters.maxPrice}
          onChange={handleChange}
        />
      </div>
      {!!loadingProducts && <p>Loading...</p>}
      {!!error && <p>Error: Looks like there's some issues</p>}
      {!!products && !!products?.length && (
        <div className="grid grid-cols-2 w-full overflow-auto py-4">
          {products.map((product: Product) => {
            return (
              <EditProductCard
                key={product.id}
                product={product}
                queryKey={queryKey}
                refetch={refetch as any}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Products;
