"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <Card className="overflow-hidden bg-slate-800/50 border-purple-800/30 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
              {/* Left Side - Image and Branding */}
              <div className="relative bg-gradient-to-br from-purple-600 to-purple-800 p-8 flex flex-col justify-between">
                <div>
                  <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-8">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to website
                  </Link>
                  <div className="text-white text-2xl font-bold mb-2">StreamDonate</div>
                </div>

                <div className="relative">
                  <Image
                    src="/images/mountain-bg.png"
                    alt="Mountain landscape"
                    width={500}
                    height={300}
                    className="rounded-lg object-cover w-full h-64"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent rounded-lg" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h2 className="text-2xl font-bold mb-2">Connecting Streamers,</h2>
                    <h2 className="text-2xl font-bold">Building Communities</h2>
                  </div>
                </div>

                <div className="flex space-x-2 justify-center">
                  <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                  <div className="w-6 h-2 bg-white rounded-full"></div>
                </div>
              </div>

              {/* Right Side - Auth Form */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="w-full max-w-sm mx-auto">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                      {isLogin ? "Welcome back" : "Create an account"}
                    </h1>
                    <p className="text-purple-300">
                      {isLogin ? "Already have an account? " : "Already have an account? "}
                      <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-purple-400 hover:text-purple-300 underline"
                      >
                        {isLogin ? "Sign up" : "Log in"}
                      </button>
                    </p>
                  </div>

                  <form className="space-y-6">
                    {!isLogin && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName" className="text-purple-300">
                            First name
                          </Label>
                          <Input
                            id="firstName"
                            placeholder="Fletcher"
                            className="mt-1 bg-slate-700/50 border-purple-800/30 text-white placeholder:text-purple-400"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-purple-300">
                            Last name
                          </Label>
                          <Input
                            id="lastName"
                            placeholder="Last name"
                            className="mt-1 bg-slate-700/50 border-purple-800/30 text-white placeholder:text-purple-400"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <Label htmlFor="email" className="text-purple-300">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="mt-1 bg-slate-700/50 border-purple-800/30 text-white placeholder:text-purple-400"
                      />
                    </div>

                    <div>
                      <Label htmlFor="password" className="text-purple-300">
                        Password
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="bg-slate-700/50 border-purple-800/30 text-white placeholder:text-purple-400 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-300"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    {!isLogin && (
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" className="border-purple-500 data-[state=checked]:bg-purple-600" />
                        <Label htmlFor="terms" className="text-sm text-purple-300">
                          I agree to the{" "}
                          <Link href="/terms" className="text-purple-400 hover:text-purple-300 underline">
                            Terms & Conditions
                          </Link>
                        </Label>
                      </div>
                    )}

                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium">
                      {isLogin ? "Sign In" : "Create account"}
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-purple-800/30" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-slate-800 px-2 text-purple-300">Or register with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        className="border-purple-800/30 bg-slate-700/30 text-white hover:bg-slate-700/50"
                      >
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        Google
                      </Button>
                      <Button
                        variant="outline"
                        className="border-purple-800/30 bg-slate-700/30 text-white hover:bg-slate-700/50"
                      >
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                        </svg>
                        Apple
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
