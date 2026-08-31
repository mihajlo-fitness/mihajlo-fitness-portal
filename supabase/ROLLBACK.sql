-- =====================================================================
-- ROLLBACK — vraća staru, JAVNU verziju pravila (pre bezbednosne popravke)
-- =====================================================================
-- NE POKREĆI OVO "za svaki slučaj". Pokreni ga SAMO ako:
--   (a) odlučiš da potpuno odustaneš od nove verzije sajta, I
--   (b) vratio/la si Vercel na STARI deploy (Deployments → ... → Promote
--       to Production na deploy od PRE ovog projekta).
--
-- Ako pokreneš ovo dok je NOVI kod još uvek live na Vercel-u, sajt će
-- prestati da radi ispravno (novi kod očekuje owner_id kolonu i pravu
-- prijavu; stari kod prati imena, ne naloge).
--
-- OVO VRAĆA SISTEM U STANJE OD PRE BEZBEDNOSNE POPRAVKE — svi podaci
-- (mere, fotografije, check-inovi) ponovo postaju čitljivi/pisivi bilo
-- kome ko poseduje anon ključ. Koristi ovo SAMO kao poslednju opciju.
--
-- Podaci klijenata (redovi u kv_store, fajlovi u photos bucket-u) OSTAJU
-- netaknuti u oba slučaja — ovaj skript menja samo PRAVILA pristupa, ne
-- briše ništa.
-- =====================================================================

drop policy if exists "kv_select" on kv_store;
drop policy if exists "kv_insert" on kv_store;
drop policy if exists "kv_update" on kv_store;
drop policy if exists "kv_delete" on kv_store;

create policy "Javni pristup za citanje" on kv_store for select using (true);
create policy "Javni pristup za pisanje" on kv_store for insert with check (true);
create policy "Javni pristup za izmenu" on kv_store for update using (true);
create policy "Javni pristup za brisanje" on kv_store for delete using (true);

drop policy if exists "photos_insert_own" on storage.objects;
drop policy if exists "photos_select_own_or_coach" on storage.objects;

create policy "Javni upload fotografija" on storage.objects
  for insert to public with check (bucket_id = 'photos');
create policy "Javno citanje fotografija" on storage.objects
  for select to public using (bucket_id = 'photos');

-- Ne zaboravi i: Supabase → Storage → bucket "photos" → Settings →
-- ponovo uključi "Public bucket" (ovaj SQL sam po sebi to ne menja).
-- =====================================================================
