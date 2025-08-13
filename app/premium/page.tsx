"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Bot,
  Crown,
  Check,
  X,
  ArrowLeft,
  Music,
  Radio,
  Headphones,
  Volume2,
  Zap,
  Shield,
  Menu,
  Star,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Head from "next/head"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const premiumFeatures = [
  {
    icon: Music,
    title: "Advanced Audio Controls",
    description: "Bass boost, equalizer, nightcore, speed control, and custom audio filters",
  },
  {
    icon: Radio,
    title: "Radio & Live Streaming",
    description: "Access to 1000+ radio stations and live stream support from any URL",
  },
  {
    icon: Headphones,
    title: "Unlimited Playlists",
    description: "Create, save, and share unlimited playlists with your community",
  },
  {
    icon: Volume2,
    title: "Priority Queue",
    description: "Skip the line with priority music requests and faster response times",
  },
  {
    icon: Zap,
    title: "Enhanced Performance",
    description: "Dedicated servers for premium users with 99.99% uptime guarantee",
  },
  {
    icon: Shield,
    title: "Priority Support",
    description: "24/7 premium support with dedicated Discord channel and faster response",
  },
]

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for small servers getting started",
    features: [
      { name: "Basic music playback", included: true },
      { name: "Queue management", included: true },
      { name: "Volume control", included: true },
      { name: "Basic commands", included: true },
      { name: "Community support", included: true },
      { name: "Advanced audio controls", included: false },
      { name: "Radio stations", included: false },
      { name: "Unlimited playlists", included: false },
      { name: "Priority support", included: false },
      { name: "Custom filters", included: false },
    ],
    buttonText: "Current Plan",
    buttonClass: "bg-gray-700 hover:bg-gray-600 text-gray-200",
    popular: false,
  },
  {
    name: "Premium",
    price: "$4.99",
    period: "per month",
    description: "Unlock all features for the ultimate music experience",
    features: [
      { name: "Everything in Free", included: true },
      { name: "Advanced audio controls", included: true },
      { name: "1000+ radio stations", included: true },
      { name: "Unlimited playlists", included: true },
      { name: "Priority queue", included: true },
      { name: "Custom audio filters", included: true },
      { name: "Enhanced performance", included: true },
      { name: "Priority support", included: true },
      { name: "Early access to features", included: true },
      { name: "Custom bot status", included: true },
    ],
    buttonText: "Upgrade Now",
    buttonClass:
      "bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white shadow-xl transform hover:scale-105 transition-all duration-200",
    popular: true,
  },
  {
    name: "Lifetime",
    price: "$49.99",
    period: "one-time",
    description: "Pay once, enjoy premium features forever",
    features: [
      { name: "Everything in Premium", included: true },
      { name: "Lifetime access", included: true },
      { name: "No monthly fees", included: true },
      { name: "Future feature updates", included: true },
      { name: "Exclusive lifetime badge", included: true },
      { name: "VIP Discord role", included: true },
      { name: "Beta feature access", included: true },
      { name: "Direct developer contact", included: true },
      { name: "Custom bot branding", included: true },
      { name: "Server analytics", included: true },
    ],
    buttonText: "Get Lifetime",
    buttonClass:
      "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-xl transform hover:scale-105 transition-all duration-200",
    popular: false,
  },
]

const faqs = [
  {
    question: "How does the premium subscription work?",
    answer:
      "Premium is a monthly subscription that unlocks all advanced features. You can cancel anytime and your premium features will remain active until the end of your billing period.",
  },
  {
    question: "Can I use premium features on multiple servers?",
    answer:
      "Yes! Your premium subscription works across all servers where you have admin permissions and GliderBot is installed.",
  },
  {
    question: "What happens if I cancel my subscription?",
    answer:
      "If you cancel, you'll keep premium features until your current billing period ends. After that, your account will revert to the free plan with basic features.",
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! We offer a 7 days free trial for new premium users. No credit card required to start your trial.",
  },
  {
    question: "How does lifetime access work?",
    answer:
      "Lifetime access gives you permanent premium features with a one-time payment. You'll receive all future updates and new features at no additional cost.",
  },
]

