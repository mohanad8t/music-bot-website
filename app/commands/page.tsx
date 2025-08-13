"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Bot,
  Search,
  Play,
  Volume2,
  ListMusic,
  ArrowLeft,
  Headphones,
  Radio,
  Settings,
  Crown,
  Menu,
  X,
  Copy,
  Check,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const commandCategories = [
  {
    name: "Playback",
    icon: Play,
    color: "bg-gradient-to-br from-green-600 to-green-700",
    description: "Core music playback controls",
    commands: [
      {
        name: "/play",
        description: "Play a song from YouTube, Spotify, or SoundCloud",
        usage: "/play <song name or URL>",
        premium: false,
      },
      { name: "/pause", description: "Pause the currently playing song", usage: "/pause", premium: false },
      { name: "/resume", description: "Resume the paused song", usage: "/resume", premium: false },
      { name: "/stop", description: "Stop playback and clear the queue", usage: "/stop", premium: false },
      { name: "/skip", description: "Skip to the next song in queue", usage: "/skip [amount]", premium: false },
      { name: "/previous", description: "Go back to the previous song", usage: "/previous", premium: true },
      { name: "/seek", description: "Jump to a specific time in the song", usage: "/seek <time>", premium: true },
      { name: "/replay", description: "Restart the current song", usage: "/replay", premium: false },
    ],
  },
  {
    name: "Queue Management",
    icon: ListMusic,
    color: "bg-gradient-to-br from-green-500 to-green-600",
    description: "Manage your music queue",
    commands: [
      { name: "/queue", description: "Display the current music queue", usage: "/queue [page]", premium: false },
      { name: "/shuffle", description: "Shuffle the current queue", usage: "/shuffle", premium: false },
      { name: "/loop", description: "Toggle loop mode (off/song/queue)", usage: "/loop [mode]", premium: false },
      { name: "/remove", description: "Remove a song from the queue", usage: "/remove <position>", premium: false },
      { name: "/clear", description: "Clear the entire queue", usage: "/clear", premium: false },
      { name: "/move", description: "Move a song to a different position", usage: "/move <from> <to>", premium: true },
      { name: "/skipto", description: "Skip to a specific song in queue", usage: "/skipto <position>", premium: true },
      {
        name: "/autoplay",
        description: "Enable automatic song suggestions",
        usage: "/autoplay [on/off]",
        premium: true,
      },
    ],
  },
  {
    name: "Audio Control",
    icon: Volume2,
    color: "bg-gradient-to-br from-blue-600 to-blue-700",
    description: "Advanced audio settings",
    commands: [
      { name: "/volume", description: "Set the music volume (0-100)", usage: "/volume <number>", premium: false },
      { name: "/bass", description: "Adjust bass levels", usage: "/bass <level>", premium: true },
      { name: "/equalizer", description: "Apply audio equalizer presets", usage: "/equalizer <preset>", premium: true },
      { name: "/nightcore", description: "Enable nightcore effect", usage: "/nightcore [on/off]", premium: true },
      { name: "/speed", description: "Change playback speed", usage: "/speed <multiplier>", premium: true },
      { name: "/pitch", description: "Adjust audio pitch", usage: "/pitch <level>", premium: true },
      { name: "/filter", description: "Apply audio filters", usage: "/filter <type>", premium: true },
      { name: "/reset", description: "Reset all audio effects", usage: "/reset", premium: false },
    ],
  },
  {
    name: "Playlists",
    icon: Headphones,
    color: "bg-gradient-to-br from-purple-600 to-purple-700",
    description: "Create and manage playlists",
    commands: [
      {
        name: "/playlist create",
        description: "Create a new playlist",
        usage: "/playlist create <name>",
        premium: true,
      },
      {
        name: "/playlist add",
        description: "Add current song to playlist",
        usage: "/playlist add <playlist>",
        premium: true,
      },
      { name: "/playlist play", description: "Play a saved playlist", usage: "/playlist play <name>", premium: true },
      { name: "/playlist list", description: "Show your playlists", usage: "/playlist list", premium: true },
      { name: "/playlist delete", description: "Delete a playlist", usage: "/playlist delete <name>", premium: true },
      {
        name: "/playlist share",
        description: "Share a playlist with others",
        usage: "/playlist share <name>",
        premium: true,
      },
      { name: "/favorites", description: "Add song to favorites", usage: "/favorites [add/remove]", premium: true },
      { name: "/history", description: "View recently played songs", usage: "/history", premium: true },
    ],
  },
  {
    name: "Radio & Live",
    icon: Radio,
    color: "bg-gradient-to-br from-red-600 to-red-700",
    description: "Live radio and streaming",
    commands: [
      { name: "/radio", description: "Play internet radio stations", usage: "/radio <station>", premium: true },
      { name: "/stations", description: "List available radio stations", usage: "/stations", premium: true },
      { name: "/live", description: "Stream live audio from URL", usage: "/live <url>", premium: true },
      { name: "/podcast", description: "Play podcast episodes", usage: "/podcast <name>", premium: true },
    ],
  },
  {
    name: "Settings",
    icon: Settings,
    color: "bg-gradient-to-br from-gray-600 to-gray-700",
    description: "Bot configuration",
    commands: [
      { name: "/setup", description: "Initial bot setup wizard", usage: "/setup", premium: false },
      { name: "/prefix", description: "Change command prefix", usage: "/prefix <new_prefix>", premium: false },
      { name: "/dj", description: "Set DJ role permissions", usage: "/dj <role>", premium: false },
      { name: "/announce", description: "Toggle song announcements", usage: "/announce [on/off]", premium: false },
      {
        name: "/voteskip",
        description: "Configure vote skip settings",
        usage: "/voteskip <percentage>",
        premium: true,
      },
      { name: "/maxqueue", description: "Set maximum queue length", usage: "/maxqueue <number>", premium: true },
      { name: "/premium", description: "View premium features", usage: "/premium", premium: false },
      { name: "/stats", description: "Show bot statistics", usage: "/stats", premium: false },
    ],
  },
]

