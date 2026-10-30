-- Les catégories ne doivent être modifiables que par les admins (lecture publique conservée).
alter table public.categories enable row level security;

-- Supprime toutes les policies d'écriture existantes (trop permissives)
do $$
declare p record;
begin
  for p in
    select policyname from pg_policies
    where schemaname = 'public' and tablename = 'categories' and cmd <> 'SELECT'
  loop
    execute format('drop policy %I on public.categories', p.policyname);
  end loop;
end $$;

drop policy if exists categories_select_public on public.categories;
create policy categories_select_public on public.categories
  for select using (true);

create policy categories_admin_write on public.categories
  for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'))
  with check (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
