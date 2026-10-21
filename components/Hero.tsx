import Image from "next/image";
import Icon from "./Icon";
import { categoryPhotos, type CategoryPhoto } from "@/lib/category-photos";

type Tile = { href: string; label: string; tone: string; icon?: string; photo?: CategoryPhoto };

const left: Tile[] = [
  { href: "#categories", label: "Soins du visage", tone: "tile-1", photo: categoryPhotos.soins },
  { href: "#categories", label: "Maquillage", tone: "tile-2", photo: categoryPhotos.maquillage },
  { href: "#bestsellers", label: "Mode femme", tone: "tile-3", photo: categoryPhotos.mode },
];
const right: Tile[] = [
  { href: "#bestsellers", label: "Mèches", tone: "tile-2", photo: categoryPhotos.meches },
  { href: "#categories", label: "Parfums", tone: "tile-3", photo: categoryPhotos.parfum },
  { href: "#bestsellers", label: "Nouveautés", tone: "tile-1", photo: categoryPhotos.nouveautes },
];

function Side({ tiles }: { tiles: Tile[] }) {
  return (
    <div className="hero-side">
      {tiles.map((t) => (
        <a key={t.label} href={t.href} className={`hero-tile ${t.tone}`}>
          {t.photo ? (
            <Image
              src={t.photo.src}
              alt={t.photo.alt}
              fill
              sizes="(max-width: 900px) 0px, 20vw"
              className="tile-photo"
              style={{ objectPosition: t.photo.pos }}
            />
          ) : (
            t.icon && <Icon name={t.icon} />
          )}
          <span className="hero-tile-label">{t.label}</span>
        </a>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero wrap">
      <div className="hero-grid">
        <Side tiles={left} />

        <div className="hero-banner">
          <Image
            src="/categories/beaute.jpeg"
            alt=""
            fill
            priority
            sizes="(max-width: 900px) 100vw, 60vw"
            className="hero-bg"
            style={{ objectPosition: "50% 35%" }}
          />
          <span className="hero-veil" aria-hidden="true" />
          <div className="hero-banner-copy">
            <span className="eyebrow">Nouvelle marque 100% toi</span>
            <h1>
              Révèle ta <span className="line2">beauté au quotidien</span>
            </h1>
            <p className="lede">
              Soins, maquillage, mode et mèches : tout ce qu&apos;il te faut, choisi avec soin, pour une
              routine qui te ressemble.
            </p>
            <div className="hero-ctas">
              <a href="#bestsellers" className="btn btn-primary">
                Découvrir la boutique <Icon name="i-arrow" />
              </a>
              <a href="#bestsellers" className="btn btn-outline">
                Voir les mèches
              </a>
            </div>
            <div className="cod-alert">
              <span className="icon-wrap">
                <Icon name="i-cash" />
              </span>
              <div>
                <strong>Paiement à la livraison disponible</strong>
                <span className="sub">Commande sans risque, tu payes à la réception.</span>
              </div>
            </div>
          </div>
        </div>

        <Side tiles={right} />
      </div>
    </section>
  );
}
