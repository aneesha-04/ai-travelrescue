"use client";

import { useState } from "react";
import { generateTripPlan } from "./lib/gemini";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [tripResult, setTripResult] = useState("");

  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [interests, setInterests] = useState("");
  const [issue, setIssue] = useState("");

  const emergencyOptions = [
    "Flight Cancelled",
    "Train Delayed",
    "Lost Hotel Booking",
    "Weather Emergency",
    "Budget Crisis",
  ];

  const handleGenerateTrip = async () => {
    if (!destination || !budget || !interests || !issue) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const prompt = `
You are TravelRescue AI, an autonomous travel recovery assistant.

Traveler Details:
Destination: ${destination}
Budget: ${budget}
Interests: ${interests}

Travel Problem:
${issue}

Your Tasks:
1. Analyze the travel issue
2. Suggest recovery solutions
3. Create an updated itinerary
4. Recommend budget-friendly alternatives
5. Give emergency travel tips

Format the response in sections:
- Problem Analysis
- Recovery Steps
- Updated Itinerary
- Budget Tips
- Emergency Advice
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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 text-gray-900 p-8">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">

          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            TravelRescue AI
          </h1>

          <p className="mt-5 text-lg text-gray-600 max-w-3xl mx-auto">
            Autonomous AI travel recovery assistant for delays,
            cancellations, lost bookings, and travel disruptions.
          </p>

        </div>

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* INPUT CARD */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">

            <h2 className="text-3xl font-bold mb-6 text-blue-600">
              Travel Mission Input
            </h2>

            <div className="flex flex-col gap-5">

              <input
                type="text"
                placeholder="Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="text"
                placeholder="Budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <textarea
                placeholder="Travel interests"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                className="p-4 rounded-xl border border-gray-300 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              {/* QUICK ACTION BUTTONS */}
              <div>
                <p className="font-semibold mb-3 text-gray-600">
                  Quick Emergency Modes
                </p>

                <div className="flex flex-wrap gap-3">

                  {emergencyOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setIssue(option)}
                      className="px-4 py-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium transition-all"
                    >
                      {option}
                    </button>
                  ))}

                </div>
              </div>

              <textarea
                placeholder="Describe your travel issue"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                className="p-4 rounded-xl border border-gray-300 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button
                onClick={handleGenerateTrip}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] transition-all text-white p-4 rounded-xl font-bold text-lg shadow-md"
              >
                {loading
                  ? "TravelRescue AI analyzing mission..."
                  : "Generate Recovery Plan"}
              </button>

            </div>
          </div>

          {/* PREVIEW CARD */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">

            <h2 className="text-3xl font-bold mb-6 text-cyan-600">
              Mission Preview
            </h2>

            <div className="space-y-6">

              <div>
                <p className="font-semibold text-gray-500">Destination</p>
                <p className="text-lg">{destination || "Not provided"}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-500">Budget</p>
                <p className="text-lg">{budget || "Not provided"}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-500">Interests</p>
                <p className="text-lg">{interests || "Not provided"}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-500">Travel Issue</p>
                <p className="text-lg">{issue || "Not provided"}</p>
              </div>

            </div>

          </div>

        </div>

        {/* LOADING UI */}
        {loading && (
          <div className="mt-10 bg-white rounded-3xl p-8 shadow-lg border border-gray-200 text-center">

            <div className="w-16 h-16 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin mx-auto"></div>

            <p className="mt-5 text-lg font-semibold text-blue-600">
              AI Agent is planning your recovery workflow...
            </p>

          </div>
        )}

        {/* RESULT */}
        {tripResult && !loading && (
          <div className="mt-10 bg-white rounded-3xl p-8 shadow-lg border border-gray-200">

            <h2 className="text-4xl font-bold mb-8 text-blue-600">
              AI Recovery Plan
            </h2>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">

              <pre className="whitespace-pre-wrap text-gray-700 leading-8 text-[15px]">
                {tripResult}
              </pre>

            </div>

          </div>
        )}

      </div>

    </main>
  );
}