export default function PremiumPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handlePremiumUpgrade = async (planName: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(`Upgrading to ${planName}`)
    setIsLoading(false)
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
              <Link href="/premium" className="text-yellow-400 font-semibold">
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
                  className="text-gray-300 hover:text-green-400 transition-colors font-medium px-4 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Commands
                </Link>
                <Link
                  href="/premium"
                  className="text-yellow-400 font-semibold px-4 py-2"
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

            <div className="text-center mb-16">
              <Crown className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4">GliderBot Premium</h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Unlock the full potential of your Discord music experience with advanced features, priority support, and
                exclusive access to premium content.
              </p>

              <Badge className="bg-yellow-600/20 text-yellow-300 border-yellow-500/50 px-4 py-2 text-sm mb-8">
                🎵 7 days free trial • No credit card required
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Premium Features</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Take your Discord music experience to the next level with these exclusive premium features
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {premiumFeatures.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="bg-gray-900/50 border-gray-700 hover:bg-gray-900/70 hover:border-yellow-500/50 transition-all duration-300 h-full backdrop-blur-sm group">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-600/20 to-yellow-700/20 rounded-xl flex items-center justify-center mb-4 border border-yellow-500/30 group-hover:border-yellow-400/50 transition-colors">
                      <feature.icon className="h-6 w-6 text-yellow-400" />
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
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Choose Your Plan</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Select the perfect plan for your Discord server's music needs
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-40">
                    <Badge className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white px-4 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <Card
                  className={`h-full flex flex-col ${plan.popular
                    ? "bg-gray-900/70 border-yellow-500/50 shadow-xl shadow-yellow-500/10"
                    : "bg-gray-900/50 border-gray-700"
                    } backdrop-blur-sm`}
                >
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl font-bold text-white mb-2">{plan.name}</CardTitle>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-400 ml-2">/{plan.period}</span>
                    </div>
                    <CardDescription className="text-gray-300">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 flex-1 flex flex-col">
                    <div className="space-y-3 flex-1">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                          ) : (
                            <X className="h-5 w-5 text-gray-500 flex-shrink-0" />
                          )}
                          <span className={`text-sm ${feature.included ? "text-gray-300" : "text-gray-500"}`}>
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto pt-6">
                      <Button
                        size="lg"
                        className={`w-full ${plan.buttonClass} font-semibold py-3`}
                        onClick={() => handlePremiumUpgrade(plan.name)}
                        disabled={isLoading && plan.name !== "Free"}
                      >
                        {isLoading && plan.name !== "Free" ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                            Processing...
                          </div>
                        ) : (
                          <>
                            {plan.name === "Premium" && <Crown className="mr-2 h-5 w-5" />}
                            {plan.buttonText}
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-300">
              Got questions? We've got answers. Here are the most common questions about GliderBot Premium.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                  <CardHeader
                    className="cursor-pointer hover:bg-gray-900/30 transition-colors rounded-t-lg"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setOpenFaq(openFaq === index ? null : index)
                      }
                    }}
                    aria-expanded={openFaq === index}
                    aria-controls={`faq-content-${index}`}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg">{faq.question}</CardTitle>
                      <div
                        className={`transform transition-transform duration-200 ${openFaq === index ? "rotate-180" : ""
                          }`}
                        aria-hidden="true"
                      >
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </CardHeader>
                  {openFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      id={`faq-content-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                    >
                      <CardContent className="pt-0">
                        <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                      </CardContent>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            className="bg-gradient-to-r from-yellow-600/20 via-yellow-500/20 to-yellow-600/20 rounded-3xl p-8 sm:p-12 text-center border border-yellow-500/30 backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Crown className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Go Premium?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of Discord servers already enjoying the premium music experience. Start your free trial
              today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white font-semibold px-8 py-4 text-lg shadow-xl transform hover:scale-105 transition-all duration-200"
                onClick={() => handlePremiumUpgrade("Premium")}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    <Crown className="mr-2 h-5 w-5" />
                    Start Free Trial
                  </>
                )}
              </Button>
              <Button
                size="lg"
                className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold px-8 py-4 text-lg backdrop-blur-sm"
                asChild
              >
                <Link href="/commands">View All Features</Link>
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
