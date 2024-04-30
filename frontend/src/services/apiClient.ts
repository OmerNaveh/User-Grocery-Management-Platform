import axios from "axios";
import { Cart, Product } from "types/cart";
import { CreateUserProps, User, UserWithCart } from "types/user";

const SERVER_PORT = process.env.REACT_APP_SERVER_PORT || 3001;
const apiClient = axios.create({
  baseURL: `http://localhost:${SERVER_PORT}/`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const authUser = async (fullName: string) => {
  const response = await apiClient.post("user/auth", { fullName });
  return response.data as User;
};

export const createUser = async (user: CreateUserProps) => {
  const response = await apiClient.post("user", user);
  return response.data as User;
};

export const fetchAllUsers = async () => {
  const response = await apiClient.get("user/all");
  return response.data as UserWithCart[];
};

export const editUser = async (
  userId: number,
  userDetails: Partial<CreateUserProps>
) => {
  const response = await apiClient.put(`user/${userId}`, userDetails);
  return response.data as User;
};

export const getUserCart = async (userId: number) => {
  const response = await apiClient.get(`cart/${userId}`);
  return response.data as Cart;
};

export const getProducts = async (filters?: string) => {
  const filteredQuery = !!filters ? `product/all?${filters}` : "product/all";
  const response = await apiClient.get(filteredQuery);
  return response.data as Product[];
};

export const addToCart = async (
  userId: number,
  productId: number,
  quantity: number
) => {
  const response = await apiClient.post(
    `cart/${userId}/products/${productId}`,
    { quantity }
  );
  return response.data;
};

export const removeFromCart = async (userId: number, productId: number) => {
  const response = await apiClient.delete(
    `cart/${userId}/products/${productId}`
  );
  return response.data;
};

export const updateCartItemQuantity = async (
  userId: number,
  productId: number,
  quantity: number
) => {
  const response = await apiClient.put(`cart/${userId}/products/${productId}`, {
    quantity,
  });
  return response.data;
};

export const checkout = async (userId: number) => {
  const response = await apiClient.post(`cart/${userId}/checkout`);
  return response.data;
};

export const editProduct = async (
  productId: number,
  requestBody: Partial<Product>
) => {
  const response = await apiClient.put(`product/${productId}`, requestBody);
  return response.data;
};
