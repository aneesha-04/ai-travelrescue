export async function generateTripPlan(prompt: string) {
  try {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error || "Failed to generate trip plan");
    }

    return data.text;
  } catch (error: any) {
    console.error("Frontend Error:", error);
    return "Something went wrong. Please try again.";
  }
}