"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building2 } from "lucide-react"

export default function LandingPage({ onNavigateToAuth }: { onNavigateToAuth: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-2xl">
        <CardContent className="p-12 text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Building2 className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Central Stores</h1>
            <p className="text-xl text-gray-600">Management System</p>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Streamline your inventory management with our comprehensive central stores system. Track stock, manage
              requests, and maintain complete audit trails with blockchain integration.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={onNavigateToAuth}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
