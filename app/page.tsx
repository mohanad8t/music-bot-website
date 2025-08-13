"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Music, Play, Headphones, Radio, Volume2, Star, ArrowRight, CheckCircle, Menu, X, ChevronUp } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const features = [
  {
    icon: Music,
    title: "High-Quality Audio",
    description: "Crystal clear 320kbps audio streaming with zero lag and premium sound quality",
  },
  {
    icon: Radio,
    title: "Multiple Sources",
    description: "Play from YouTube, Spotify, SoundCloud, and more with seamless integration",
  },
  {
    icon: Volume2,
    title: "Advanced Controls",
    description: "Queue management, volume control, loop modes, and shuffle functionality",
  },
  {
    icon: Headphones,
    title: "24/7 Uptime",
    description: "Reliable music streaming with 99.9% uptime and instant response times",
  },
]

const stats = [
  { number: "100K+", label: "Active Servers" },
  { number: "5M+", label: "Songs Played" },
  { number: "99.9%", label: "Uptime" },
  { number: "24/7", label: "Support" },
]

const musicFeatures = [
  "High-quality audio streaming",
  "Queue management system",
  "Playlist creation & saving",
  "Volume & bass controls",
  "Loop & shuffle modes",
  "Skip voting system",
  "Now playing displays",
  "Multi-platform support",
]

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Server Owner",
    avatar: "AJ",
    content: "GliderBot transformed our gaming server. The audio quality is incredible and setup was super easy!",
    server: "Gaming Paradise"
  },
  {
    name: "Sarah Chen",
    role: "Community Manager",
    avatar: "SC",
    content: "Best music bot we've tried. The queue management and premium features are worth every penny.",
    server: "Music Lovers Hub"
  },
  {
    name: "Mike Rodriguez",
    role: "Discord Admin",
    avatar: "MR",
    content: "24/7 uptime and crystal clear audio. Our members absolutely love the new music experience!",
    server: "Chill Vibes"
  }
]

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAddingToDiscord, setIsAddingToDiscord] = useState(false)
  const [musicProgress, setMusicProgress] = useState(45)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setMusicProgress(prev => {
        if (prev >= 100) return 0
        return prev + 0.5
      })
    }, 200)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Home') {
        e.preventDefault()
        scrollToTop()
      }
      if (e.ctrlKey && e.key === 'h') {
        e.preventDefault()
        scrollToTop()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAddToDiscord = async () => {
    setIsAddingToDiscord(true)
    // Simulate redirect to Discord OAuth
    setTimeout(() => {
      window.open('https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&permissions=3148800&scope=bot%20applications.commands', '_blank')
      setIsAddingToDiscord(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gray-950/95 backdrop-blur-xl border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-xl font-bold text-white">GliderBot</span>
                <p className="text-xs text-green-400 -mt-1">The Music Bot</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              className="hidden md:flex items-center space-x-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link href="/" className="text-gray-300 hover:text-green-400 transition-colors font-medium">
                Home
              </Link>
              <Link href="/commands" className="text-gray-300 hover:text-green-400 transition-colors font-medium">
                Commands
              </Link>
              <Link href="/premium" className="text-gray-300 hover:text-green-400 transition-colors font-medium">
                Premium
              </Link>
              <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 py-2 shadow-lg"
                onClick={handleAddToDiscord}
                disabled={isAddingToDiscord}
              >
                {isAddingToDiscord ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Adding...
                  </div>
                ) : (
                  'Add to Discord'
                )}
              </Button>
            </motion.div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white hover:bg-gray-800"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <>
              <div
                className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.div
                className="md:hidden absolute top-full left-0 right-0 bg-gray-950/98 backdrop-blur-xl border-b border-gray-800 z-50"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col space-y-4 p-4">
                  <Link
                    href="/"
                    className="text-gray-300 hover:text-green-400 transition-colors font-medium px-4 py-3 rounded-lg hover:bg-gray-800/50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/commands"
                    className="text-gray-300 hover:text-green-400 transition-colors font-medium px-4 py-3 rounded-lg hover:bg-gray-800/50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Commands
                  </Link>
                  <Link
                    href="/premium"
                    className="text-gray-300 hover:text-green-400 transition-colors font-medium px-4 py-3 rounded-lg hover:bg-gray-800/50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Premium
                  </Link>
                  <div className="pt-2">
                    <Button
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 shadow-lg"
                      onClick={() => {
                        setMobileMenuOpen(false)
                        handleAddToDiscord()
                      }}
                      disabled={isAddingToDiscord}
                    >
                      {isAddingToDiscord ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                          Adding...
                        </div>
                      ) : (
                        'Add to Discord'
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex flex-col items-center space-y-3 mb-6">
                <Badge className="bg-green-600/20 text-green-300 border-green-500/50 px-4 py-2 text-sm">
                  🎵 Trusted by 100,000+ Discord servers
                </Badge>
                <Badge className="bg-red-600/20 text-red-300 border-red-500/50 px-4 py-2 text-sm">
                  The links do not work because this is a demo version only. You can edit this in your own.
                </Badge>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Premium Music for
                <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent block mt-2">
                  Your Discord Server
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                GliderBot delivers crystal-clear music streaming with advanced controls, queue management, and support
                for all major platforms. Transform your Discord server into the ultimate music experience.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-4 text-lg shadow-xl transform hover:scale-105 transition-all duration-200"
                  onClick={handleAddToDiscord}
                  disabled={isAddingToDiscord}
                >
                  {isAddingToDiscord ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                      Adding to Discord...
                    </div>
                  ) : (
                    <>
                      <Bot className="mr-2 h-5 w-5" />
                      Add to Discord
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
                <Button
                  size="lg"
                  className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold px-8 py-4 text-lg backdrop-blur-sm"
                  asChild
                >
                  <Link href="/commands">
                    <Play className="mr-2 h-5 w-5" />
                    View Commands
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Music Player Preview */}
            <motion.div
              className="mt-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative max-w-4xl mx-auto">
                <div className="bg-gray-900/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-gray-700">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-gray-400 text-sm font-medium">#music</span>
                    </div>
                    <Badge className="bg-green-600/20 text-green-300 border-green-500/50">Live Preview</Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-green-400 font-semibold">GliderBot</span>
                          <Badge className="bg-green-600/20 text-green-300 text-xs px-2 py-1 border border-green-500/50">
                            BOT
                          </Badge>
                        </div>
                        <div className="bg-gray-800/80 rounded-lg p-4 border border-gray-700">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center shadow-lg">
                              <Music className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white font-medium truncate">Awesome Song - Artist Name</p>
                              <p className="text-gray-400 text-sm">Requested by @user</p>
                            </div>
                            <div className="text-green-400 text-sm font-mono">3:24</div>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2 mb-2 overflow-hidden">
                            <motion.div
                              className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                              initial={{ width: "45%" }}
                              animate={{ width: `${musicProgress}%` }}
                              transition={{ duration: 0.2 }}
                            ></motion.div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>1:32</span>
                            <span>3:24</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div key={index} className="text-center" variants={fadeInUp}>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Why Choose GliderBot?</h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the most advanced Discord music bot with features designed for the perfect listening experience
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="bg-gray-900/50 border-gray-700 hover:bg-gray-900/70 hover:border-green-500/50 transition-all duration-300 h-full backdrop-blur-sm group">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-600/20 to-green-700/20 rounded-xl flex items-center justify-center mb-4 border border-green-500/30 group-hover:border-green-400/50 transition-colors">
                      <feature.icon className="h-6 w-6 text-green-400" />
                    </div>
                    <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Music Features List */}
          <motion.div
            className="bg-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Complete Music Experience</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {musicFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Loved by Communities</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              See what Discord server owners and admins are saying about GliderBot
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="bg-gray-900/50 border-gray-700 hover:bg-gray-900/70 hover:border-green-500/50 transition-all duration-300 h-full backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg">{testimonial.name}</CardTitle>
                        <p className="text-green-400 text-sm">{testimonial.role}</p>
                        <p className="text-gray-400 text-xs">{testimonial.server}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 leading-relaxed italic">
                      "{testimonial.content}"
                    </CardDescription>
                    <div className="flex mt-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            className="bg-gradient-to-r from-green-600/20 via-green-500/20 to-green-600/20 rounded-3xl p-8 sm:p-12 text-center border border-green-500/30 backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Ready to Upgrade Your Music?</h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join over 100,000 Discord servers already enjoying premium music with GliderBot. Setup takes less than 30
              seconds!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-4 text-lg shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Bot className="mr-2 h-5 w-5" />
                Add GliderBot Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold px-8 py-4 text-lg backdrop-blur-sm"
              >
                <Star className="mr-2 h-5 w-5" />
                View on GitHub
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-xl font-bold text-white">GliderBot</span>
                <p className="text-sm text-green-400 -mt-1">The Music Bot</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-gray-400">
              <Link href="#" className="hover:text-green-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-green-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-green-400 transition-colors">
                Support Server
              </Link>
              <Link href="#" className="hover:text-green-400 transition-colors">
                Documentation
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 GliderBot. All rights reserved. Made with ❤️ for Discord communities.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          className="fixed bottom-8 right-8 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-3 rounded-full shadow-lg z-50 transition-all duration-200"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />
        </motion.button>
      )}
    </div>
  )
}
