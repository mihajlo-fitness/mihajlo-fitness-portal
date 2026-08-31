-- =====================================================================
-- MIHAJLO FITNESS COACH — bezbednosna migracija (v2)
-- =====================================================================
-- OVO SE NE POKREĆE AUTOMATSKI. Kopiraj ceo ovaj fajl i pokreni ga u
-- Supabase dashboardu → SQL Editor → New query → Run.
--
-- Ako već imaš staru "kv_store" tabelu i "photos" bucket iz prve verzije
-- projekta, ovaj skript ih bezbedno ažurira (ne briše postojeće podatke).
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. PROFILES — svaki korisnik (klijent ili trener) ima jedan red ovde
-- ---------------------------------------------------------------------
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'client' check (role in ('client', 'coach')),
  ime text,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

drop policy if exists "profiles_select_own" on profiles;
create policy "profiles_select_own" on profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_update_own" on profiles;
create policy "profiles_update_own" on profiles
  for update using (auth.uid() = id);

-- Automatski napravi profil (role='client' po difoltu) čim se neko
-- prvi put prijavi preko magic link-a.
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, ime)
  values (new.id, new.raw_user_meta_data->>'ime')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Pomoćna funkcija — koristi se u RLS politikama ispod.
-- SECURITY DEFINER da izbegne beskonačnu rekurziju (funkcija čita
-- profiles bez da sama prolazi kroz RLS proveru profiles tabele).
create or replace function is_coach(uid uuid)
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (select 1 from profiles where id = uid and role = 'coach');
$$;

-- ---------------------------------------------------------------------
-- 2. KV_STORE — dodaje se owner_id, uklanjaju se stare "javne" politike
-- ---------------------------------------------------------------------
create table if not exists kv_store (
  key text primary key,
  value jsonb,
  owner_id uuid references auth.users(id) on delete cascade,
  updated_at timestamptz default now()
);

-- Ako tabela već postoji iz stare verzije, samo dodaj kolonu.
alter table kv_store add column if not exists owner_id uuid references auth.users(id) on delete cascade;

alter table kv_store enable row level security;

-- Uklanjamo SVE stare "javne" politike (iz prve verzije projekta) —
-- ako ne postoje, DROP POLICY IF EXISTS ih jednostavno preskače.
drop policy if exists "Javni pristup za citanje" on kv_store;
drop policy if exists "Javni pristup za pisanje" on kv_store;
drop policy if exists "Javni pristup za izmenu" on kv_store;
drop policy if exists "Javni pristup za brisanje" on kv_store;

-- SELECT: vlasnik reda ili trener vidi red. Anonimni zahtevi (owner_id
-- je NULL, npr. "zahtev:..." poslat sa /coaching pre nego što neko ima
-- nalog) vidljivi su SAMO treneru, ne javno.
drop policy if exists "kv_select" on kv_store;
create policy "kv_select" on kv_store
  for select using (
    auth.uid() = owner_id or is_coach(auth.uid())
  );

-- INSERT: klijent upisuje svoj red (owner_id = auth.uid()), trener
-- upisuje u ime klijenta (plan/feedback), ili je red anoniman
-- (owner_id IS NULL) — dozvoljeno SAMO za javne lead-formulare
-- (zahtev:*), ne za check-in/onboarding koji su iza login-a.
drop policy if exists "kv_insert" on kv_store;
create policy "kv_insert" on kv_store
  for insert with check (
    auth.uid() = owner_id
    or is_coach(auth.uid())
    or (owner_id is null and key like 'zahtev:%')
  );

drop policy if exists "kv_update" on kv_store;
create policy "kv_update" on kv_store
  for update using (
    auth.uid() = owner_id or is_coach(auth.uid())
  );

drop policy if exists "kv_delete" on kv_store;
create policy "kv_delete" on kv_store
  for delete using (
    auth.uid() = owner_id or is_coach(auth.uid())
  );

-- ---------------------------------------------------------------------
-- 3. STORAGE — bucket "photos" prelazi sa javnog na privatan + RLS
-- ---------------------------------------------------------------------
-- VAŽNO — ovaj deo NE MOŽE ceo da se uradi kroz SQL. Ručni korak:
-- Supabase dashboard → Storage → bucket "photos" → Settings → isključi
-- "Public bucket". Ako bucket ne postoji, napravi ga (Private).
--
-- Putanje fajlova su oblika: onboarding/{user_id}/front-*.jpg ili
-- checkin/{user_id}/front-*.jpg — politike ispod proveravaju da drugi
-- deo putanje (foldername[2]) odgovara auth.uid().

drop policy if exists "Javni upload fotografija" on storage.objects;
drop policy if exists "Javno citanje fotografija" on storage.objects;

drop policy if exists "photos_insert_own" on storage.objects;
create policy "photos_insert_own" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'photos'
    and (storage.foldername(name))[2] = auth.uid()::text
  );

drop policy if exists "photos_select_own_or_coach" on storage.objects;
create policy "photos_select_own_or_coach" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'photos'
    and ((storage.foldername(name))[2] = auth.uid()::text or is_coach(auth.uid()))
  );

-- ---------------------------------------------------------------------
-- 4. NAKON POKRETANJA OVOG SKRIPTA — ručni koraci (van SQL editora):
-- ---------------------------------------------------------------------
-- a) Prijavi se JEDNOM na sajtu (/prijava) svojim (trenerovim) email-om
--    da se napravi tvoj profil.
-- b) Vrati se ovde u SQL Editor i pokreni (zameni email pravim):
--
--    update profiles set role = 'coach'
--    where id = (select id from auth.users where email = 'TVOJ_EMAIL_OVDE');
--
-- c) Storage → bucket "photos" → isključi "Public bucket" (ako već nije).
-- =====================================================================
