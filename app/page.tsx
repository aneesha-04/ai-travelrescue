"use client";

import { useState } from "react";
import { generateTripPlan } from "./lib/gemini";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [tripResult, setTripResult] = useState("");

  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [interests, setInterests] = useState("");

  const handleGenerateTrip = async () => {
    setLoading(true);

    try {
      const prompt = `
Plan a trip with these details:

Destination: ${destination}
Budget: ${budget}
Interests: ${interests}

Give a detailed day-wise itinerary with places, food, and tips.
      `;

      const result = await generateTripPlan(prompt);

      setTripResult(result);
    } catch (error) {
      console.error(error);
      setTripResult("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold">
        TravelRescue AI
      </h1>

      <p className="mt-4 text-gray-300 text-lg">
        Autonomous AI travel recovery assistant
      </p>

      {/* INPUT SECTION */}
      <div className="mt-10 flex flex-col gap-4 max-w-md">

        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="p-3 rounded bg-white text-black"
        />

        <input
          type="text"
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="p-3 rounded bg-white text-black"
        />

        <textarea
          placeholder="Travel interests"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          className="p-3 rounded bg-white text-black"
        />

        <button
          onClick={handleGenerateTrip}
          className="bg-blue-500 hover:bg-blue-600 p-3 rounded font-semibold"
        >
          {loading ? "Generating..." : "Generate Trip"}
        </button>

      </div>

      {/* INPUT PREVIEW */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold">Current Input</h2>
        <p>Destination: {destination}</p>
        <p>Budget: {budget}</p>
        <p>Interests: {interests}</p>
      </div>

      {/* AI RESULT */}
      {tripResult && (
        <div className="mt-10 p-4 bg-gray-900 rounded">
          <h2 className="text-2xl font-bold mb-4">AI Itinerary</h2>
          <pre className="whitespace-pre-wrap">{tripResult}</pre>
        </div>
      )}

    </main>
  );
}