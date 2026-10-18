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
import Sprite from "@/components/Sprite";
import { createClient } from "@/lib/supabase/server";
import { PRODUCT_SELECT, type Product } from "@/lib/types";

export default async function Home() {
  const supabase = createClient();
  const { data } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_active", true)
    .order("created_at", { ascending: false });
  const products = (data ?? []) as unknown as Product[];

  return (
    <div className="glow-root" id="top" style={{ width: "100%" }}>
      <Sprite />
      <Header />
      <Hero />
      <Categories />
      <Features />
      <Bestsellers products={products} />
      <Promo />
      <Meches />
      <Gallery />
      <AppTeaser />
      <Newsletter />
      <Footer />
    </div>
  );
}
