-- ═══════════════════════════════════════════════════════════
-- AvtoQism Auto Parts Marketplace – Initial Database Schema
-- ═══════════════════════════════════════════════════════════

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  phone text unique,
  avatar_url text,
  role text default 'user' check (role in ('user', 'seller', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. CATEGORIES TABLE
create table if not exists public.categories (
  id bigserial primary key,
  name text not null,
  slug text unique not null,
  icon text,
  count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. BRANDS TABLE
create table if not exists public.brands (
  id bigserial primary key,
  name text not null,
  slug text unique not null,
  logo text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. PRODUCTS TABLE
create table if not exists public.products (
  id bigserial primary key,
  title text not null,
  slug text,
  price numeric not null check (price >= 0),
  old_price numeric,
  condition text default 'new' check (condition in ('new', 'used')),
  category_id bigint references public.categories(id) on delete set null,
  brand_id bigint references public.brands(id) on delete set null,
  seller_id uuid references public.profiles(id) on delete cascade,
  city text not null,
  oem text,
  compatible_cars text[],
  description text not null,
  images text[] default array[]::text[],
  views integer default 0,
  status text default 'pending' check (status in ('active', 'pending', 'rejected', 'sold', 'archived')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. FAVORITES TABLE
create table if not exists public.favorites (
  id bigserial primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  product_id bigint references public.products(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, product_id)
);

-- 6. CART ITEMS TABLE
create table if not exists public.cart_items (
  id bigserial primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  product_id bigint references public.products(id) on delete cascade not null,
  quantity integer default 1 check (quantity > 0),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, product_id)
);

-- 7. ORDERS TABLE
create table if not exists public.orders (
  id bigserial primary key,
  order_number text unique not null,
  user_id uuid references public.profiles(id) on delete set null,
  customer_name text not null,
  phone text not null,
  comment text,
  items jsonb not null default '[]'::jsonb,
  total numeric not null,
  status text default 'new' check (status in ('new', 'processing', 'completed', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. REVIEWS TABLE
create table if not exists public.reviews (
  id bigserial primary key,
  seller_id uuid references public.profiles(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  user_name text not null,
  rating integer check (rating between 1 and 5) not null,
  comment text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. REPORTS TABLE
create table if not exists public.reports (
  id bigserial primary key,
  ad_id bigint references public.products(id) on delete cascade,
  ad_title text,
  user_id uuid references public.profiles(id) on delete set null,
  reason text not null,
  comment text,
  status text default 'pending' check (status in ('pending', 'resolved', 'dismissed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 10. INQUIRIES (CONTACT) TABLE
create table if not exists public.inquiries (
  id bigserial primary key,
  name text not null,
  phone text not null,
  message text not null,
  status text default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 11. SUBSCRIBERS TABLE
create table if not exists public.subscribers (
  id bigserial primary key,
  email text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 12. NOTIFICATIONS TABLE
create table if not exists public.notifications (
  id bigserial primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  message text not null,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 13. ADMIN ACTIVITY LOG TABLE
create table if not exists public.admin_activity (
  id bigserial primary key,
  admin_id uuid references public.profiles(id) on delete set null,
  action text not null,
  target_id text,
  details jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ═══════════════════════════════════════════════════════════
-- INDEXES
-- ═══════════════════════════════════════════════════════════
create index if not exists idx_products_category on public.products(category_id);
create index if not exists idx_products_brand on public.products(brand_id);
create index if not exists idx_products_city on public.products(city);
create index if not exists idx_products_price on public.products(price);
create index if not exists idx_products_status on public.products(status);
create index if not exists idx_favorites_user on public.favorites(user_id);
create index if not exists idx_orders_user on public.orders(user_id);

-- ═══════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ═══════════════════════════════════════════════════════════
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.brands enable row level security;
alter table public.products enable row level security;
alter table public.favorites enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.reviews enable row level security;
alter table public.reports enable row level security;
alter table public.inquiries enable row level security;
alter table public.subscribers enable row level security;

-- Profiles: anyone can view; users can update own profile
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Categories & Brands: read-only for public; write for admin
create policy "Categories viewable by all" on public.categories for select using (true);
create policy "Brands viewable by all" on public.brands for select using (true);

-- Products: approved active products viewable by anyone; users manage own
create policy "Active products viewable by everyone" on public.products for select using (
  status = 'active' or auth.uid() = seller_id or exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  )
);
create policy "Users can insert own products" on public.products for insert with check (auth.uid() = seller_id);
create policy "Users can update own products" on public.products for update using (auth.uid() = seller_id);
create policy "Users can delete own products" on public.products for delete using (auth.uid() = seller_id);

-- Favorites: users manage only their own
create policy "Users view own favorites" on public.favorites for select using (auth.uid() = user_id);
create policy "Users insert own favorites" on public.favorites for insert with check (auth.uid() = user_id);
create policy "Users delete own favorites" on public.favorites for delete using (auth.uid() = user_id);

-- Cart items: users manage only their own
create policy "Users view own cart" on public.cart_items for select using (auth.uid() = user_id);
create policy "Users manage own cart" on public.cart_items for all using (auth.uid() = user_id);

-- Orders: users view own orders; admins view all
create policy "Users view own orders" on public.orders for select using (
  auth.uid() = user_id or exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  )
);
create policy "Anyone can create order" on public.orders for insert with check (true);

-- Reviews: viewable by all; logged in can add
create policy "Reviews viewable by all" on public.reviews for select using (true);
create policy "Users insert reviews" on public.reviews for insert with check (auth.uid() = user_id);

-- Subscribers & Inquiries: public can insert
create policy "Public insert subscribers" on public.subscribers for insert with check (true);
create policy "Public insert inquiries" on public.inquiries for insert with check (true);
create policy "Public insert reports" on public.reports for insert with check (true);
