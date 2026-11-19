create table public.appcc_temperature_review_batches (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  uploaded_by text not null,
  filename text not null,
  content text not null check (octet_length(content) between 1 and 250000),
  content_sha256 text not null unique,
  evidence_reference text,
  reviewed_at timestamptz,
  reviewed_by text,
  check (
    (reviewed_at is null and reviewed_by is null and evidence_reference is null)
    or (reviewed_at is not null and reviewed_by is not null and evidence_reference is not null)
  )
);

alter table public.appcc_temperature_review_batches enable row level security;
revoke all on public.appcc_temperature_review_batches from public, anon, authenticated;
grant select, insert, update on public.appcc_temperature_review_batches to service_role;
