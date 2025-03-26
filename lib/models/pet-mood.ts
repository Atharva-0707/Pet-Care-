// This file would contain the model for pet mood detection
// In a real application, this would interface with a machine learning model

export type MoodType = "Happy" | "Sad" | "Anxious" | "Playful" | "Neutral"

export interface MoodResult {
  mood: MoodType
  confidence: number
  description: string
  emoji: string
}

export const moodDescriptions: Record<MoodType, { description: string; emoji: string }> = {
  Happy: {
    description: "Your pet is feeling joyful and content. They're in a great mood!",
    emoji: "😊",
  },
  Sad: {
    description: "Your pet seems a bit down. They might need some extra attention and care.",
    emoji: "😢",
  },
  Anxious: {
    description: "Your pet appears to be feeling nervous or stressed. Try to create a calm environment.",
    emoji: "😰",
  },
  Playful: {
    description: "Your pet is feeling energetic and ready for fun activities!",
    emoji: "🎮",
  },
  Neutral: {
    description: "Your pet is in a balanced, calm state. They're neither excited nor upset.",
    emoji: "😐",
  },
}

// Mock function to analyze pet mood from an image
// In a real application, this would call a machine learning model API
export async function analyzePetMood(imageData: string): Promise<MoodResult> {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // For demo purposes, return a random mood
  const moods: MoodType[] = ["Happy", "Sad", "Anxious", "Playful", "Neutral"]
  const randomMood = moods[Math.floor(Math.random() * moods.length)]
  const confidence = Math.floor(Math.random() * 30) + 70 // Random confidence between 70-99%

  return {
    mood: randomMood,
    confidence,
    description: moodDescriptions[randomMood].description,
    emoji: moodDescriptions[randomMood].emoji,
  }
}

