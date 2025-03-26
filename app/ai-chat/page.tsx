"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your AI pet care assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response with a timeout
    setTimeout(() => {
      const petCareResponses = [
        "Based on what you've described, your pet might be experiencing seasonal allergies. Try to keep your home clean and consider talking to your vet about antihistamines suitable for pets.",
        "Regular exercise is crucial for your pet's physical and mental health. For dogs, aim for at least 30 minutes of activity twice a day, adjusted based on their breed, age, and health condition.",
        "A balanced diet is essential for your pet's health. Make sure they're getting the right nutrients, and avoid feeding them human food that could be harmful.",
        "Grooming is not just about keeping your pet looking good—it's also important for their health. Regular brushing helps distribute natural oils and prevents matting.",
        "Socialization is important for pets, especially during their early development stages. It helps them become well-adjusted and confident around other animals and people.",
        "Dental care is often overlooked but is crucial for your pet's overall health. Regular brushing and dental check-ups can prevent serious health issues.",
        "Training should be consistent and positive. Reward-based methods are most effective and strengthen the bond between you and your pet.",
        "Regular vet check-ups are essential, even if your pet seems healthy. Preventative care can catch issues before they become serious problems.",
      ]

      const aiResponse: Message = {
        id: Date.now().toString(),
        content: petCareResponses[Math.floor(Math.random() * petCareResponses.length)],
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)

    // In a real application, you would call your AI API here
    // const response = await fetch('/api/chat', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ message: input }),
    // });
    // const data = await response.json();
    // setMessages((prev) => [...prev, { id: Date.now().toString(), content: data.message, role: 'assistant', timestamp: new Date() }]);
    // setIsLoading(false);
  }

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">AI Pet Care Assistant</h1>
          <p className="text-muted-foreground mt-2">Get instant answers to your pet care questions</p>
        </div>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Chat with our AI</CardTitle>
            <CardDescription>Ask about pet health, training, nutrition, and more</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[500px] overflow-y-auto p-1">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex gap-3 text-sm", message.role === "user" ? "flex-row-reverse" : "")}
                >
                  <Avatar className={cn("h-8 w-8", message.role === "user" ? "bg-blue-600" : "bg-muted")}>
                    <AvatarFallback>{message.role === "user" ? "U" : "AI"}</AvatarFallback>
                    {message.role === "assistant" && (
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
                    )}
                  </Avatar>
                  <div
                    className={cn(
                      "rounded-lg px-3 py-2 max-w-[80%]",
                      message.role === "user" ? "bg-blue-600 text-white" : "bg-muted",
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 text-sm">
                  <Avatar className="h-8 w-8 bg-muted">
                    <AvatarFallback>AI</AvatarFallback>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
                  </Avatar>
                  <div className="rounded-lg px-3 py-2 bg-muted flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="ml-2">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter>
            <form onSubmit={handleSend} className="flex w-full gap-2">
              <Input
                placeholder="Type your question here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

