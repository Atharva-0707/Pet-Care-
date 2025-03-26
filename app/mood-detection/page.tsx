"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Camera, Loader2 } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { useToast } from "@/components/ui/use-toast"

type MoodResult = {
  mood: "Happy" | "Sad" | "Anxious" | "Playful" | "Neutral"
  confidence: number
  description: string
  emoji: string
}

const moodDescriptions = {
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

export default function MoodDetectionPage() {
  const [image, setImage] = useState<string | null>(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<MoodResult | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isMobile = useMobile()
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
        setResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraCapture = async () => {
    try {
      if (isCapturing) {
        // Stop capturing
        if (videoRef.current && videoRef.current.srcObject) {
          const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
          tracks.forEach((track) => track.stop())
          videoRef.current.srcObject = null
        }
        setIsCapturing(false)
        return
      }

      // Start capturing
      setIsCapturing(true)
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      toast({
        title: "Camera Error",
        description: "Could not access your camera. Please check permissions.",
        variant: "destructive",
      })
      setIsCapturing(false)
    }
  }

  const takePicture = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas")
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
        const dataUrl = canvas.toDataURL("image/jpeg")
        setImage(dataUrl)
        setResult(null)

        // Stop the camera stream
        if (videoRef.current.srcObject) {
          const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
          tracks.forEach((track) => track.stop())
          videoRef.current.srcObject = null
        }
        setIsCapturing(false)
      }
    }
  }

  const analyzeMood = () => {
    if (!image) return

    setIsAnalyzing(true)

    // Simulate AI analysis with a timeout
    setTimeout(() => {
      // For demo purposes, we'll randomly select a mood
      const moods: Array<MoodResult["mood"]> = ["Happy", "Sad", "Anxious", "Playful", "Neutral"]
      const randomMood = moods[Math.floor(Math.random() * moods.length)]
      const confidence = Math.floor(Math.random() * 30) + 70 // Random confidence between 70-99%

      setResult({
        mood: randomMood,
        confidence,
        description: moodDescriptions[randomMood].description,
        emoji: moodDescriptions[randomMood].emoji,
      })

      setIsAnalyzing(false)
    }, 2000)

    // In a real application, you would send the image to your AI model API
    // const response = await fetch('/api/analyze-mood', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ image }),
    // });
    // const data = await response.json();
    // setResult(data);
    // setIsAnalyzing(false);
  }

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Pet Mood Detection</h1>
          <p className="text-muted-foreground mt-2">Upload a photo of your pet and our AI will analyze their mood</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Upload Pet Photo</CardTitle>
              <CardDescription>Choose a clear photo of your pet's face for the best results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isCapturing ? (
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                  <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                  <Button
                    onClick={takePicture}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                    size="sm"
                  >
                    Take Photo
                  </Button>
                </div>
              ) : image ? (
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                  <Image src={image || "/placeholder.svg"} alt="Pet photo" fill className="object-contain" />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground mb-1">Drag and drop your image here or click to browse</p>
                  <p className="text-xs text-muted-foreground">Supports JPG, PNG, WEBP</p>
                </div>
              )}

              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            </CardContent>
            <CardFooter className="flex flex-col gap-2 sm:flex-row">
              <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full">
                <Upload className="mr-2 h-4 w-4" /> Upload Photo
              </Button>
              {isMobile && (
                <Button
                  onClick={handleCameraCapture}
                  variant={isCapturing ? "destructive" : "outline"}
                  className="w-full"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  {isCapturing ? "Stop Camera" : "Use Camera"}
                </Button>
              )}
              {image && (
                <Button onClick={analyzeMood} className="w-full" disabled={isAnalyzing}>
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing
                    </>
                  ) : (
                    "Analyze Mood"
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>

          <Card className={cn(result ? "" : "bg-muted/50")}>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>Our AI will determine your pet's emotional state</CardDescription>
            </CardHeader>
            <CardContent className="min-h-[200px] flex items-center justify-center">
              {isAnalyzing ? (
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                  <p>Analyzing your pet's mood...</p>
                </div>
              ) : result ? (
                <div className="text-center space-y-4">
                  <div className="text-6xl">{result.emoji}</div>
                  <h3 className="text-2xl font-bold">{result.mood}</h3>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${result.confidence}%` }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground">Confidence: {result.confidence}%</p>
                  <p>{result.description}</p>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <p>Upload a photo and click "Analyze Mood" to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

