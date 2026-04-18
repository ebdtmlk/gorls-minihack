"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [trips, setTrips] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("trips") || "[]");
    setTrips(saved);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">🌴 VibeTrip</h1>

        <Link
          href="/newtrip"
          className="bg-black text-white px-4 py-2 rounded-xl"
        >
          + New Trip
        </Link>
      </div>

      {/* TRIPS GRID */}
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trips.map((trip, i) => (
            <Link key={i} href={`/tripresults/${trip.id}`}>
              <div className="bg-white p-4 rounded-2xl shadow hover:shadow-lg hover:scale-[1.02] transition cursor-pointer">
                
                <h2 className="font-semibold text-lg">
                  {trip.location}
                </h2>

                <p className="text-sm text-gray-500">
                  {trip.group}
                </p>

                <div className="flex flex-wrap gap-1 mt-2">
                  {trip.vibes?.map((v: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                    >
                      {v}
                    </span>
                  ))}
                </div>

              </div>
            </Link>
          ))}
        </div>
    </main>
  );
}