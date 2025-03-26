"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PawPrintIcon as Paw, MapPin, Users, Calendar, MessageSquare, Brain, ArrowRight } from "lucide-react"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Welcome, {user.name}</h1>
        <p className="text-muted-foreground mt-2">Manage your pet care activities and explore our features</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pet Mood Detection</CardTitle>
            <CardDescription>Analyze your pet's emotional state with AI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900">
                <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <Link href="/mood-detection">
                <Button variant="ghost" size="sm" className="gap-1">
                  Try it <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Find Veterinarians</CardTitle>
            <CardDescription>Locate trusted vets in your area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900">
                <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <Link href="/vets">
                <Button variant="ghost" size="sm" className="gap-1">
                  Explore <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Hire Caretakers</CardTitle>
            <CardDescription>Find trusted pet sitters for your furry friends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900">
                <Paw className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <Link href="/caretakers">
                <Button variant="ghost" size="sm" className="gap-1">
                  Browse <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Dog Trainers</CardTitle>
            <CardDescription>Connect with professional dog trainers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900">
                <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <Link href="/trainers">
                <Button variant="ghost" size="sm" className="gap-1">
                  Find <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Community Events</CardTitle>
            <CardDescription>Join pet-friendly events in your area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900">
                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <Link href="/events">
                <Button variant="ghost" size="sm" className="gap-1">
                  View <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">AI Pet Advice</CardTitle>
            <CardDescription>Get instant answers to your pet care questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <Link href="/ai-chat">
                <Button variant="ghost" size="sm" className="gap-1">
                  Chat <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

