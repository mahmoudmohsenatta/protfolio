-- Sahm Platform Schema (Supabase / PostgreSQL)
-- Covers Nabd (active lifestyle marketplace + partner venues) and Dar (interior design + AI + furniture).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- 1. Profiles (shared auth users)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text not null,
  phone text,
  preferred_lang text not null default 'ar' check (preferred_lang in ('ar', 'en')),
  city text not null default 'riyadh' check (city in ('riyadh', 'jeddah')),
  role text not null default 'member' check (role in ('member', 'partner', 'admin')),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 2. Nabd: Venues, Activities, Credits, Bookings
-- ---------------------------------------------------------------------------
create table if not exists public.venues (
  id text primary key,
  owner_id uuid references public.profiles(id),
  name_en text not null,
  name_ar text not null,
  district_en text not null,
  district_ar text not null,
  city text not null check (city in ('riyadh', 'jeddah')),
  lat double precision not null,
  lng double precision not null
);

create table if not exists public.activities (
  id text primary key,
  venue_id text not null references public.venues(id) on delete cascade,
  category text not null check (category in ('fitness', 'wellness', 'sports', 'music', 'arts', 'entertainment')),
  title_en text not null,
  title_ar text not null,
  description_en text not null,
  description_ar text not null,
  credits integer not null check (credits > 0),
  duration_min integer not null,
  capacity integer not null,
  women_only boolean not null default false,
  family_friendly boolean not null default false,
  rating numeric(2,1) not null default 4.8
);

create table if not exists public.wallets (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  plan_id text check (plan_id in ('starter', 'active', 'pro')),
  credits integer not null default 0 check (credits >= 0),
  renews_at timestamptz
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  user_id uuid not null references public.profiles(id) on delete cascade,
  activity_id text not null references public.activities(id),
  starts_at timestamptz not null,
  credits integer not null,
  status text not null default 'confirmed' check (status in ('confirmed', 'checked_in', 'cancelled')),
  checked_in_at timestamptz,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 3. Dar: Furniture Catalog, AI Room Designs, Consultations, Orders
-- ---------------------------------------------------------------------------
create table if not exists public.products (
  id text primary key,
  slug text unique not null,
  category text not null,
  title_en text not null,
  title_ar text not null,
  price_sar numeric(10,2) not null,
  dimensions_cm text not null,
  material_en text not null,
  material_ar text not null,
  style_tags text[] not null default '{}',
  in_stock boolean not null default true
);

create table if not exists public.ai_room_designs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  style_id text not null,
  room_type text not null,
  notes text,
  recommended_product_ids text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.consultations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  designer_name text not null,
  city text not null check (city in ('riyadh', 'jeddah', 'online')),
  scheduled_at timestamptz not null,
  status text not null default 'scheduled' check (status in ('scheduled', 'completed', 'cancelled')),
  notes text,
  created_at timestamptz not null default now()
);

