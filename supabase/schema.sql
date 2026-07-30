-- Pokreni ovo u Supabase dashboard-u: Project → SQL Editor → New query → nalepi i klikni Run

create table if not exists kv_store (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- Uključujemo Row Level Security (osnovna zaštita tabele)
alter table kv_store enable row level security;

-- Dozvoljavamo čitanje i pisanje preko "anon" ključa (javni klijentski ključ).
-- Ovo je dovoljno za mali klijentski portal gde svi klijenti i trener
-- dele isti javni ključ. Napomena: bilo ko ko ima tvoj anon ključ i
-- naziv tabele tehnički može čitati/pisati u ovu tabelu — u redu je
-- za ovu namenu (nema osetljivih podataka poput lozinki ili plaćanja),
-- ali za osetljivije podatke bi trebalo dodati pravu autentifikaciju.
create policy "Javni pristup za citanje"
  on kv_store for select
  using (true);

create policy "Javni pristup za pisanje"
  on kv_store for insert
  with check (true);

create policy "Javni pristup za izmenu"
  on kv_store for update
  using (true);

create policy "Javni pristup za brisanje"
  on kv_store for delete
  using (true);

-- ============================================================
-- FOTOGRAFIJE (Supabase Storage)
-- ============================================================
-- Prvo napravi bucket preko Supabase dashboard-a:
-- Storage → New bucket → naziv tačno "photos" → uključi "Public bucket" → Create.
-- Zatim pokreni ovo ispod u SQL Editor-u da dozvoliš otpremanje fotografija:

create policy "Javni upload fotografija"
  on storage.objects for insert
  to public
  with check (bucket_id = 'photos');

create policy "Javno citanje fotografija"
  on storage.objects for select
  to public
  using (bucket_id = 'photos');
