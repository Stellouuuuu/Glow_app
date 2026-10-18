type IconProps = {
  name: string;
  className?: string;
  style?: React.CSSProperties;
};

// `name` est l'id d'un symbole de la sprite (ex. "i-cart", "ill-serum").
export default function Icon({ name, className = "icon", style }: IconProps) {
  return (
    <svg className={className} style={style} aria-hidden="true">
      <use href={`#${name}`} />
    </svg>
  );
}
