-- GLOW - gestion automatique du stock selon le statut des commandes.
-- À exécuter une fois dans Supabase : SQL Editor > New query > Run.
--
-- Règles :
--   * une commande qui passe à 'confirmee' (ou 'livree') retire `quantity` du stock,
--     une seule fois, même si le statut change ensuite (confirmee -> livree ne retire rien de plus) ;
--   * une commande qui sort de ces statuts alors que le stock avait été retiré
--     (ex. confirmee -> annulee, ou -> en_attente) remet le stock ;
--   * si le stock est insuffisant, le changement de statut est refusé avec un message d'erreur ;
--   * seul un UPDATE du statut déclenche la logique : une commande insérée par le site
--     (visiteuse non connectée) ne touche jamais au stock.

alter table public.orders
  add column if not exists stock_deducted boolean not null default false;

create or replace function public.sync_order_stock()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  holds_stock boolean := new.status in ('confirmee', 'livree');
begin
  if new.product_id is null then
    return new;
  end if;

  if holds_stock and not old.stock_deducted then
    update public.products
       set stock = stock - new.quantity
     where id = new.product_id
       and stock >= new.quantity;

    if not found then
      raise exception 'Stock insuffisant pour confirmer cette commande.';
    end if;

    new.stock_deducted := true;

  elsif not holds_stock and old.stock_deducted then
    update public.products
       set stock = stock + new.quantity
     where id = new.product_id;

    new.stock_deducted := false;

  else
    -- aucun mouvement de stock : on conserve l'état précédent du drapeau
    new.stock_deducted := old.stock_deducted;
  end if;

  return new;
end;
$$;

drop trigger if exists orders_sync_stock on public.orders;

create trigger orders_sync_stock
  before update of status on public.orders
  for each row
  when (old.status is distinct from new.status)
  execute function public.sync_order_stock();
