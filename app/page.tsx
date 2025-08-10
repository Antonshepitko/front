import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Music, Users, DollarSign, TrendingUp } from "lucide-react"


export default function Home() {
  redirect('/auth');
}

export default function StreamerDashboard() {
  const recentDonations = [
    {
      id: 1,
      sender: "Alex_Gaming",
      amount: 25,
      currency: "USD",
      message: "Keep up the great work!",
      time: "2 min ago",
      track: "Bohemian Rhapsody - Queen",
    },
    { id: 2, sender: "StreamFan123", amount: 50, currency: "USD", message: "Love your content! 💜", time: "5 min ago" },
    {
      id: 3,
      sender: "MusicLover",
      amount: 15,
      currency: "USD",
      message: "Can you play some jazz?",
      time: "8 min ago",
      track: "Take Five - Dave Brubeck",
    },
  ]

  const requestedTracks = [
    { id: 1, track: "Bohemian Rhapsody - Queen", requester: "Alex_Gaming", amount: 25 },
    { id: 2, track: "Take Five - Dave Brubeck", requester: "MusicLover", amount: 15 },
    { id: 3, track: "Hotel California - Eagles", requester: "RockFan88", amount: 30 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-800/30 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12 border-2 border-purple-500">
                <AvatarImage src="/placeholder.svg?height=48&width=48" />
                <AvatarFallback className="bg-purple-600 text-white">ST</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-white">StreamerName</h1>
                <p className="text-purple-300">Live • 1,234 viewers</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/donations">
                <Button
                  variant="outline"
                  className="border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white bg-transparent"
                >
                  View All Donations
                </Button>
              </Link>
              <Link href="/auth">
                <Button className="bg-purple-600 hover:bg-purple-700">Settings</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-purple-800/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-300">Total Donations</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$2,847</div>
              <p className="text-xs text-purple-300">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-800/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-300">This Stream</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$156</div>
              <p className="text-xs text-purple-300">8 donations today</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-800/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-300">Supporters</CardTitle>
              <Users className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">342</div>
              <p className="text-xs text-purple-300">Unique donors</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-800/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-300">Track Requests</CardTitle>
              <Music className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">12</div>
              <p className="text-xs text-purple-300">Pending requests</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Donations */}
          <Card className="bg-slate-800/50 border-purple-800/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Heart className="mr-2 h-5 w-5 text-purple-400" />
                Recent Donations
              </CardTitle>
              <CardDescription className="text-purple-300">Latest support from your community</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentDonations.map((donation) => (
                <div
                  key={donation.id}
                  className="flex items-start space-x-4 p-4 rounded-lg bg-slate-700/30 border border-purple-800/20"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-purple-600 text-white text-sm">
                      {donation.sender.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white">{donation.sender}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-purple-600 text-white">
                          ${donation.amount} {donation.currency}
                        </Badge>
                        <span className="text-xs text-purple-300">{donation.time}</span>
                      </div>
                    </div>
                    <p className="text-sm text-purple-200 mt-1">{donation.message}</p>
                    {donation.track && (
                      <div className="flex items-center mt-2 text-xs text-purple-300">
                        <Music className="h-3 w-3 mr-1" />
                        {donation.track}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Requested Tracks */}
          <Card className="bg-slate-800/50 border-purple-800/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Music className="mr-2 h-5 w-5 text-purple-400" />
                Requested Tracks
              </CardTitle>
              <CardDescription className="text-purple-300">Music requests from donations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {requestedTracks.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30 border border-purple-800/20"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{request.track}</p>
                    <p className="text-xs text-purple-300">Requested by {request.requester}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="border-purple-500 text-purple-300">
                      ${request.amount}
                    </Badge>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Play
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Donation Link */}
        <Card className="mt-8 bg-gradient-to-r from-purple-800/50 to-pink-800/50 border-purple-600/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">Support the Stream</h3>
              <p className="text-purple-200 mb-4">Share your donation link with viewers</p>
              <div className="flex items-center justify-center space-x-4">
                <code className="bg-slate-900/50 text-purple-300 px-4 py-2 rounded-lg border border-purple-800/30">
                  https://donations.app/streamername
                </code>
                <Button className="bg-purple-600 hover:bg-purple-700">Copy Link</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
