export function slugify(str = "") {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function formatDateSr(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString("sr-Latn-RS", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function getYouTubeId(url = "") {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

// Prepoznaje YouTube, Vimeo, direktan video fajl (.mp4/.webm/.mov), ili
// vraća "link" tip za sve ostalo (Google Drive, Dropbox, itd.) — u tom
// slučaju se prikazuje dugme koje otvara video u novom tabu, umesto
// ugrađenog plejera (ne mogu se svi linkovi ugraditi direktno).
export function getVideoEmbed(url = "") {
  if (!url || url === "#") return null;

  const ytId = getYouTubeId(url);
  if (ytId) return { type: "youtube", embedUrl: `https://www.youtube.com/embed/${ytId}` };

  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch) return { type: "vimeo", embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}` };

  if (/\.(mp4|webm|mov)(\?.*)?$/i.test(url)) return { type: "direct", embedUrl: url };

  return { type: "link", embedUrl: url };
}
