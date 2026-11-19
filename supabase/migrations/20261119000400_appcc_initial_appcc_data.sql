create extension if not exists pgcrypto;

create table if not exists public.admin_equipment_assets (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  brand text,
  model text,
  serial_number text,
  purchase_date date,
  installation_date date,
  location text,
  last_maintenance date,
  next_maintenance date,
  fault_history text,
  status text default 'operativo'
);

create table if not exists public.admin_supplier_records (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  supplier text not null,
  cif text,
  phone text,
  email text,
  category text,
  certificates text,
  observations text,
  status text default 'activo'
);

create table if not exists public.admin_cleaning_zones (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null unique,
  active boolean default true,
  source text default 'admin-kiosko-initial-seed'
);

create table if not exists public.admin_inventory_categories (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null unique,
  active boolean default true,
  source text default 'admin-kiosko-initial-seed'
);

alter table if exists public.admin_equipment_assets enable row level security;
alter table if exists public.admin_supplier_records enable row level security;
alter table if exists public.admin_cleaning_zones enable row level security;
alter table if exists public.admin_inventory_categories enable row level security;

revoke all on public.admin_equipment_assets from anon, authenticated;
revoke all on public.admin_supplier_records from anon, authenticated;
revoke all on public.admin_cleaning_zones from anon, authenticated;
revoke all on public.admin_inventory_categories from anon, authenticated;

grant all on public.admin_equipment_assets to service_role;
grant all on public.admin_supplier_records to service_role;
grant all on public.admin_cleaning_zones to service_role;
grant all on public.admin_inventory_categories to service_role;

drop policy if exists "admin_equipment_assets_service_role_all" on public.admin_equipment_assets;
create policy "admin_equipment_assets_service_role_all"
  on public.admin_equipment_assets
  for all
  to service_role
  using (true)
  with check (true);

drop policy if exists "admin_supplier_records_service_role_all" on public.admin_supplier_records;
create policy "admin_supplier_records_service_role_all"
  on public.admin_supplier_records
  for all
  to service_role
  using (true)
  with check (true);

drop policy if exists "admin_cleaning_zones_service_role_all" on public.admin_cleaning_zones;
create policy "admin_cleaning_zones_service_role_all"
  on public.admin_cleaning_zones
  for all
  to service_role
  using (true)
  with check (true);

drop policy if exists "admin_inventory_categories_service_role_all" on public.admin_inventory_categories;
create policy "admin_inventory_categories_service_role_all"
  on public.admin_inventory_categories
  for all
  to service_role
  using (true)
  with check (true);

create index if not exists admin_equipment_assets_name_idx on public.admin_equipment_assets (lower(name));
create index if not exists admin_supplier_records_supplier_idx on public.admin_supplier_records (lower(supplier));
create index if not exists admin_cleaning_zones_name_idx on public.admin_cleaning_zones (lower(name));
create index if not exists admin_inventory_categories_name_idx on public.admin_inventory_categories (lower(name));







insert into public.admin_inventory_categories (name)
select seed.name
from (
  values
    ('Refrigerado'),
    ('Congelado'),
    ('Seco'),
    ('Bebida'),
    ('Limpieza'),
    ('Desechables'),
    ('Panadería'),
    ('Carne'),
    ('Verdura'),
    ('Lácteos')
) as seed(name)
where not exists (
  select 1 from public.admin_inventory_categories existing
  where lower(existing.name) = lower(seed.name)
);

comment on table public.admin_cleaning_zones is 'Catálogo inicial de zonas de limpieza APPCC.';
comment on table public.admin_inventory_categories is 'Catálogo inicial de categorías de inventario APPCC.';
