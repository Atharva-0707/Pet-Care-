import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // In a real application, you would use the AI SDK to generate a response
    // For demo purposes, we'll use a mock response

    // Uncomment this code when you have OpenAI API key set up
    // const { text } = await generateText({
    //   model: openai("gpt-4o"),
    //   prompt: message,
    //   system: "You are a helpful pet care assistant. Provide accurate, concise advice about pet health, training, nutrition, and behavior. If you're unsure about something, acknowledge it and suggest consulting a veterinarian.",
    // });

    // Mock response for demo
    const petCareResponses = [
      "Based on what you've described, your pet might be experiencing seasonal allergies. Try to keep your home clean and consider talking to your vet about antihistamines suitable for pets.",
      "Regular exercise is crucial for your pet's physical and mental health. For dogs, aim for at least 30 minutes of activity twice a day, adjusted based on their breed, age, and health condition.",
      "A balanced diet is essential for your pet's health. Make sure they're getting the right nutrients, and avoid feeding them human food that could be harmful.",
      "Grooming is not just about keeping your pet looking good—it's also important for their health. Regular brushing helps distribute natural oils and prevents matting.",
      "Socialization is important for pets, especially during their early development stages. It helps them become well-adjusted and confident around other animals and people.",
    ]

    const randomResponse = petCareResponses[Math.floor(Math.random() * petCareResponses.length)]

    return NextResponse.json({ message: randomResponse })
  } catch (error) {
    console.error("Error generating chat response:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}

