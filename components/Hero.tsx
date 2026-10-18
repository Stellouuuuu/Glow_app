import Icon from "./Icon";

export default function Hero() {
  return (
    <section className="hero wrap">
      <div
        className="hero-blob"
        style={{
          width: 480,
          height: 480,
          top: -180,
          left: -220,
          background: "radial-gradient(circle, var(--blush-deep), transparent 70%)",
        }}
      />
      <div
        className="hero-blob"
        style={{
          width: 380,
          height: 380,
          bottom: -160,
          right: -160,
          background: "radial-gradient(circle, #FBF0E2, transparent 70%)",
        }}
      />
      <div className="hero-row">
        <div className="hero-copy">
          <span className="eyebrow">Nouvelle marque 100% toi</span>
          <h1>
            Révèle ta <span className="line2">beauté au quotidien</span>
          </h1>
          <p className="lede">
            Soins, maquillage, mode et mèches : tout ce qu&apos;il te faut, choisi avec soin, pour
            une routine qui te ressemble et un style qui te rend fière.
          </p>
          <div className="hero-ctas">
            <a href="#bestsellers" className="btn btn-primary">
              Découvrir la boutique <Icon name="i-arrow" />
            </a>
            <a href="#meches" className="btn btn-outline">
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
          <div className="trust-row">
            <div className="trust-item">
              <Icon name="i-truck" />
              Livraison rapide
            </div>
            <div className="trust-item">
              <Icon name="i-shield" />
              Paiement sécurisé
            </div>
            <div className="trust-item">
              <Icon name="i-heart" />
              Qualité garantie
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-frame card-shadow">
            <Icon name="ill-bouquet" />
          </div>
          <div className="float-card card-shadow float-1">
            <div className="icon-wrap" style={{ background: "var(--blush)" }}>
              <Icon name="i-lips" style={{ color: "var(--rose)" }} className="icon" />
            </div>
            <div>
              <strong>Rouge Velours</strong>
              <span>4 500 FCFA</span>
            </div>
          </div>
          <div className="float-card card-shadow float-2">
            <div className="icon-wrap" style={{ background: "#F3E3D3" }}>
              <Icon name="i-hair" style={{ color: "#9A6B3F" }} className="icon" />
            </div>
            <div>
              <strong>Mèches Premium</strong>
              <span>Dès 14 500 FCFA</span>
            </div>
          </div>
          <div className="sticker">
            Nouveau
            <br />
            drop
          </div>
        </div>
      </div>
    </section>
  );
}
