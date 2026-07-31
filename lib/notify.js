// Poziva se posle uspešnog slanja forme (check-in, zahtev, poruka).
// Nikad ne baca grešku koja bi prekinula korisnikov tok — ako email
// ne uspe (ili nije podešen), korisnik i dalje vidi "Uspešno poslato".
export async function notifyCoach(subject, text) {
  try {
    await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, text }),
    });
  } catch (e) {
    // ignore
  }
}
