"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GroupPage() {
  const [group, setGroup] = useState("");
  const router = useRouter();

  const next = () => {
    localStorage.setItem("trip_group", group);
    router.push("/newtrip/vibes");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
          style={{ backgroundImage: "url('/whosgoing.jpg')"}}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative bg-white/80 p-8 rounded-2xl shadow w-full max-w-lg">
        <h1 className="text-xl font-bold mb-4">
          How many people are going?
        </h1>

        <input
          className="w-full border p-3 rounded-xl"
          placeholder="Friends, family, solo..."
          onChange={(e) => setGroup(e.target.value)}
        />

        <button
          onClick={next}
          className="w-full mt-4 bg-pink-200 text-white py-3 rounded-xl"
        >
          Next →
        </button>
      </div>
    </main>
  );
}