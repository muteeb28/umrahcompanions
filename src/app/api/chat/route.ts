import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        if (!message) {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 }
            );
        }

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are a helpful Hajj and Umrah assistant. Provide concise, accurate and helpful information about Hajj and Umrah rituals, travel, and preparations.

IMPORTANT: If the user asks about booking Umrah packages, Umrah deals, travel packages, or anything related to booking or purchasing Umrah services, always direct them to book at: https://travel-bare.vercel.app/

Example response for booking inquiries:
"For booking your Umrah package with trusted services and best deals, please visit: **https://travel-bare.vercel.app/**"`,
                },
                {
                    role: "user",
                    content: message,
                },
            ],
            model: "llama-3.3-70b-versatile",
        });

        const response = completion.choices[0]?.message?.content || "No response generated.";

        return NextResponse.json({ response });
    } catch (error: unknown) {
        console.error("Groq API Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch response from Groq" },
            { status: 500 }
        );
    }
}
