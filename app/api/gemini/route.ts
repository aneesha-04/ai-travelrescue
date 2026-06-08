import { connectDB } from "@/app/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const db = await connectDB();

    console.log("Database Connected Successfully");

    await new Promise((resolve) => setTimeout(resolve, 2500));

    const mockResponse = `
PROBLEM ANALYSIS
Your flight cancellation has disrupted the original travel itinerary.

RECOVERY STEPS
1. Rebook your flight
2. Contact hotel support
3. Use local transport

UPDATED ITINERARY
Day 1:
Arrival and beach visit

BUDGET TIPS
Use local cafes and public transport.

EMERGENCY ADVICE
Keep backup copies of tickets.
`;

    return Response.json({
      text: mockResponse,
    });

  } catch (error: any) {
    console.error(error);

    return Response.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}