import Image from "next/image";
import Icon from "./Icon";

type GalleryTile = { cls: string; icon: string; label: string; photo?: string };

const tiles: GalleryTile[] = [
  { cls: "gal-1", icon: "i-leaf", label: "Routine du soir" },
  { cls: "gal-2", icon: "i-hair", label: "Nouvelle coiffure", photo: "/categories/french-curl.jpeg" },
  { cls: "gal-3", icon: "i-lips", label: "Look du jour", photo: "/categories/jean.jpeg" },
  { cls: "gal-4", icon: "i-dress", label: "Tenue favorite" },
  { cls: "gal-5", icon: "i-perfume", label: "Signature parfum" },
  { cls: "gal-6", icon: "i-sparkle", label: "Avis client" },
];

export default function Gallery() {
  return (
    <section className="sec wrap">
      <div className="sec-head">
        <div>
          <span className="eyebrow">Communauté</span>
          <h2>Suis-nous GLOW.boutique</h2>
        </div>
      </div>
      <div className="gal-grid">
        {tiles.map((t) => (
          <div key={t.label} className={`gal-tile ${t.cls}`}>
            {t.photo ? (
              <Image src={t.photo} alt="" fill sizes="(max-width: 560px) 50vw, 200px" className="gal-photo" />
            ) : (
              <Icon name={t.icon} />
            )}
            <span>{t.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
