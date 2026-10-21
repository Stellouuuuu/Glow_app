import Bestsellers from "@/components/Bestsellers";
import Categories from "@/components/Categories";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import LiveRefresh from "@/components/LiveRefresh";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import MobileTabBar from "@/components/MobileTabBar";
import SignupBanner from "@/components/SignupBanner";
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
      <LiveRefresh />
      <Header />
      <Hero />
      <Categories />
      <Bestsellers products={products} query={query} />
      <Features />
      <Gallery />
      <Newsletter />
      <Footer />
      <MobileTabBar />
      <SignupBanner />
    </div>
  );
}
