export class CreateProductDto {
  name: string;
  brand: string;
  price: number;
}
export class EditProductDto {
  name?: string;
  brand?: string;
  price?: number;
}

export class ProductQuery {
  name?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
}
