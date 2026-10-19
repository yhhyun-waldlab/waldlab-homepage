-- Run once in Supabase Dashboard → SQL Editor
-- This will drop and recreate tables (data will be lost)

-- Drop existing tables if they exist
drop table if exists public.announcements cascade;
drop table if exists public.admin_accounts cascade;

-- Create announcements table
create table public.announcements (
  id text primary key,
  date date not null,
  category text not null check (
    category in ('update', 'tech-news', 'insight', 'notice', 'ip')
  ),
  tag jsonb not null,
  title jsonb not null,
  excerpt jsonb not null,
  body jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index announcements_date_idx on public.announcements (date desc);

-- Enable RLS and create policies
alter table public.announcements enable row level security;

create policy "Public read announcements"
  on public.announcements
  for select
  to anon, authenticated
  using (true);

-- Create admin_accounts table
create table public.admin_accounts (
  id text primary key,
  email text not null unique,
  password_hash text not null,
  name text not null,
  created_at timestamptz not null default now()
);

alter table public.admin_accounts enable row level security;
