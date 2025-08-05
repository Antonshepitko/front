"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, Music, DollarSign, CreditCard, Wallet, ArrowLeft, Volume2, Star, Info } from "lucide-react"

export default function DonatePage() {
  const [amount, setAmount] = useState("")
  const [customAmount, setCustomAmount] = useState("")
  const [currency, setCurrency] = useState("USD")
  const [message, setMessage] = useState("")
  const [trackRequest, setTrackRequest] = useState("")
  const [trackUrl, setTrackUrl] = useState("")
  const [senderName, setSenderName] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [showTrackRequest, setShowTrackRequest] = useState(false)

  const quickAmounts = [5, 10, 25, 50, 100, 200]
  const TRACK_REQUEST_MINIMUM = 20 // Минимальная сумма для запроса трека

  // Проверяем, достигнута ли минимальная сумма для запроса трека
  useEffect(() => {
    const currentAmount = Number.parseFloat(amount || customAmount || "0")
    setShowTrackRequest(currentAmount >= TRACK_REQUEST_MINIMUM)

    // Очищаем поля трека если сумма меньше минимума
    if (currentAmount < TRACK_REQUEST_MINIMUM) {
      setTrackRequest("")
      setTrackUrl("")
    }
  }, [amount, customAmount])

  const recentDonations = [
    { sender: "Alex_Gaming", amount: 25, message: "Keep up the great work!", time: "2 min ago", hasTrack: true },
    { sender: "StreamFan123", amount: 50, message: "Love your content! 💜", time: "5 min ago", hasTrack: false },
    { sender: "MusicLover", amount: 35, message: "Can you play some jazz?", time: "8 min ago", hasTrack: true },
  ]

  const getCurrentAmount = () => {
    return Number.parseFloat(amount || customAmount || "0")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-800/30 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-purple-300 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to stream
            </Link>
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10 border-2 border-purple-500">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-purple-600 text-white">ST</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-lg font-bold text-white">StreamerName</h1>
                <div className="flex items-center text-sm text-purple-300">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                  Live • 1,234 viewers
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Donation Form */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-purple-800/30 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center text-2xl">
                  <Heart className="mr-3 h-7 w-7 text-purple-400" />
                  Support StreamerName
                </CardTitle>
                <CardDescription className="text-purple-300 text-base">
                  Show your support and send a message to the streamer
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Sender Name */}
                {!isAnonymous && (
                  <div>
                    <Label htmlFor="senderName" className="text-purple-300 text-base font-medium">
                      Your Name
                    </Label>
                    <Input
                      id="senderName"
                      placeholder="Enter your name"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="mt-2 bg-slate-700/50 border-purple-800/30 text-white placeholder:text-purple-400"
                    />
                  </div>
                )}

                {/* Amount Selection */}
                <div>
                  <Label className="text-purple-300 text-base font-medium">Donation Amount</Label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-3">
                    {quickAmounts.map((quickAmount) => (
                      <Button
                        key={quickAmount}
                        variant={amount === quickAmount.toString() ? "default" : "outline"}
                        className={`relative ${
                          amount === quickAmount.toString()
                            ? "bg-purple-600 hover:bg-purple-700 text-white border-purple-500"
                            : "border-purple-800/30 bg-slate-700/30 text-purple-300 hover:bg-purple-600/20 hover:text-white hover:border-purple-600/50"
                        } transition-all duration-200`}
                        onClick={() => {
                          setAmount(quickAmount.toString())
                          setCustomAmount("")
                        }}
                      >
                        ${quickAmount}
                        {quickAmount >= TRACK_REQUEST_MINIMUM && (
                          <Music className="absolute -top-1 -right-1 h-3 w-3 text-purple-400" />
                        )}
                      </Button>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2 mt-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Custom amount"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value)
                          setAmount("")
                        }}
                        className="bg-slate-700/50 border-purple-800/30 text-white placeholder:text-purple-400"
                      />
                    </div>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger className="w-24 bg-slate-700/50 border-purple-800/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-purple-800/30">
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="RUB">RUB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Track Request Info */}
                  <Alert className="mt-4 bg-purple-900/30 border-purple-700/50">
                    <Info className="h-4 w-4 text-purple-400" />
                    <AlertDescription className="text-purple-200">
                      {getCurrentAmount() >= TRACK_REQUEST_MINIMUM
                        ? `🎵 Track requests are available! You can request a song.`
                        : `🎵 Track requests available from $${TRACK_REQUEST_MINIMUM}. Current: $${getCurrentAmount()}`}
                    </AlertDescription>
                  </Alert>
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message" className="text-purple-300 text-base font-medium">
                    Message (Optional)
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Leave a message for the streamer..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={500}
                    className="mt-2 bg-slate-700/50 border-purple-800/30 text-white placeholder:text-purple-400 min-h-[120px] resize-none"
                  />
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-purple-400">{message.length}/500 characters</p>
                    {message.length > 450 && <p className="text-xs text-yellow-400">Almost at limit!</p>}
                  </div>
                </div>

                {/* Track Request - Only shown if amount >= minimum */}
                {showTrackRequest && (
                  <div className="space-y-4 p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg border border-purple-700/30">
                    <div className="flex items-center space-x-2">
                      <Music className="h-5 w-5 text-purple-400" />
                      <Label className="text-purple-300 text-base font-medium">Request a Track</Label>
                      <Badge className="bg-purple-600 text-white text-xs">Available</Badge>
                    </div>

                    <div>
                      <Label htmlFor="track" className="text-purple-300 text-sm">
                        Song Name & Artist
                      </Label>
                      <Input
                        id="track"
                        placeholder="e.g., Bohemian Rhapsody - Queen"
                        value={trackRequest}
                        onChange={(e) => setTrackRequest(e.target.value)}
                        className="mt-1 bg-slate-700/50 border-purple-800/30 text-white placeholder:text-purple-400"
                      />
                    </div>

                    <div>
                      <Label htmlFor="trackUrl" className="text-purple-300 text-sm">
                        Track URL (Optional)
                      </Label>
                      <Input
                        id="trackUrl"
                        placeholder="https://youtube.com/watch?v=... or Spotify link"
                        value={trackUrl}
                        onChange={(e) => setTrackUrl(e.target.value)}
                        className="mt-1 bg-slate-700/50 border-purple-800/30 text-white placeholder:text-purple-400"
                      />
                      <p className="text-xs text-purple-400 mt-1">Supported: YouTube, Spotify, SoundCloud</p>
                    </div>
                  </div>
                )}

                {/* Options */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="anonymous"
                      checked={isAnonymous}
                      onCheckedChange={(checked) => {
                        setIsAnonymous(checked as boolean)
                        if (checked) setSenderName("")
                      }}
                      className="border-purple-500 data-[state=checked]:bg-purple-600"
                    />
                    <Label htmlFor="anonymous" className="text-purple-300">
                      Send anonymously
                    </Label>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <Label className="text-purple-300 text-base font-medium">Payment Method</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                    <Button
                      variant={paymentMethod === "card" ? "default" : "outline"}
                      className={`${
                        paymentMethod === "card"
                          ? "bg-purple-600 hover:bg-purple-700 text-white border-purple-500"
                          : "border-purple-800/30 bg-slate-700/30 text-purple-300 hover:bg-purple-600/20 hover:text-white hover:border-purple-600/50"
                      } justify-start transition-all duration-200`}
                      onClick={() => setPaymentMethod("card")}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Credit Card
                    </Button>
                    <Button
                      variant={paymentMethod === "paypal" ? "default" : "outline"}
                      className={`${
                        paymentMethod === "paypal"
                          ? "bg-purple-600 hover:bg-purple-700 text-white border-purple-500"
                          : "border-purple-800/30 bg-slate-700/30 text-purple-300 hover:bg-purple-600/20 hover:text-white hover:border-purple-600/50"
                      } justify-start transition-all duration-200`}
                      onClick={() => setPaymentMethod("paypal")}
                    >
                      <Wallet className="mr-2 h-4 w-4" />
                      PayPal
                    </Button>
                    <Button
                      variant={paymentMethod === "crypto" ? "default" : "outline"}
                      className={`${
                        paymentMethod === "crypto"
                          ? "bg-purple-600 hover:bg-purple-700 text-white border-purple-500"
                          : "border-purple-800/30 bg-slate-700/30 text-purple-300 hover:bg-purple-600/20 hover:text-white hover:border-purple-600/50"
                      } justify-start transition-all duration-200`}
                      onClick={() => setPaymentMethod("crypto")}
                    >
                      <DollarSign className="mr-2 h-4 w-4" />
                      Crypto
                    </Button>
                  </div>
                </div>

                {/* Donate Button */}
                <div className="pt-4">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg py-6 transition-all duration-200 transform hover:scale-[1.02]"
                    disabled={(!amount && !customAmount) || !paymentMethod}
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    {showTrackRequest && trackRequest ? (
                      <>
                        <Music className="mr-1 h-4 w-4" />
                        Donate ${amount || customAmount || "0"} {currency} + Track
                      </>
                    ) : (
                      `Donate $${amount || customAmount || "0"} ${currency}`
                    )}
                  </Button>
                  {!amount && !customAmount && (
                    <p className="text-center text-purple-400 text-sm mt-2">Please select an amount</p>
                  )}
                  {!paymentMethod && (amount || customAmount) && (
                    <p className="text-center text-purple-400 text-sm mt-2">Please select a payment method</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stream Info */}
            <Card className="bg-slate-800/50 border-purple-800/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Volume2 className="mr-2 h-5 w-5 text-purple-400" />
                  Now Streaming
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="aspect-video bg-slate-700/50 rounded-lg flex items-center justify-center border border-purple-800/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20"></div>
                    <div className="text-center text-purple-300 relative z-10">
                      <Volume2 className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">Stream Preview</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Epic Gaming Session!</h3>
                    <p className="text-purple-300 text-sm">Playing: Cyberpunk 2077</p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-purple-300">Viewers: 1,234</span>
                    <Badge variant="secondary" className="bg-red-600 text-white animate-pulse">
                      LIVE
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Track Request Info */}
            <Card className="bg-gradient-to-r from-purple-800/30 to-pink-800/30 border-purple-600/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center text-lg">
                  <Music className="mr-2 h-5 w-5 text-purple-400" />
                  Track Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-200 text-sm">Minimum amount:</span>
                    <Badge className="bg-purple-600 text-white">${TRACK_REQUEST_MINIMUM}</Badge>
                  </div>
                  <div className="text-xs text-purple-300 space-y-1">
                    <p>• YouTube, Spotify, SoundCloud supported</p>
                    <p>• Streamer reserves the right to skip</p>
                    <p>• No explicit content allowed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Donations */}
            <Card className="bg-slate-800/50 border-purple-800/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-purple-400" />
                  Recent Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDonations.map((donation, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 rounded-lg bg-slate-700/30 border border-purple-800/20 hover:bg-slate-700/50 transition-colors"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-purple-600 text-white text-xs">
                          {donation.sender.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-white truncate flex items-center">
                            {donation.sender}
                            {donation.hasTrack && <Music className="ml-1 h-3 w-3 text-purple-400" />}
                          </p>
                          <Badge variant="secondary" className="bg-purple-600 text-white text-xs">
                            ${donation.amount}
                          </Badge>
                        </div>
                        <p className="text-xs text-purple-200 mt-1 line-clamp-2">{donation.message}</p>
                        <p className="text-xs text-purple-400 mt-1">{donation.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Donation Goal */}
            <Card className="bg-gradient-to-r from-purple-800/50 to-pink-800/50 border-purple-600/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-center flex items-center justify-center">
                  <Star className="mr-2 h-5 w-5 text-yellow-400" />
                  Stream Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div>
                    <div className="text-2xl font-bold text-white">$847 / $1,000</div>
                    <p className="text-purple-200 text-sm">New Gaming Setup</p>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: "84.7%" }}
                    ></div>
                  </div>
                  <p className="text-purple-200 text-sm">84% complete • $153 to go!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
