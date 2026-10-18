import Icon from "./Icon";

const tiles = [
  { cls: "gal-1", icon: "i-leaf", label: "Routine du soir" },
  { cls: "gal-2", icon: "i-hair", label: "Nouvelle coiffure" },
  { cls: "gal-3", icon: "i-lips", label: "Look du jour" },
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
            <Icon name={t.icon} />
            <span>{t.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
