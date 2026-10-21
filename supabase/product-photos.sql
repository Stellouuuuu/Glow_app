-- Plusieurs photos par produit.
-- `photos` garde l'ordre d'affichage ; `photo_url` reste la photo de couverture (= photos[1]).
alter table public.products
  add column if not exists photos text[] not null default '{}';

update public.products
set photos = array[photo_url]
where photo_url is not null and cardinality(photos) = 0;
