import Link from "next/link"
import { PawPrintIcon as Paw } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Paw className="h-5 w-5 text-blue-600" />
              <span className="text-lg font-bold">PetCare AI</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI-powered solutions for better pet care and community connections.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/mood-detection" className="text-sm text-muted-foreground hover:text-primary">
                  Pet Mood Detection
                </Link>
              </li>
              <li>
                <Link href="/vets" className="text-sm text-muted-foreground hover:text-primary">
                  Find Veterinarians
                </Link>
              </li>
              <li>
                <Link href="/caretakers" className="text-sm text-muted-foreground hover:text-primary">
                  Hire Caretakers
                </Link>
              </li>
              <li>
                <Link href="/trainers" className="text-sm text-muted-foreground hover:text-primary">
                  Dog Trainers
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-sm text-muted-foreground hover:text-primary">
                  Community Events
                </Link>
              </li>
              <li>
                <Link href="/ai-chat" className="text-sm text-muted-foreground hover:text-primary">
                  AI Pet Advice
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-muted-foreground hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-muted-foreground hover:text-primary">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t pt-6">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PetCare AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

