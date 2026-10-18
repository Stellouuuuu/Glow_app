import Icon from "./Icon";

const chips = [
  { icon: "i-sparkle", label: "Qualité premium" },
  { icon: "i-refresh", label: "Tenue longue durée" },
  { icon: "i-heart", label: "Toutes textures" },
];

const swatches: React.CSSProperties[] = [
  { background: "#2E2420", top: 4, left: 10 },
  { background: "#6B3A1F", top: 40, right: -6 },
  { background: "#C98B6B", bottom: 10, left: -4 },
  { background: "#B3445C", bottom: 30, right: 14 },
];

export default function Meches() {
  return (
    <section className="sec wrap" id="meches">
      <div className="meches">
        <div className="meches-copy">
          <span className="eyebrow">Notre spécialité</span>
          <h2>Des mèches et extensions pensées pour sublimer chaque coiffure</h2>
          <p>
            Lisses, bouclées, naturelles ou colorées : notre sélection est faite pour durer, se
            coiffer facilement et garder tout son éclat, shampoing après shampoing.
          </p>
          <div className="chip-row">
            {chips.map((c) => (
              <span key={c.label} className="chip">
                <Icon name={c.icon} />
                {c.label}
              </span>
            ))}
          </div>
          <a href="#bestsellers" className="btn btn-primary">
            Voir la collection mèches <Icon name="i-arrow" />
          </a>
        </div>
        <div className="meches-visual">
          <div className="meches-ring">
            <Icon name="ill-hair" />
            {swatches.map((s, i) => (
              <span key={i} className="swatch-dot" style={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
