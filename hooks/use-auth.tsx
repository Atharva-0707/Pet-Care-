"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string | null
  email: string
  image: string | null
}

type AuthContextType = {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate a successful login
      const mockUser: User = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        name: email.split("@")[0],
        email,
        image: null,
      }

      // Store user in localStorage (in a real app, you'd use cookies or JWT)
      localStorage.setItem("user", JSON.stringify(mockUser))
      setUser(mockUser)
      router.push("/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (name: string, email: string, password: string) => {
    setLoading(true)
    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate a successful registration
      const mockUser: User = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        name,
        email,
        image: null,
      }

      // Store user in localStorage (in a real app, you'd use cookies or JWT)
      localStorage.setItem("user", JSON.stringify(mockUser))
      setUser(mockUser)
      router.push("/dashboard")
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, signIn, signUp, signOut, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

