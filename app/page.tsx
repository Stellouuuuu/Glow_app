import AppTeaser from "@/components/AppTeaser";
import Bestsellers from "@/components/Bestsellers";
import Categories from "@/components/Categories";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Meches from "@/components/Meches";
import Newsletter from "@/components/Newsletter";
import Promo from "@/components/Promo";
import MobileTabBar from "@/components/MobileTabBar";
import Sprite from "@/components/Sprite";
import { createClient } from "@/lib/supabase/server";
import { PRODUCT_SELECT, type Product } from "@/lib/types";

export default async function Home({ searchParams }: { searchParams: { q?: string } }) {
  const query = (searchParams.q ?? "").replace(/[%_,()]/g, " ").trim().slice(0, 60);
  const supabase = createClient();
  let request = supabase.from("products").select(PRODUCT_SELECT).eq("is_active", true);
  if (query) request = request.ilike("name", `%${query}%`);
  const { data } = await request.order("created_at", { ascending: false });
  const products = (data ?? []) as unknown as Product[];

  return (
    <div className="glow-root" id="top" style={{ width: "100%" }}>
      <Sprite />
      <Header />
      <Hero />
      <Categories />
      <Features />
      <Bestsellers products={products} query={query} />
      <Promo />
      <Meches />
      <Gallery />
      <AppTeaser />
      <Newsletter />
      <Footer />
      <MobileTabBar />
    </div>
  );
}
