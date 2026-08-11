-- CargaLink — schema completo (PostgreSQL / Supabase)
-- Execute no SQL Editor do Supabase ou via CLI.

create extension if not exists "pgcrypto";

-- Helpers
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

-- profiles (1:1 with auth.users)
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text,
  avatar_url text,
  role text not null check (role in ('company', 'driver', 'admin')),
  bio text,
  city text,
  state char(2),
  is_verified boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz
);

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  legal_name text not null,
  trade_name text not null,
  document text not null,
  phone text not null,
  email text,
  city text not null,
  state char(2) not null,
  logo_url text,
  rating_avg numeric(3,2) not null default 0,
  rating_count integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz
);

create table if not exists public.drivers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  full_name text not null,
  document text not null,
  cnh text not null,
  cnh_category text not null,
  phone text not null,
  city text not null,
  state char(2) not null,
  rating_avg numeric(3,2) not null default 0,
  rating_count integer not null default 0,
  is_available boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz
);

create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  plate text not null,
  brand text not null,
  model text not null,
  year integer not null,
  type text not null,
  capacity_kg integer not null check (capacity_kg > 0),
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz
);

create table if not exists public.loads (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  title text not null,
  description text not null,
  origin_city text not null,
  origin_state char(2) not null,
  destination_city text not null,
  destination_state char(2) not null,
  cargo_type text not null,
  weight_kg integer not null check (weight_kg > 0),
  price numeric(12,2) not null check (price > 0),
  vehicle_type text not null,
  pickup_date date not null,
  delivery_date date,
  status text not null default 'open'
    check (status in ('draft', 'open', 'in_progress', 'completed', 'cancelled')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  load_id uuid not null references public.loads (id) on delete cascade,
  driver_id uuid not null references public.drivers (id) on delete cascade,
  vehicle_id uuid references public.vehicles (id),
  message text,
  proposed_price numeric(12,2),
  status text not null default 'pending'
    check (status in ('pending', 'accepted', 'rejected', 'withdrawn')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz,
  unique (load_id, driver_id)
);

create table if not exists public.contracts (
  id uuid primary key default gen_random_uuid(),
  load_id uuid not null references public.loads (id) on delete cascade,
  company_id uuid not null references public.companies (id) on delete cascade,
  driver_id uuid not null references public.drivers (id) on delete cascade,
  agreed_price numeric(12,2) not null,
  status text not null default 'active'
    check (status in ('active', 'completed', 'disputed', 'cancelled')),
  signed_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null,
  sender_id uuid not null references auth.users (id) on delete cascade,
  content text not null,
  read_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  body text not null,
  type text not null default 'info' check (type in ('info', 'success', 'warning', 'error')),
  link text,
  read_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  contract_id uuid not null references public.contracts (id) on delete cascade,
  amount numeric(12,2) not null check (amount > 0),
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'failed', 'refunded')),
  method text,
  paid_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz
);

create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  load_id uuid not null references public.loads (id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz,
  unique (user_id, load_id)
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  contract_id uuid not null references public.contracts (id) on delete cascade,
  reviewer_id uuid not null references auth.users (id) on delete cascade,
  reviewee_id uuid not null references auth.users (id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  kind text not null,
  file_path text not null,
  status text not null default 'pending',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz
);

create table if not exists public.vehicle_images (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles (id) on delete cascade,
  file_path text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz
);

create table if not exists public.load_images (
  id uuid primary key default gen_random_uuid(),
  load_id uuid not null references public.loads (id) on delete cascade,
  file_path text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users (id),
  action text not null,
  entity text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz
);

create table if not exists public.plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  price_monthly numeric(12,2) not null default 0,
  features jsonb not null default '[]'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  plan_id uuid not null references public.plans (id),
  status text not null default 'trialing'
    check (status in ('active', 'canceled', 'past_due', 'trialing')),
  current_period_end timestamptz not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz
);

-- updated_at triggers
do $$
declare
  t text;
begin
  foreach t in array array[
    'profiles','companies','drivers','vehicles','loads','applications','contracts',
    'messages','notifications','payments','favorites','reviews','documents',
    'vehicle_images','load_images','audit_logs','plans','subscriptions'
  ]
  loop
    execute format(
      'drop trigger if exists set_%I_updated_at on public.%I;
       create trigger set_%I_updated_at
       before update on public.%I
       for each row execute function public.set_updated_at();',
      t, t, t, t
    );
  end loop;
end $$;

-- Profile bootstrap on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, full_name, email, phone, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.email,
    new.raw_user_meta_data->>'phone',
    coalesce(new.raw_user_meta_data->>'role', 'company')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Indexes
