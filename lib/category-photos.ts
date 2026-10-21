// Photos des univers (public/categories). `pos` règle le cadrage quand l'image est recadrée.
export type CategoryPhoto = { src: string; alt: string; pos: string };

export const categoryPhotos = {
  soins: { src: "/categories/soins.jpeg", alt: "Soins du visage", pos: "50% 75%" },
  maquillage: { src: "/categories/maquillage.jpeg", alt: "Maquillage", pos: "50% 35%" },
  mode: { src: "/categories/mode.jpeg", alt: "Mode femme", pos: "50% 40%" },
  meches: { src: "/categories/meches.jpeg", alt: "Mèches et extensions", pos: "50% 25%" },
  accessoires: { src: "/categories/accessoires.jpeg", alt: "Accessoires", pos: "50% 50%" },
  nouveautes: { src: "/categories/nouveautes.jpeg", alt: "Nouveautés", pos: "50% 65%" },
  parfum: { src: "/categories/parfum.jpeg", alt: "Parfums", pos: "50% 40%" },
} satisfies Record<string, CategoryPhoto>;
