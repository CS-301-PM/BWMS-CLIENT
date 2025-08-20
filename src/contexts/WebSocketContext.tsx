import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useToast } from '../hooks/use-toast'
import { useAuth } from './AuthContext'

interface WebSocketMessage {
  type: string
  data: any
  timestamp: string
}

interface WebSocketContextType {
  isConnected: boolean
  messages: WebSocketMessage[]
  sendMessage: (type: string, data: any) => void
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined)

export const useWebSocket = () => {
  const context = useContext(WebSocketContext)
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider')
  }
  return context
}

interface WebSocketProviderProps {
  children: ReactNode
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState<WebSocketMessage[]>([])
  const [reconnectAttempts, setReconnectAttempts] = useState(0)
  const { user } = useAuth()
  const { toast } = useToast()

  const connectWebSocket = () => {
    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws'
    const token = localStorage.getItem('access_token')
    
    if (!token || !user) {
      return
    }

    try {
      const newSocket = new WebSocket(`${wsUrl}?token=${token}`)
      
      newSocket.onopen = () => {
        setIsConnected(true)
        setReconnectAttempts(0)
        console.log('WebSocket connected')
      }

      newSocket.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data)
          setMessages(prev => [...prev.slice(-49), message]) // Keep last 50 messages
          
          // Handle specific message types
          handleWebSocketMessage(message)
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error)
        }
      }

      newSocket.onclose = () => {
        setIsConnected(false)
        console.log('WebSocket disconnected')
        
        // Attempt reconnect with exponential backoff
        if (reconnectAttempts < 5) {
          const delay = Math.pow(2, reconnectAttempts) * 1000
          setTimeout(() => {
            setReconnectAttempts(prev => prev + 1)
            connectWebSocket()
          }, delay)
        }
      }

      newSocket.onerror = (error) => {
        console.error('WebSocket error:', error)
      }

      setSocket(newSocket)
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error)
    }
  }

  const handleWebSocketMessage = (message: WebSocketMessage) => {
    switch (message.type) {
      case 'REQUEST_UPDATE':
        toast({
          title: 'New Request Update',
          description: `Request #${message.data.id} status changed to ${message.data.status}`,
        })
        break
      case 'STOCK_ALERT':
        toast({
          title: 'Stock Alert',
          description: `${message.data.item} is running low (${message.data.quantity} remaining)`,
          variant: 'destructive',
        })
        break
      case 'NEW_REQUEST':
        toast({
          title: 'New Request',
          description: `New stock request from ${message.data.requester}`,
        })
        break
      default:
        console.log('Unknown message type:', message.type)
    }
  }

  const sendMessage = (type: string, data: any) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = {
        type,
        data,
        timestamp: new Date().toISOString(),
      }
      socket.send(JSON.stringify(message))
    }
  }

  useEffect(() => {
    if (user) {
      connectWebSocket()
    } else {
      if (socket) {
        socket.close()
        setSocket(null)
      }
    }

    return () => {
      if (socket) {
        socket.close()
      }
    }
  }, [user])

  const value: WebSocketContextType = {
    isConnected,
    messages,
    sendMessage,
  }

  return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>
}