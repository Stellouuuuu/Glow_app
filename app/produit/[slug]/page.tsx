import BackButton from "@/components/BackButton";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import OrderButtons from "@/components/OrderButtons";
import MobileTabBar from "@/components/MobileTabBar";
import Sprite from "@/components/Sprite";
import { formatPrice, illustrationFor } from "@/lib/format";
import { createClient } from "@/lib/supabase/server";
import { PRODUCT_SELECT, type Product } from "@/lib/types";

async function getProduct(slug: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  return data as Product | null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProduct(params.slug);
  return { title: product ? `${product.name} - GLOW` : "Produit introuvable - GLOW" };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  if (!product) notFound();

  const outOfStock = product.stock <= 0;

  return (
    <div className="glow-root" id="top">
      <Sprite />
      <Header />
      <div className="wrap back-row">
        <BackButton fallback="/" />
      </div>
      <main className="sec wrap pd">
        <div className="pd-media">
          {product.badge && (
            <span className={`prod-tag${product.badge.startsWith("-") ? " sale" : ""}`}>{product.badge}</span>
          )}
          {product.photo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.photo_url} alt={product.name} className="prod-photo" />
          ) : (
            <Icon name={illustrationFor(product.categories?.slug)} />
          )}
        </div>
        <div className="pd-info">
          {product.categories && <span className="eyebrow">{product.categories.name}</span>}
          <h1>{product.name}</h1>
          <div className="price-row" style={{ marginTop: 14 }}>
            <span className="price" style={{ fontSize: 26 }}>{formatPrice(product.price)}</span>
            {product.old_price ? <span className="price-old">{formatPrice(product.old_price)}</span> : null}
          </div>
          <p className="pd-stock" style={{ color: outOfStock ? "var(--rose)" : "#4F7A33" }}>
            {outOfStock ? "Rupture de stock" : product.stock <= 3 ? `Plus que ${product.stock} en stock` : "En stock"}
          </p>
          {product.description && <p className="pd-desc">{product.description}</p>}
          <div className="cod-alert">
            <span className="icon-wrap">
              <Icon name="i-cash" />
            </span>
            <div>
              <strong>Paiement à la livraison disponible</strong>
              <span className="sub">Commande sans risque, tu payes à la réception.</span>
            </div>
          </div>
          <OrderButtons product={product} />
        </div>
      </main>
      <Footer />
      <MobileTabBar />
    </div>
  );
}
