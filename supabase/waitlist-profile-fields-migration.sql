alter table public.waitlist
  add column if not exists name text,
  add column if not exists suggestions text;

update public.waitlist
set name = split_part(email, '@', 1)
where name is null;

alter table public.waitlist
  alter column name set not null;
