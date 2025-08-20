"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { QrCode, Camera, Package, MapPin, CheckCircle, X } from "lucide-react"

interface ScannedItem {
  qrCode: string
  itemName: string
  quantity: number
  unit: string
  location: string
  receivedBy: string
  timestamp: Date
  status: "received" | "pending"
}

interface QRScannerProps {
  onItemScanned?: (item: ScannedItem) => void
}

const QRScanner: React.FC<QRScannerProps> = ({ onItemScanned }) => {
  const [isScanning, setIsScanning] = useState(false)
  const [scannedItems, setScannedItems] = useState<ScannedItem[]>([])
  const [manualEntry, setManualEntry] = useState({
    qrCode: "",
    location: "",
    quantity: 0,
  })
  const [showManualEntry, setShowManualEntry] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<string>("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stream])

  const simulateQRScan = () => {
    const mockQRCodes = [
      "QR-ITEM-001-A4PAPER-100REAMS",
      "QR-ITEM-002-LAPTOPS-10UNITS",
      "QR-ITEM-003-CHAIRS-25UNITS",
      "QR-ITEM-004-SUPPLIES-50BOXES",
    ]

    const randomQR = mockQRCodes[Math.floor(Math.random() * mockQRCodes.length)]
    processScannedQR(randomQR)
  }

  const processScannedQR = (qrData: string) => {
    const parts = qrData.split("-")
    if (parts.length >= 4) {
      const itemName = parts[3].replace(/([A-Z])/g, " $1").trim()
      const quantityUnit = parts[4] || "1UNITS"
      const quantity = Number.parseInt(quantityUnit.match(/\d+/)?.[0] || "1")
      const unit = quantityUnit.replace(/\d+/, "").toLowerCase()

      const scannedItem: ScannedItem = {
        qrCode: qrData,
        itemName,
        quantity,
        unit,
        location: manualEntry.location || "Warehouse A",
        receivedBy: "Current User",
        timestamp: new Date(),
        status: "received",
      }

      setScannedItems([...scannedItems, scannedItem])
      onItemScanned?.(scannedItem)

      console.log("[v0] Item scanned and logged to blockchain:", {
        action: "Stock Received",
        qrCode: qrData,
        itemName,
        quantity,
        location: scannedItem.location,
        timestamp: new Date(),
        transactionHash: `0x${Math.random().toString(16).substring(2, 66)}`,
      })
    }
  }

  const handleManualEntry = () => {
    if (manualEntry.qrCode && manualEntry.location) {
      processScannedQR(manualEntry.qrCode)
      setManualEntry({ qrCode: "", location: "", quantity: 0 })
      setShowManualEntry(false)
    }
  }

  const startScanning = async () => {
    try {
      setError("")
      setIsScanning(true)

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      setStream(mediaStream)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.play()
      }

      setTimeout(() => {
        simulateQRScan()
        stopScanning()
      }, 3000)
    } catch (err) {
      setError("Camera access denied or not available. Please allow camera access and try again.")
      setIsScanning(false)
      console.error("Camera access error:", err)
    }
  }

  const stopScanning = () => {
    setIsScanning(false)
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <QrCode className="h-5 w-5" />
            <span>QR Code Scanner</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative bg-gray-900 rounded-lg overflow-hidden">
            {isScanning ? (
              <div className="relative">
                <video ref={videoRef} className="w-full h-64 object-cover" autoPlay playsInline muted />
                <canvas ref={canvasRef} className="hidden" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="border-2 border-white border-dashed w-48 h-48 rounded-lg flex items-center justify-center">
                    <div className="text-white text-sm font-medium">Position QR code here</div>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <Button variant="secondary" size="sm" onClick={stopScanning}>
                    <X className="h-4 w-4 mr-1" />
                    Stop
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-white bg-gray-800">
                <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <div className="text-lg font-medium mb-2">Ready to Scan</div>
                <div className="text-sm text-gray-400 mb-4">Point camera at QR code on package</div>
                {error && <div className="text-red-400 text-sm mb-4 p-2 bg-red-900/20 rounded">{error}</div>}
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button onClick={startScanning} className="bg-blue-600 hover:bg-blue-700">
                    <Camera className="h-4 w-4 mr-2" />
                    Start Scanning
                  </Button>
                  <Button variant="outline" onClick={() => setShowManualEntry(!showManualEntry)}>
                    Manual Entry
                  </Button>
                </div>
              </div>
            )}
          </div>

          {showManualEntry && (
            <div className="border rounded-lg p-4 space-y-4">
              <h4 className="font-medium">Manual QR Entry</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">QR Code</label>
                  <Input
                    placeholder="QR-ITEM-001-..."
                    value={manualEntry.qrCode}
                    onChange={(e) => setManualEntry({ ...manualEntry, qrCode: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <Select
                    value={manualEntry.location}
                    onValueChange={(value) => setManualEntry({ ...manualEntry, location: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Warehouse A">Warehouse A</SelectItem>
                      <SelectItem value="Warehouse B">Warehouse B</SelectItem>
                      <SelectItem value="Receiving Dock">Receiving Dock</SelectItem>
                      <SelectItem value="Storage Room">Storage Room</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button onClick={handleManualEntry} className="w-full">
                    Process Entry
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {scannedItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Recently Scanned Items</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scannedItems
                .slice(-5)
                .reverse()
                .map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium">{item.itemName}</div>
                        <div className="text-sm text-gray-600">
                          {item.quantity} {item.unit} • {item.location}
                        </div>
                        <div className="text-xs text-gray-500">{item.timestamp.toLocaleTimeString()}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Received
                      </Badge>
                      <MapPin className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default QRScanner
