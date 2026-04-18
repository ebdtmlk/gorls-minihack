"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!;

async function fetchUnsplashPhoto(query: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=5&orientation=portrait`,
      { headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` } }
    );
    const data = await res.json();
    if (!data.results?.length) return null;
    const pick = data.results[Math.floor(Math.random() * data.results.length)];
    return pick.urls.regular;
  } catch {
    return null;
  }
}

export default function TripResultsPage() {
  const [trip, setTrip] = useState<any>(null);
  const [outfitImages, setOutfitImages] = useState<string[]>([]);
  const [photoImages, setPhotoImages] = useState<string[]>([]);
  const [loadingImages, setLoadingImages] = useState(true);
  // Load trip from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("current_trip");
    if (saved) setTrip(JSON.parse(saved));
  }, []);

  // Fetch Unsplash images once trip is loaded
  useEffect(() => {
  if (!trip?.result) return;

  const { outfits = [], photos = [] } = trip.result;

  const loadImages = async () => {
    setLoadingImages(true);
    const [fetchedOutfits, fetchedPhotos] = await Promise.all([
      Promise.all(
        outfits.map((o: string) =>
          fetchUnsplashPhoto(`${trip.location} ${o} outfit fashion`)
        )
      ),
      Promise.all(
        photos.map((p: string) =>
          fetchUnsplashPhoto(`${trip.location} ${p} travel`)
        )
      ),
    ]);
    setOutfitImages(fetchedOutfits.filter(Boolean) as string[]);
    setPhotoImages(fetchedPhotos.filter(Boolean) as string[]);
    setLoadingImages(false);
  };

  loadImages();
}, [trip]);

  if (!trip) return <div className="p-10 text-center text-gray-400">Loading trip...</div>;

  const result = trip.result;

  return (
    <main className="min-h-screen bg-pink-50 pb-10">
      <Link
        href="/"
        className="absolute top-4 left-4 bg-white text-black px-4 py-2 rounded-xl shadow-sm text-sm hover:bg-gray-50 transition"
      >
        ← Back
      </Link>

      <h1 className="text-3xl font-bold text-center pt-10 mb-1">
        🌴 {trip.location} Trip
      </h1>
      <p className="text-gray-500 text-center mb-6 text-sm">
        {trip.group} · {trip.vibes?.join(", ")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-4">

        <Tile title="🎧 Playlist" items={result?.playlist || []} />
        <Tile title="📍 Activities" items={result?.activities || []} />
        <Tile title="🗓️ Itinerary" items={result?.itinerary || []} className="md:col-span-2" />

        {loadingImages ? (
          <>
            <SkeletonTile title="👗 Outfits" />
            <SkeletonTile title="📸 Photo Inspo" />
          </>
        ) : (
          <>
            <ImageTile title="👗 Outfits" items={result?.outfits || []} imageUrls={outfitImages} />
            <ImageTile title="📸 Photo Inspo" items={result?.photos || []} imageUrls={photoImages} />
          </>
        )}

      </div>
    </main>
  );
}

// Plain text tile
function Tile({ title, items, className = "" }: { title: string; items: string[]; className?: string }) {
  return (
    <div className={`bg-white p-5 rounded-2xl shadow ${className}`}>
      <h2 className="font-semibold mb-3">{title}</h2>
      <div className="space-y-2">
        {items.map((item: string, i: number) => (
          <div key={i} className="text-sm bg-gray-50 p-2 rounded-lg">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

// Pinterest-style image grid tile
function ImageTile({ title, items, imageUrls }: { title: string; items: string[]; imageUrls: string[] }) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <h2 className="font-semibold mb-3">{title}</h2>
      <div className="grid grid-cols-2 gap-2">
        {items.map((caption, i) => (
          <div
            key={i}
            className="relative group cursor-pointer rounded-xl overflow-hidden"
            onClick={() => setSelected(selected === i ? null : i)}
          >
            {imageUrls[i] ? (
              <div className="relative w-full h-44">
                <Image
                  src={imageUrls[i]}
                  alt={caption}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ) : (
              <div className="w-full h-44 bg-pink-50 flex items-center justify-center text-gray-300 text-xs">
                No image
              </div>
            )}
            {/* Caption overlay on hover or tap */}
            <div
              className={`absolute inset-0 bg-black/50 flex items-end p-2 transition-opacity duration-200 ${
                selected === i ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <p className="text-white text-xs leading-snug">{caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Skeleton loader while images fetch
function SkeletonTile({ title }: { title: string }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <h2 className="font-semibold mb-3">{title}</h2>
      <div className="grid grid-cols-2 gap-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-44 rounded-xl bg-pink-100 animate-pulse" />
        ))}
      </div>
    </div>
  );
}
