import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: Request) {
  try {
    const { location, group, vibes } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
Return ONLY valid JSON:

{
  "playlist": ["..."],
  "outfits": ["..."],
  "activities": ["..."],
  "photos": ["..."],
  "itinerary": ["..."]
}

Trip info:
Location: ${location}
Group: ${group}
Vibes: ${vibes.join(", ")}

Make it aesthetic and specific.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    const json = JSON.parse(text.slice(jsonStart, jsonEnd + 1));

    return NextResponse.json(json);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to generate trip" },
      { status: 500 }
    );
  }
}