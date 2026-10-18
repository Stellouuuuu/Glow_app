import Icon from "./Icon";

export default function Promo() {
  return (
    <section className="sec wrap" id="promo">
      <div className="promo-grid">
        <div className="promo-card promo-1">
          <Icon name="i-leaf" className="icon-deco" />
          <span className="eyebrow">Offre du moment</span>
          <h3>Jusqu&apos;à -30% sur les soins du visage</h3>
          <p>Sérums, crèmes et masques pour une peau qui respire la santé.</p>
          <a href="#bestsellers" className="btn btn-primary">
            Profiter de l&apos;offre
          </a>
        </div>
        <div className="promo-card promo-2">
          <Icon name="i-dress" className="icon-deco" />
          <span className="eyebrow" style={{ color: "#9A6B3F" }}>
            Fraîchement arrivé
          </span>
          <h3>Nouvelle collection Mode disponible</h3>
          <p>Robes, ensembles et accessoires pensés pour toutes tes occasions.</p>
          <a href="#bestsellers" className="btn btn-outline">
            Découvrir la collection
          </a>
        </div>
      </div>
    </section>
  );
}