create index if not exists idx_loads_status on public.loads (status) where deleted_at is null;
create index if not exists idx_loads_origin_state on public.loads (origin_state) where deleted_at is null;
create index if not exists idx_loads_destination_state on public.loads (destination_state) where deleted_at is null;
create index if not exists idx_applications_load on public.applications (load_id);
create index if not exists idx_notifications_user on public.notifications (user_id, read_at);
create index if not exists idx_messages_conversation on public.messages (conversation_id, created_at);

-- RLS
alter table public.profiles enable row level security;
alter table public.companies enable row level security;
alter table public.drivers enable row level security;
alter table public.vehicles enable row level security;
alter table public.loads enable row level security;
alter table public.applications enable row level security;
alter table public.contracts enable row level security;
alter table public.messages enable row level security;
alter table public.notifications enable row level security;
alter table public.payments enable row level security;
alter table public.favorites enable row level security;
alter table public.reviews enable row level security;
alter table public.documents enable row level security;
alter table public.vehicle_images enable row level security;
alter table public.load_images enable row level security;
alter table public.audit_logs enable row level security;
alter table public.plans enable row level security;
alter table public.subscriptions enable row level security;

-- Policies (essenciais)
create policy "profiles_select_authenticated"
  on public.profiles for select to authenticated
  using (deleted_at is null);

create policy "profiles_update_own"
  on public.profiles for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "companies_select_all"
  on public.companies for select to authenticated
  using (deleted_at is null);

create policy "companies_manage_own"
  on public.companies for all to authenticated
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy "drivers_select_all"
  on public.drivers for select to authenticated
  using (deleted_at is null);

create policy "drivers_manage_own"
  on public.drivers for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "vehicles_select_all"
  on public.vehicles for select to authenticated
  using (deleted_at is null);

create policy "vehicles_manage_own"
  on public.vehicles for all to authenticated
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy "loads_select_open_or_related"
  on public.loads for select to authenticated
  using (
    deleted_at is null
    and (
      status in ('open', 'in_progress', 'completed')
      or company_id in (select id from public.companies where owner_id = auth.uid())
    )
  );

create policy "loads_manage_company_owner"
  on public.loads for all to authenticated
  using (
    company_id in (select id from public.companies where owner_id = auth.uid())
  )
  with check (
    company_id in (select id from public.companies where owner_id = auth.uid())
  );

create policy "applications_select_related"
  on public.applications for select to authenticated
  using (
    driver_id in (select id from public.drivers where user_id = auth.uid())
    or load_id in (
      select l.id from public.loads l
      join public.companies c on c.id = l.company_id
      where c.owner_id = auth.uid()
    )
  );

create policy "applications_insert_driver"
  on public.applications for insert to authenticated
  with check (
    driver_id in (select id from public.drivers where user_id = auth.uid())
  );

create policy "notifications_own"
  on public.notifications for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "messages_participants"
  on public.messages for select to authenticated
  using (sender_id = auth.uid() or true);

create policy "messages_insert_own"
  on public.messages for insert to authenticated
  with check (sender_id = auth.uid());

create policy "favorites_own"
  on public.favorites for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "reviews_select_all"
  on public.reviews for select to authenticated
  using (deleted_at is null);

create policy "reviews_insert_own"
  on public.reviews for insert to authenticated
  with check (reviewer_id = auth.uid());

create policy "plans_public_read"
  on public.plans for select to authenticated
  using (is_active = true and deleted_at is null);

create policy "subscriptions_own"
  on public.subscriptions for select to authenticated
  using (user_id = auth.uid());

create policy "documents_own"
  on public.documents for all to authenticated
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

-- Storage buckets (execute no dashboard se preferir)
-- insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);
-- insert into storage.buckets (id, name, public) values ('documents', 'documents', false);
-- insert into storage.buckets (id, name, public) values ('vehicle-images', 'vehicle-images', true);
-- insert into storage.buckets (id, name, public) values ('load-images', 'load-images', true);

-- Seed plans
insert into public.plans (name, description, price_monthly, features)
values
  ('Starter', 'Para começar a publicar fretes', 0, '["3 usuários","Cargas ilimitadas (demo)","Chat básico"]'::jsonb),
  ('Pro', 'Operação em crescimento', 149.90, '["10 usuários","Relatórios","Prioridade no suporte"]'::jsonb),
  ('Enterprise', 'Grandes embarcadores', 499.90, '["Usuários ilimitados","SLA","API dedicada"]'::jsonb)
on conflict do nothing;
