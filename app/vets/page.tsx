"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Star, Search, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

type Vet = {
  id: string
  name: string
  address: string
  phone: string
  rating: number
  distance: number
  specialties: string[]
}

// Mock data for veterinarians
const mockVets: Vet[] = [
  {
    id: "vet1",
    name: "Pawsome Pet Clinic",
    address: "123 Main St, Anytown, USA",
    phone: "(555) 123-4567",
    rating: 4.8,
    distance: 0.8,
    specialties: ["General Care", "Surgery", "Dental"],
  },
  {
    id: "vet2",
    name: "Happy Tails Veterinary",
    address: "456 Oak Ave, Anytown, USA",
    phone: "(555) 987-6543",
    rating: 4.6,
    distance: 1.2,
    specialties: ["General Care", "Dermatology", "Nutrition"],
  },
  {
    id: "vet3",
    name: "Furry Friends Animal Hospital",
    address: "789 Pine Rd, Anytown, USA",
    phone: "(555) 456-7890",
    rating: 4.9,
    distance: 2.5,
    specialties: ["Emergency Care", "Cardiology", "Oncology"],
  },
  {
    id: "vet4",
    name: "Whiskers & Paws Clinic",
    address: "321 Elm St, Anytown, USA",
    phone: "(555) 234-5678",
    rating: 4.7,
    distance: 3.1,
    specialties: ["General Care", "Behavior", "Geriatric Care"],
  },
  {
    id: "vet5",
    name: "Healthy Pets Veterinary",
    address: "654 Maple Dr, Anytown, USA",
    phone: "(555) 876-5432",
    rating: 4.5,
    distance: 3.8,
    specialties: ["General Care", "Exotic Pets", "Rehabilitation"],
  },
]

export default function VetsPage() {
  const [vets, setVets] = useState<Vet[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [location, setLocation] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate fetching vets data
    const timer = setTimeout(() => {
      setVets(mockVets)
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) {
      setVets(mockVets)
      return
    }

    const filtered = mockVets.filter(
      (vet) =>
        vet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vet.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vet.specialties.some((specialty) => specialty.toLowerCase().includes(searchQuery.toLowerCase())),
    )

    setVets(filtered)
  }

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would use these coordinates to fetch nearby vets
          // For demo purposes, we'll just show a success message
          setLocation("Current location")
          setVets(mockVets.sort((a, b) => a.distance - b.distance))
          setIsLoading(false)

          toast({
            title: "Location detected",
            description: "Showing veterinarians near your current location.",
          })
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsLoading(false)

          toast({
            title: "Location error",
            description: "Could not access your location. Please try again or search manually.",
            variant: "destructive",
          })
        },
      )
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Your browser does not support geolocation. Please search manually.",
        variant: "destructive",
      })
    }
  }

  const renderRatingStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-4 w-4 text-yellow-400" />
          <div className="absolute inset-0 overflow-hidden w-[50%]">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>,
      )
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-yellow-400" />)
    }

    return <div className="flex">{stars}</div>
  }

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Find Veterinarians Near You</h1>
          <p className="text-muted-foreground mt-2">
            Locate trusted veterinarians in your area for your pet's healthcare needs
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search Veterinarians</CardTitle>
            <CardDescription>Find vets by name, location, or specialty</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name, location, or specialty..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit">Search</Button>
              <Button type="button" variant="outline" onClick={handleGetLocation}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Locating
                  </>
                ) : (
                  <>
                    <MapPin className="mr-2 h-4 w-4" /> Near Me
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {location && (
          <div className="flex items-center gap-2 mb-4 text-sm">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span>Showing results near: {location}</span>
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
            <p>Finding veterinarians near you...</p>
          </div>
        ) : vets.length > 0 ? (
          <div className="space-y-4">
            {vets.map((vet) => (
              <Card key={vet.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">{vet.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{vet.address}</span>
                        <span className="ml-1">({vet.distance} miles away)</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{vet.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {renderRatingStars(vet.rating)}
                        <span className="text-sm font-medium">{vet.rating.toFixed(1)}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {vet.specialties.map((specialty) => (
                          <span
                            key={specialty}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full dark:bg-blue-900 dark:text-blue-300"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm">Contact</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No veterinarians found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

