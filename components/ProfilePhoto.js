"use client";

import { useState } from "react";
import { Dumbbell } from "lucide-react";

// Prikazuje /public/mihajlo-photo.jpg ako postoji; dok ga ne dodaš,
// prikazuje lep placeholder umesto polomljene slike.
export default function ProfilePhoto({ className = "" }) {
  const [greska, setGreska] = useState(false);

  if (greska) {
    return (
      <div
        className={"flex items-center justify-center " + className}
        style={{ background: "#5170ff" }}
      >
        <Dumbbell size={44} className="text-white" />
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
