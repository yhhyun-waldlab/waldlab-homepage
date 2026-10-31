-- contact_inquiries.position (nullable)
-- Apply: Supabase Dashboard → SQL Editor → Run this file
-- Or: supabase db push (with linked project)

alter table public.contact_inquiries
  add column if not exists position text;

comment on column public.contact_inquiries.position is 'Job title / department from contact form (optional)';

-- One-time cleanup: legacy rows where position was embedded in inquiry body
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
