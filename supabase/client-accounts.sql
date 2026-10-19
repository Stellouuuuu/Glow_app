-- GLOW - comptes clientes.
-- À exécuter une fois dans Supabase : SQL Editor > New query > Run.
--
-- 1. Crée automatiquement la ligne `profiles` (role = 'client') à chaque inscription.
-- 2. Empêche une cliente de se donner le rôle admin en modifiant son propre profil.
-- 3. Relie les commandes à la cliente connectée (orders.user_id) pour son historique.

-- 1. Profil créé à l'inscription (nom et téléphone viennent du formulaire).
--    Le rôle est toujours 'client' : il n'est jamais lu depuis les données envoyées par le navigateur.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone, role)
  values (
    new.id,
    nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''),
    nullif(trim(new.raw_user_meta_data ->> 'phone'), ''),
    'client'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. Seul un admin (ou l'éditeur SQL / le service role) peut changer un rôle.
create or replace function public.protect_profile_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role
     and auth.uid() is not null
     and not exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') then
    raise exception 'Modification du rôle non autorisée.';
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_protect_role on public.profiles;
create trigger profiles_protect_role
  before update on public.profiles
  for each row execute function public.protect_profile_role();

-- Chaque utilisatrice peut lire son propre profil (utilisé pour détecter le rôle admin).
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select to authenticated
  using (id = auth.uid());

-- 3. Historique de commandes de la cliente.
alter table public.orders
  add column if not exists user_id uuid references auth.users (id) on delete set null;

drop policy if exists "orders_select_own" on public.orders;
create policy "orders_select_own" on public.orders
  for select to authenticated
  using (user_id = auth.uid());