export default function CommandsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showPremiumOnly, setShowPremiumOnly] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
      if (e.key === 'Escape') {
        setSearchTerm("")
        searchInputRef.current?.blur()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const copyToClipboard = async (command: string) => {
    try {
      await navigator.clipboard.writeText(command)
      setCopiedCommand(command)
      setTimeout(() => setCopiedCommand(null), 2000)
      // Could add toast notification here
    } catch (err) {
      console.error('Failed to copy command:', err)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = command
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        setCopiedCommand(command)
        setTimeout(() => setCopiedCommand(null), 2000)
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr)
      }
      document.body.removeChild(textArea)
    }
  }

  const filteredCommands = commandCategories
    .map((category) => ({
      ...category,
      commands: category.commands.filter(
        (command) =>
          (command.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            command.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (!showPremiumOnly || command.premium),
      ),
    }))
    .filter((category) => (selectedCategory ? category.name === selectedCategory : true))
    .filter((category) => category.commands.length > 0)

  const totalCommands = commandCategories.reduce((total, category) => total + category.commands.length, 0)
  const premiumCommands = commandCategories.reduce(
    (total, category) => total + category.commands.filter((cmd) => cmd.premium).length,
    0,
  )

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
              <Link href="/commands" className="text-green-400 font-semibold">
                Commands
              </Link>
              <Link href="/premium" className="text-gray-300 hover:text-green-400 transition-colors font-medium">
                Premium
              </Link>
              <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 py-2 shadow-lg">
                Add to Discord
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
            <motion.div
              className="md:hidden py-4 border-t border-gray-800"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-gray-300 hover:text-green-400 transition-colors font-medium px-4 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/commands"
                  className="text-green-400 font-semibold px-4 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Commands
                </Link>
                <Link
                  href="/premium"
                  className="text-gray-300 hover:text-green-400 transition-colors font-medium px-4 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Premium
                </Link>
                <div className="px-4">
                  <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-2 shadow-lg">
                    Add to Discord
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Header */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link
              href="/"
              className="inline-flex items-center text-green-400 hover:text-green-300 mb-6 transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>

            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4">GliderBot Commands</h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
                Discover all music commands and features. Use the search to find specific commands quickly.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
                    {totalCommands}
                  </div>
                  <div className="text-sm text-gray-400">Total Commands</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                    {premiumCommands}
                  </div>
                  <div className="text-sm text-gray-400">Premium Features</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
                    {commandCategories.length}
                  </div>
                  <div className="text-sm text-gray-400">Categories</div>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-4 mb-6">
                  <div className="relative flex-1 max-w-md mx-auto lg:mx-0">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-40" />
                    <Input
                      ref={searchInputRef}
                      placeholder="Search commands... (Ctrl+K)"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-20 bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 h-12 text-lg backdrop-blur-sm focus:border-green-500 focus:ring-green-500"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                      <kbd className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded border border-gray-600 hidden sm:inline-block">
                        Ctrl+K
                      </kbd>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap justify-center lg:justify-start">
                    <Button
                      variant={selectedCategory === null ? "default" : "outline"}
                      onClick={() => setSelectedCategory(null)}
                      className={
                        selectedCategory === null
                          ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg"
                          : "bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-600"
                      }
                    >
                      All Commands
                    </Button>
                    {commandCategories.slice(0, 3).map((category) => (
                      <Button
                        key={category.name}
                        variant={selectedCategory === category.name ? "default" : "outline"}
                        onClick={() => setSelectedCategory(category.name)}
                        className={
                          selectedCategory === category.name
                            ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg"
                            : "bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-600"
                        }
                      >
                        <category.icon className="h-4 w-4 mr-2" />
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* More Categories - Mobile Friendly */}
                <div className="flex gap-2 flex-wrap justify-center mb-6">
                  {commandCategories.slice(3).map((category) => (
                    <Button
                      key={category.name}
                      variant={selectedCategory === category.name ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`text-sm ${selectedCategory === category.name
                          ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg"
                          : "bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-600"
                        }`}
                    >
                      <category.icon className="h-4 w-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">{category.name}</span>
                      <span className="sm:hidden">{category.name.split(' ')[0]}</span>
                    </Button>
                  ))}
                </div>

                {/* Premium Filter */}
                <div className="flex justify-center mb-8">
                  <Button
                    variant={showPremiumOnly ? "default" : "outline"}
                    onClick={() => setShowPremiumOnly(!showPremiumOnly)}
                    className={
                      showPremiumOnly
                        ? "bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white shadow-lg"
                        : "bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-600"
                    }
                  >
                    <Crown className="h-4 w-4 mr-2" />
                    {showPremiumOnly ? "Show All Commands" : "Premium Only"}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Commands */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-16">
            {filteredCommands.map((category, categoryIndex) => (
              <motion.div key={category.name} variants={fadeInUp}>
                <div className="flex items-center mb-8">
                  <div className={`p-4 rounded-xl ${category.color} mr-4 shadow-lg`}>
                    <category.icon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">{category.name}</h2>
                    <p className="text-gray-400 mt-1">
                      {category.description} • {category.commands.length} commands
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.commands.map((command, commandIndex) => (
                    <motion.div
                      key={command.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: commandIndex * 0.05 }}
                    >
                      <Card className="bg-gray-900/50 border-gray-700 hover:bg-gray-900/70 hover:border-green-500/50 transition-all duration-300 h-full backdrop-blur-sm group focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-opacity-50">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between mb-2">
                            <CardTitle className="text-green-400 font-mono text-lg group-hover:text-green-300 transition-colors">
                              {command.name}
                            </CardTitle>
                            <div className="flex gap-2">
                              <Badge variant="outline" className="border-green-500/50 text-green-400 text-xs">
                                Slash
                              </Badge>
                              {command.premium && (
                                <Badge className="bg-gradient-to-r from-yellow-600/20 to-yellow-700/20 text-yellow-400 border-yellow-500/50 text-xs">
                                  <Crown className="h-3 w-3 mr-1" />
                                  Premium
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <CardDescription className="text-gray-300 leading-relaxed">
                            {command.description}
                          </CardDescription>
                          <div className="bg-gray-950/50 rounded-lg p-3 border border-gray-700 group">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-xs text-gray-400 font-medium">Usage:</p>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyToClipboard(command.name)}
                                className="h-6 w-6 p-0 hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label={`Copy ${command.name} command`}
                                title="Copy command"
                              >
                                {copiedCommand === command.name ? (
                                  <Check className="h-3 w-3 text-green-400" />
                                ) : (
                                  <Copy className="h-3 w-3 text-gray-400" />
                                )}
                              </Button>
                            </div>
                            <code className="text-sm text-green-400 font-mono break-all">{command.usage}</code>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredCommands.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Search className="h-16 w-16 text-gray-600 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-400 mb-3">No commands found</h3>
              <p className="text-gray-500 text-lg mb-6">Try adjusting your search or filter criteria</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory(null)
                  setShowPremiumOnly(false)
                }}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Premium CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            className="bg-gradient-to-r from-yellow-600/20 via-yellow-500/20 to-yellow-600/20 rounded-3xl p-8 sm:p-12 text-center border border-yellow-500/30 backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Crown className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Unlock Premium Features</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Get access to advanced audio controls, unlimited playlists, radio stations, and priority support with
              GliderBot Premium.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white font-semibold px-8 py-4 text-lg shadow-xl transform hover:scale-105 transition-all duration-200"
                asChild
              >
                <Link href="/premium">
                  <Crown className="mr-2 h-5 w-5" />
                  Upgrade to Premium
                </Link>
              </Button>
              <Button
                size="lg"
                className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold px-8 py-4 text-lg backdrop-blur-sm"
                asChild
              >
                <Link href="/premium">Learn More</Link>
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
    </div>
  )
}
