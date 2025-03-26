import { type NextRequest, NextResponse } from "next/server"
import { analyzePetMood } from "@/lib/models/pet-mood"

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json()

    if (!image) {
      return NextResponse.json({ error: "Image data is required" }, { status: 400 })
    }

    // Call the mood analysis function
    const result = await analyzePetMood(image)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error analyzing mood:", error)
    return NextResponse.json({ error: "Failed to analyze pet mood" }, { status: 500 })
  }
}

