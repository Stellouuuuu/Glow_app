import Icon from "./Icon";

export default function AppTeaser() {
  return (
    <section className="sec wrap app-sec">
      <div className="app-copy">
        <span className="eyebrow">Bientôt disponible</span>
        <h2>GLOW arrive bientôt dans ta poche</h2>
        <p>
          On prépare une application mobile pour suivre tes commandes, recevoir des offres en
          avant-première et commander en quelques secondes. Inscris-toi pour être prévenu·e dès le
          lancement.
        </p>
        <a href="#newsletter" className="btn btn-outline" style={{ marginTop: 22 }}>
          <Icon name="i-bell" />
          Être informé·e en premier
        </a>
      </div>
      <div className="app-visual">
        <div className="phone card-shadow">
          <div className="phone-screen">
            <div className="phone-dot" />
            <Icon name="i-flower" />
            <strong>GLOW</strong>
            <span style={{ fontSize: 11, color: "var(--ink-soft)" }}>App bientôt disponible</span>
          </div>
        </div>
      </div>
    </section>
  );
}
