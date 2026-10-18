import ProductsManager from "@/components/admin/ProductsManager";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_PRODUCT_SELECT, type AdminProduct, type Category } from "@/lib/types";

export const metadata = { title: "Produits - Admin GLOW" };

export default async function AdminProductsPage() {
  const supabase = createClient();
  const [{ data: products, error }, { data: categories }] = await Promise.all([
    supabase.from("products").select(ADMIN_PRODUCT_SELECT).order("created_at", { ascending: false }),
    supabase.from("categories").select("id, name, slug").order("name"),
  ]);

  if (error) console.error("[admin/produits]", error.message);

  return (
    <ProductsManager
      products={(products ?? []) as unknown as AdminProduct[]}
      categories={(categories ?? []) as Category[]}
      loadError={error?.message}
    />
  );
}
