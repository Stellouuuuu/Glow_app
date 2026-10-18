import Icon from "./Icon";

const categories = [
  { href: "#bestsellers", icon: "i-leaf", label: "Soins du visage" },
  { href: "#bestsellers", icon: "i-lips", label: "Maquillage" },
  { href: "#promo", icon: "i-dress", label: "Mode femme" },
  { href: "#meches", icon: "i-hair", label: "Mèches & extensions" },
  { href: "#bestsellers", icon: "i-bag", label: "Accessoires" },
  { href: "#bestsellers", icon: "i-perfume", label: "Parfums" },
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
              <Icon name={c.icon} />
            </span>
            <span>{c.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
