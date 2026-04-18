"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function LocationPage() {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const router = useRouter();

  const next = () => {
    localStorage.setItem("trip_location", location);
    localStorage.setItem("trip_start", startDate?.toISOString() || "");
    localStorage.setItem("trip_end", endDate?.toISOString() || "");
    router.push("/newtrip/group");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
          style={{ backgroundImage: "url('/location.jpg')"}}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative bg-white/80 p-8 rounded-2xl shadow w-full max-w-lg">
        <h1 className="text-xl font-bold mb-4">
          Where are you going?
        </h1>

        {/* location */}
        <input
          className="w-full border border-pink-300 focus:border-pink-500 p-4 text-lg rounded-xl mb-4"
          placeholder="Enter destination"
          onChange={(e) => setLocation(e.target.value)}
        />

        {/* start date */}
        <div className="mb-4">
          <p className="text-sm mb-1">Start date</p>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="w-full border p-3 rounded-xl"
            placeholderText="Pick start date"
          />
        </div>

        {/* end date */}
        <div className="mb-4">
          <p className="text-sm mb-1">End date</p>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="w-full border p-3 rounded-xl"
            placeholderText="Pick end date"
          />
        </div>

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