"use client";

import Link from "next/dist/client/link";
import { useEffect, useState } from "react";

export default function TripPage({ params }: any) {
  const id = params.id; // ✅ extract FIRST

  const [trip, setTrip] = useState<any>(null);

  useEffect(() => {
    const trips = JSON.parse(localStorage.getItem("trips") || "[]");
    const found = trips.find((t: any) => t.id === id);
    setTrip(found);
  }, [id]); // ✅ use id, NOT params.id

  if (!trip) return <div className="p-10">Loading trip...</div>;

  const result = trip.result;

  return (
    <main className="p-8 max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold mb-2">
        🌴 {trip.location} Trip
      </h1>

      <p className="text-gray-500 mb-6">
        {trip.group} • {trip.vibes.join(", ")}
      </p>
    <Link
          href="/"
          className="bg-black text-white px-4 py-2 rounded-xl"
        >
          Back
    </Link>
      {/* TILES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <Tile title="🎧 Playlist" items={result?.playlist || []} />
        <Tile title="👗 Outfits" items={result?.outfits || []} />
        <Tile title="📍 Activities" items={result?.activities || []} />
        <Tile title="📸 Photo Inspo" items={result?.photos || []} />
        <Tile title="🗓 Itinerary" items={result?.itinerary || []} />

      </div>
    </main>
  );
}

function Tile({ title, items }: any) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <h2 className="font-semibold mb-3">{title}</h2>

      <div className="space-y-2">
        {items?.map((item: string, i: number) => (
          <div key={i} className="text-sm bg-gray-50 p-2 rounded-lg">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}