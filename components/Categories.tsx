import Image from "next/image";
import Icon from "./Icon";
import { categoryPhotos, type CategoryPhoto } from "@/lib/category-photos";

type Category = { href: string; label: string; icon?: string; photo?: CategoryPhoto };

const categories: Category[] = [
  { href: "#bestsellers", label: "Soins du visage", photo: categoryPhotos.soins },
  { href: "#bestsellers", label: "Maquillage", photo: categoryPhotos.maquillage },
  { href: "#bestsellers", label: "Mode femme", photo: categoryPhotos.mode },
  { href: "#bestsellers", label: "Mèches & extensions", photo: categoryPhotos.meches },
  { href: "#bestsellers", label: "Accessoires", photo: categoryPhotos.accessoires },
  { href: "#bestsellers", label: "Parfums", photo: categoryPhotos.parfum },
];

export default function Categories() {
  return (
    <section className="sec wrap" id="categories">
      <div className="sec-head">
        <div>
          <span className="eyebrow">Fais ton choix</span>
          <h2>Magasine par univers</h2>
        </div>
      </div>
      <div className="cat-grid">
        {categories.map((c) => (
          <a key={c.label} className="cat-card" href={c.href}>
            <span className="cat-circle">
              {c.photo ? (
                <Image
                  src={c.photo.src}
                  alt=""
                  fill
                  sizes="130px"
                  className="cat-photo"
                  style={{ objectPosition: c.photo.pos }}
                />
              ) : (
                c.icon && <Icon name={c.icon} />
              )}
            </span>
            <span>{c.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
