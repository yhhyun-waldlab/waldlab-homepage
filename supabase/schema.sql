-- Run once in Supabase Dashboard → SQL Editore
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

-- Create contact_inquiries table
drop table if exists public.contact_inquiries cascade;

create table public.contact_inquiries (
  id text primary key,
  service text not null,
  org_name text not null,
  contact_name text not null,
  position text,
  phone text not null,
  email text not null,
  inquiry text not null,
  status text not null default 'pending' check (
    status in ('pending', 'in_progress', 'completed', 'archived')
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on column public.contact_inquiries.position is 'Job title / department (optional, from contact form)';

create index contact_inquiries_created_at_idx on public.contact_inquiries (created_at desc);
create index contact_inquiries_status_idx on public.contact_inquiries (status);

-- Enable RLS
alter table public.contact_inquiries enable row level security;

-- Anyone can insert inquiries (public form)
create policy "Public insert inquiries"
  on public.contact_inquiries
  for insert
  to anon, authenticated
  with check (true);

-- Only authenticated users can read (admin dashboard)
create policy "Authenticated read inquiries"
  on public.contact_inquiries
  for select
  to authenticated
  using (true);
