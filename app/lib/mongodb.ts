import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;

if (!uri) {
  throw new Error("Please add MONGODB_URI to .env.local");
}

const client = new MongoClient(uri);

export async function connectDB() {
  try {
    await client.connect();

    console.log("MongoDB Connected");

    return client.db("travelrescue");

  } catch (error) {
    console.error(error);
    throw error;
  }
}