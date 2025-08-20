"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, Clock, Globe, Palette, Sliders } from "lucide-react"

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Settings className="w-6 h-6" />
        <h2 className="text-2xl font-bold">Settings</h2>
      </div>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Clock className="w-4 h-4" />
              Set Time/Date
            </Button>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Globe className="w-4 h-4" />
              Set Language
            </Button>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Palette className="w-4 h-4" />
              Theme
            </Button>
          </div>

          <div className="flex gap-4 mt-6">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Sliders className="w-4 h-4" />
              Configure System Behaviour
            </Button>
            <div className="w-32 h-10 bg-muted rounded border-2 border-dashed border-muted-foreground/25"></div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="h-20 bg-muted rounded border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
              <span className="text-sm text-muted-foreground">Chart 1</span>
            </div>
            <div className="h-20 bg-muted rounded border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
              <span className="text-sm text-muted-foreground">Chart 2</span>
            </div>
            <div className="h-20 bg-muted rounded border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
              <span className="text-sm text-muted-foreground">Chart 3</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="h-20 bg-muted rounded border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
              <span className="text-sm text-muted-foreground">Chart 4</span>
            </div>
            <div className="h-20 bg-muted rounded border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
              <span className="text-sm text-muted-foreground">Chart 5</span>
            </div>
            <Button variant="outline" className="h-20 bg-transparent">
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
