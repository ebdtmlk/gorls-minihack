"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VibesPage() {

  const router = useRouter();
  const [vibes, setVibes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const vibeOptions = ["Healing", "Fun", "Adventure", "Relaxing", "Bonding"];

  const toggle = (v: string) => {
    setVibes((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );
  };

  const createTrip = async () => {
  setLoading(true);
  const location = localStorage.getItem("trip_location");
  const group = localStorage.getItem("trip_group");
  const startDate = localStorage.getItem("trip_start");
  const endDate = localStorage.getItem("trip_end");

  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ location, group, vibes, startDate, endDate }),
  });
  const data = await res.json();

  const trip = {
    id: Date.now().toString(),
    location,
    group,
    vibes,
    startDate,
    endDate,
    result: data || {},
  };

  // Save as current trip for results page
  localStorage.setItem("current_trip", JSON.stringify(trip));

  // Save to trips history for home page
  const existing = JSON.parse(localStorage.getItem("trips") || "[]");
  localStorage.setItem("trips", JSON.stringify([...existing, trip]));

  router.push(`/tripresults/${trip.id}`);
};

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/vibes.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative bg-white/80 p-8 rounded-2xl shadow w-full max-w-lg">
        <h1 className="text-xl font-bold mb-4">What's the vibe?</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {vibeOptions.map((v) => (
            <button
              key={v}
              onClick={() => toggle(v)}
              className={`px-3 py-1 rounded-full border ${
                vibes.includes(v) ? "bg-black text-white" : ""
              }`}
            >
              {v}
            </button>
          ))}
        </div>
        <button
          onClick={createTrip}
          disabled={loading}
          className="w-full bg-pink-200 text-white py-3 rounded-xl"
        >
          {loading ? "Creating..." : "Generate Trip ✨"}
        </button>
      </div>
    </main>
  );
}
