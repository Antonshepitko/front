import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Filter, Music, MessageSquare, Clock } from "lucide-react"

export default function DonationsPage() {
  const donations = [
    {
      id: 1,
      sender: "Alex_Gaming",
      amount: 25,
      currency: "USD",
      message: "Keep up the great work! Your streams always make my day better. Thank you for the amazing content!",
      time: "2024-01-15 14:30",
      track: "Bohemian Rhapsody - Queen",
      avatar: "AG",
    },
    {
      id: 2,
      sender: "StreamFan123",
      amount: 50,
      currency: "USD",
      message: "Love your content! 💜 You're the best streamer on the platform!",
      time: "2024-01-15 14:25",
      avatar: "SF",
    },
    {
      id: 3,
      sender: "MusicLover",
      amount: 15,
      currency: "USD",
      message: "Can you play some jazz? I really enjoy when you play smooth jazz during chill streams.",
      time: "2024-01-15 14:22",
      track: "Take Five - Dave Brubeck",
      avatar: "ML",
    },
    {
      id: 4,
      sender: "RockFan88",
      amount: 30,
      currency: "USD",
      message: "Amazing stream as always! Could you play some classic rock?",
      time: "2024-01-15 14:18",
      track: "Hotel California - Eagles",
      avatar: "RF",
    },
    {
      id: 5,
      sender: "GamerGirl2024",
      amount: 75,
      currency: "USD",
      message: "Thank you for the tips yesterday! They really helped me improve my gameplay. You're awesome! 🎮",
      time: "2024-01-15 14:15",
      avatar: "GG",
    },
    {
      id: 6,
      sender: "Anonymous",
      amount: 100,
      currency: "USD",
      message: "Keep being amazing! Your positive energy is contagious.",
      time: "2024-01-15 14:10",
      avatar: "AN",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-800/30 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-purple-300 hover:text-white hover:bg-purple-800/30">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-white">All Donations</h1>
            </div>
            <div className="text-purple-300">
              Total: <span className="text-white font-bold">$2,847</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8 bg-slate-800/50 border-purple-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Filter className="mr-2 h-5 w-5 text-purple-400" />
              Filter Donations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
                <Input
                  placeholder="Search by sender..."
                  className="pl-10 bg-slate-700/50 border-purple-800/30 text-white placeholder:text-purple-400"
                />
              </div>
              <Select>
                <SelectTrigger className="bg-slate-700/50 border-purple-800/30 text-white">
                  <SelectValue placeholder="Amount range" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-purple-800/30">
                  <SelectItem value="all">All amounts</SelectItem>
                  <SelectItem value="1-10">$1 - $10</SelectItem>
                  <SelectItem value="11-50">$11 - $50</SelectItem>
                  <SelectItem value="51-100">$51 - $100</SelectItem>
                  <SelectItem value="100+">$100+</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="bg-slate-700/50 border-purple-800/30 text-white">
                  <SelectValue placeholder="Time period" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-purple-800/30">
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This week</SelectItem>
                  <SelectItem value="month">This month</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="bg-slate-700/50 border-purple-800/30 text-white">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-purple-800/30">
                  <SelectItem value="all">All donations</SelectItem>
                  <SelectItem value="with-track">With track request</SelectItem>
                  <SelectItem value="message-only">Message only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Donations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {donations.map((donation) => (
            <Card
              key={donation.id}
              className="bg-slate-800/50 border-purple-800/30 backdrop-blur-sm hover:bg-slate-800/70 transition-colors"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12 border-2 border-purple-500">
                    <AvatarFallback className="bg-purple-600 text-white font-semibold">
                      {donation.avatar}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-white">{donation.sender}</h3>
                      <Badge className="bg-purple-600 text-white font-bold">
                        ${donation.amount} {donation.currency}
                      </Badge>
                    </div>

                    <div className="flex items-center text-sm text-purple-300 mb-3">
                      <Clock className="h-4 w-4 mr-1" />
                      {donation.time}
                    </div>

                    <div className="bg-slate-700/30 rounded-lg p-4 mb-3 border border-purple-800/20">
                      <div className="flex items-start">
                        <MessageSquare className="h-4 w-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-purple-100 text-sm leading-relaxed">{donation.message}</p>
                      </div>
                    </div>

                    {donation.track && (
                      <div className="bg-gradient-to-r from-purple-800/30 to-pink-800/30 rounded-lg p-3 border border-purple-600/30">
                        <div className="flex items-center">
                          <Music className="h-4 w-4 text-purple-400 mr-2" />
                          <span className="text-purple-200 text-sm font-medium">Track Request:</span>
                        </div>
                        <p className="text-white text-sm mt-1 font-medium">{donation.track}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button className="bg-purple-600 hover:bg-purple-700">Load More Donations</Button>
        </div>
      </div>
    </div>
  )
}
