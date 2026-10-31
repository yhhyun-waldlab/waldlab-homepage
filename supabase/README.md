# Supabase database

This project uses **Supabase** (not Prisma). Schema source of truth:

- Full bootstrap (dev only, drops data): `supabase/schema.sql`
- Incremental migrations: `supabase/migrations/*.sql`

## Add `contact_inquiries.position` (production)

Run in **Supabase Dashboard → SQL Editor** (or psql against your project):

```sql
-- File: supabase/migrations/20260331120000_add_contact_inquiries_position.sql
alter table public.contact_inquiries
  add column if not exists position text;

comment on column public.contact_inquiries.position is 'Job title / department from contact form (optional)';

update public.contact_inquiries
set
  position = coalesce(
    nullif(trim(position), ''),
    trim(substring(inquiry from '^\[직책/부서:\s*([^\]]+)\]'))
  ),
  inquiry = regexp_replace(
    inquiry,
    '^\[직책/부서:[^\]]+\]\s*',
    ''
  )
where inquiry ~ '^\[직책/부서:';
```

After migration, reload the PostgREST schema cache if needed (Supabase usually picks up within seconds).

### CLI (optional)

With [Supabase CLI](https://supabase.com/docs/guides/cli) linked to the project:

```bash
supabase db push
```

Or pipe the migration file:

```bash
supabase db execute --file supabase/migrations/20260331120000_add_contact_inquiries_position.sql
```

Ensure Vercel env includes `SUPABASE_SERVICE_ROLE_KEY` for `/api/contact` and admin inquiry APIs.
