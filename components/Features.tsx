import Icon from "./Icon";

const features = [
  { icon: "i-truck", title: "Livraison rapide", sub: "Partout à Cotonou & environs" },
  { icon: "i-refresh", title: "Retours faciles", sub: "24 h pour changer d'avis" },
  { icon: "i-shield", title: "Paiement sécurisé", sub: "Mobile Money & à la livraison" },
  { icon: "i-headset", title: "Support dévoué", sub: "On répond vite, avec le sourire" },
];

export default function Features() {
  return (
    <section className="wrap" style={{ paddingBottom: "clamp(48px,7vw,86px)" }}>
      <div className="features">
        {features.map((f) => (
          <div key={f.title} className="feature-item">
            <span className="icon-wrap">
              <Icon name={f.icon} />
            </span>
            <div>
              <strong>{f.title}</strong>
              <span>{f.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
