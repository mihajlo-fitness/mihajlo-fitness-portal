"use client";

import { useState } from "react";
import { Dumbbell } from "lucide-react";

// Prikazuje /public/mihajlo-photo.jpg ako postoji; dok ga ne dodaš,
// prikazuje lep placeholder umesto polomljene slike.
export default function ProfilePhoto({ className = "" }) {
  const [greska, setGreska] = useState(false);

  if (greska) {
    return (
      <div className={"bg-gradient-to-br from-accent/15 to-accent/5 flex items-center justify-center " + className}>
        <Dumbbell size={40} className="text-accent/40" />
      </div>
    );
  }

  return (
    <img
      src="/mihajlo-photo.jpg"
      alt="Mihajlo, sertifikovani fitness coach"
      onError={() => setGreska(true)}
      className={"object-cover " + className}
    />
  );
}
