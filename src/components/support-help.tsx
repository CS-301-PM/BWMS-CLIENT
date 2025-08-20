"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { HelpCircle, MessageCircle, Phone, BookOpen, LogOut, Plus, Send, Mic } from "lucide-react"

interface ChatMessage {
  id: string
  text: string
  isUser: boolean
  timestamp: string
}

export function SupportHelp() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Hello! How can I help you with the Central Stores Management System today?",
      isUser: false,
      timestamp: "10:30",
    },
    {
      id: "2",
      text: "I need help with stock approval process",
      isUser: true,
      timestamp: "10:31",
    },
    {
      id: "3",
      text: "I can help you with that! The stock approval process involves submitting a request through the system, which then goes to your manager for approval.",
      isUser: false,
      timestamp: "10:31",
    },
    {
      id: "4",
      text: "How do I track my request status?",
      isUser: true,
      timestamp: "10:32",
    },
  ])

  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        text: newMessage,
        isUser: true,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, userMessage])
      setNewMessage("")

      // Simulate bot response
      setTimeout(() => {
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: "Thank you for your question. Let me help you with that...",
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        setMessages((prev) => [...prev, botMessage])
      }, 1000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <HelpCircle className="w-6 h-6" />
        <h2 className="text-2xl font-bold">Support</h2>
      </div>

      {/* Chatbot Section */}
      <Card className="h-96">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Consult Chatbot
          </CardTitle>
          <p className="text-sm text-muted-foreground">Commonly asked questions</p>
        </CardHeader>
        <CardContent className="flex flex-col h-full">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground border"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="flex items-center gap-2 border-t pt-4">
            <Button size="sm" variant="outline" className="shrink-0 bg-transparent">
              <Plus className="w-4 h-4" />
            </Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button size="sm" variant="outline" className="shrink-0 bg-transparent">
              <Mic className="w-4 h-4" />
            </Button>
            <Button size="sm" onClick={handleSendMessage} className="shrink-0">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Support Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <Button className="w-full flex items-center gap-2 h-12">
              <Phone className="w-5 h-5" />
              Contact Support
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Button variant="outline" className="w-full flex items-center gap-2 h-12 bg-transparent">
              <BookOpen className="w-5 h-5" />
              User Guide / FAQ
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Button variant="destructive" className="w-full flex items-center gap-2 h-12">
              <LogOut className="w-5 h-5" />
              Log Out
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Help Topics */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Help Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
              <div className="text-left">
                <div className="font-medium">How to submit a stock request?</div>
                <div className="text-sm text-muted-foreground">Learn the step-by-step process</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
              <div className="text-left">
                <div className="font-medium">Understanding approval workflow</div>
                <div className="text-sm text-muted-foreground">Manager approval process explained</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
              <div className="text-left">
                <div className="font-medium">Blockchain audit trail</div>
                <div className="text-sm text-muted-foreground">How to view transaction history</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
              <div className="text-left">
                <div className="font-medium">User permissions and roles</div>
                <div className="text-sm text-muted-foreground">Understanding access levels</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
