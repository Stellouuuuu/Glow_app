export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  old_price: number | null;
  stock: number;
  photo_url: string | null;
  badge: string | null;
  is_active: boolean;
  categories: { name: string; slug: string } | null;
};

export const PRODUCT_SELECT =
  "id, slug, name, description, price, old_price, stock, photo_url, badge, is_active, categories(name, slug)";

export type Category = { id: string; name: string; slug: string };

export type AdminProduct = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  old_price: number | null;
  stock: number;
  photo_url: string | null;
  badge: string | null;
  is_active: boolean;
  category_id: string | null;
  categories: { name: string } | null;
};

export const ADMIN_PRODUCT_SELECT =
  "id, slug, name, description, price, old_price, stock, photo_url, badge, is_active, category_id, categories(name)";

export const LOW_STOCK = 3;

export const ORDER_STATUSES = [
  { value: "en_attente", label: "En attente" },
  { value: "confirmee", label: "Confirmée" },
  { value: "livree", label: "Livrée" },
  { value: "annulee", label: "Annulée" },
] as const;

export type Order = {
  id: string;
  customer_name: string;
  customer_phone: string;
  quantity: number;
  total_price: number;
  status: string;
  source: string | null;
  created_at: string;
  products: { name: string } | null;
};

export const ORDER_SELECT =
  "id, customer_name, customer_phone, quantity, total_price, status, source, created_at, products(name)";

export type Client = {
  id: string;
  full_name: string | null;
  phone: string | null;
  created_at: string;
};
