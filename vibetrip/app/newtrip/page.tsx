"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [location, setLocation] = useState("");
  const [group, setGroup] = useState("");
  const [vibes, setVibes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const vibeOptions = ["Healing", "Fun", "Adventure", "Relaxing", "Bonding"];

  const toggle = (v: string) => {
    setVibes((prev) =>
      prev.includes(v)
        ? prev.filter((x) => x !== v)
        : [...prev, v]
    );
  };

  const createTrip = async () => {
    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ location, group, vibes }),
    });

    const data = await res.json();

    const trip = {
        id: Date.now().toString(),
        location,
        group,
        vibes,
        result: data || {
            playlist: [],
            outfits: [],
            activities: [],
            photos: [],
            itinerary: []
        }
    };
    // save summary to dashboard
    const existing = JSON.parse(localStorage.getItem("trips") || "[]");

    localStorage.setItem(
      "trips",
      JSON.stringify([
        ...existing,
        { location, group, vibes }
      ])
    );

    router.push(`/tripresults/${trip.id}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <Link
          href="/"
          className="bg-black text-white px-4 py-2 rounded-xl"
        >
          Back
        </Link>
      <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow">
        
        <h1 className="text-xl font-bold mb-4">
          ✈️ Create New Trip
        </h1>

        <div className="space-y-4">

          <input
            className="w-full border p-3 rounded-xl"
            placeholder="Where are you going?"
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            className="w-full border p-3 rounded-xl"
            placeholder="Who’s going?"
            onChange={(e) => setGroup(e.target.value)}
          />

          {/* VIBES */}
          <div className="flex flex-wrap gap-2">
            {vibeOptions.map((v) => (
              <button
                key={v}
                onClick={() => toggle(v)}
                className={`px-3 py-1 rounded-full border text-sm ${
                  vibes.includes(v)
                    ? "bg-black text-white"
                    : ""
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <button
            onClick={createTrip}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl"
          >
            {loading ? "Creating..." : "Generate Trip ✨"}
          </button>
        </div>
      </div>
    </main>
  );
}