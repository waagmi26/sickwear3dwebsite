"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Menu, X, ChevronDown, CheckCircle, AlertCircle } from "lucide-react"

// Import components


import ClientLogosBanner from "@/components/client-logos-banner"
import ProductMockup from "@/components/product-mockup"


export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [navVisible, setNavVisible] = useState(false)
  const [projectType, setProjectType] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [selectedCategory, setSelectedCategory] = useState<{ name: string; img: string; cols?: number; rows?: number; items?: string[] } | null>(null)
  const [lightboxImg, setLightboxImg] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Get all sections
      const sections = [
        { id: "home", element: document.getElementById("home") || { offsetTop: 0 } },
        { id: "features", element: document.getElementById("features") },
        { id: "process", element: document.getElementById("process") },
        { id: "products", element: document.getElementById("products") },
        { id: "gallery", element: document.getElementById("gallery") },
        { id: "clients", element: document.getElementById("clients") },
        { id: "reviews", element: document.getElementById("reviews") },
        { id: "faq", element: document.getElementById("faq") },
        { id: "contact-form", element: document.getElementById("contact-form") },

      ]

      // Find which section is currently in view
      const scrollPosition = window.scrollY + 100

      // Special case for home section (top of page)
      if (window.scrollY < 100) {
        setActiveSection("home")
        return
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.element && section.element.offsetTop !== undefined) {
          const sectionTop = section.element.offsetTop
          if (scrollPosition >= sectionTop) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigationItems = [
    { name: "Features", href: "#features", id: "features" },
    { name: "Process", href: "#process", id: "process" },
    { name: "Products", href: "#products", id: "products" },
    { name: "Gallery", href: "#gallery", id: "gallery" },
    { name: "Clients", href: "#clients", id: "clients" },
    { name: "Testimonial", href: "#reviews", id: "reviews" },
    { name: "FAQ", href: "#faq", id: "faq" },
    { name: "Contact", href: "#contact-form", id: "contact-form", scrollTo: "contact-form" },
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch("https://formspree.io/f/mbdwkwnr", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        setSubmitStatus("success")
        ;(e.target as HTMLFormElement).reset()
        setProjectType("")
      } else {
        throw new Error("Form submission failed")
      }
    } catch (error) {
      console.error("Error:", error)
      setSubmitStatus("error")

      const formData = new FormData(e.currentTarget)
      const name = formData.get("name") as string
      const email = formData.get("email") as string
      const company = formData.get("company") as string
      const message = formData.get("message") as string

      const subject = `Contact Form: ${name || "New Inquiry"}`
      const body = `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nMessage: ${message}`
      const mailtoLink = `mailto:sickwear.xyz@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

      window.open(mailtoLink, "_blank")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: selectedCategory ? -100 : 0, opacity: selectedCategory ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="group relative"
          >
            <Link
              href="#"
              className="z-50 flex items-center relative"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
            >
              <Image
                src="/images/sickwear-logo-bw.png"
                alt="Sickwear"
                width={320}
                height={115}
                className={`h-28 w-auto transition-all duration-300 ${
                  activeSection === "home" || activeSection === "" ? "opacity-0" : "group-hover:opacity-0"
                }`}
                style={{ background: 'transparent' }}
                priority
              />
              <Image
                src="/images/sickwear-logo-color.png"
                alt="Sickwear"
                width={320}
                height={115}
                className={`h-28 w-auto absolute top-0 left-0 transition-all duration-300 ${
                  activeSection === "home" || activeSection === "" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
                style={{ background: 'transparent' }}
                priority
              />
            </Link>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden md:flex items-center"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-2">
              <div className="flex space-x-6">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(item.id);
                        if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
                      }}
                      className={`text-xs font-medium transition-colors ${
                        activeSection === item.id ? "text-[#BFF000]" : "text-white hover:text-[#BFF000]"
                      }`}
                    >
                      {item.name}
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block"
          >
            <Button
              asChild
              className={`rounded-full font-semibold transition-all duration-300 ${
                scrolled
                  ? "bg-white text-black hover:bg-[#BFF000]"
                  : "bg-[#BFF000] text-black hover:bg-[#d4ff33]"
              }`}
            >
              <Link href="/overview">
                Overview
              </Link>
            </Button>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-30 pt-20"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="container mx-auto px-4 py-10"
            >
              <motion.nav className="flex flex-col space-y-6">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileMenuOpen(false);
                        setTimeout(() => {
                          const el = document.getElementById(item.id);
                          if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
                        }, 350);
                      }}
                      className={`text-xl font-medium transition-colors ${
                        activeSection === item.id ? "text-[#BFF000]" : "text-white hover:text-[#BFF000]"
                      }`}
                    >
                      {item.name}
                    </a>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  <Button
                    asChild
                    className="rounded-full bg-white text-black font-semibold hover:bg-[#BFF000] w-full mt-4 transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link href="/overview">
                      Overview
                    </Link>
                  </Button>
                </motion.div>
              </motion.nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section - Catalog Style with Film Reel */}
      <section id="home" className="min-h-screen relative flex flex-col overflow-hidden bg-black">
        {/* Animated Film Reel Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Top Row - Moving Left (Set 1: Headwear, Apparel, Accessories) */}
          <motion.div
            animate={{ x: [0, -1920] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-[15%] left-0 flex gap-3"
            style={{ width: "3840px" }}
          >
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-3">
                {[
                  "/images/hero/black-baseball-cap.jpg",
                  "/images/hero/balaclava.webp",
                  "/images/hero/sleep-mask.jpg",
                  "/images/hero/winter-beanie.webp",
                  "/images/hero/orange-tshirt.jpg",
                  "/images/hero/black-jacket.jpg",
                  "/images/hero/hooded-neck-pillow.jpg",
                  "/images/hero/enamel-pins.jpg",
                  "/images/hero/passport-holders.jpg",
                ].map((src, index) => (
                  <div
                    key={`top-${setIndex}-${index}`}
                    className="relative w-48 h-56 flex-shrink-0 rounded-lg overflow-hidden border-2 border-[#BFF000]/60 grayscale-[50%] hover:grayscale-0 transition-all duration-300"
                  >
                    <Image
                      src={src || "/placeholder.svg"}
                      alt={`Product ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ))}
          </motion.div>

          {/* Bottom Row - Moving Right (Set 2: Different products) */}
          <motion.div
            animate={{ x: [-1920, 0] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[15%] left-0 flex gap-3"
            style={{ width: "3840px" }}
          >
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-3">
                {[
                  "/images/hero/dark-muffler.webp",
                  "/images/hero/blue-socks.jpg",
                  "/images/hero/puffer-jacket.webp",
                  "/images/hero/fleece-gloves.webp",
                  "/images/hero/white-bucket-hat.jpg",
                  "/images/hero/green-knit-scarf.webp",
                  "/images/hero/white-hoodie.webp",
                  "/images/hero/sunglass-cases.jpg",
                  "/images/hero/canvas-tote.jpg",
                  "/images/hero/astronaut-sticker.jpg",
                ].map((src, index) => (
                  <div
                    key={`bottom-${setIndex}-${index}`}
                    className="relative w-48 h-56 flex-shrink-0 rounded-lg overflow-hidden border-2 border-[#BFF000]/60 grayscale-[50%] hover:grayscale-0 transition-all duration-300"
                  >
                    <Image
                      src={src || "/placeholder.svg"}
                      alt={`Product ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ))}
          </motion.div>

          {/* Dark Gradient Overlay for Center Focus - adjusted for better visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/10 to-black z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 z-10" />
        </div>

        {/* Main Content */}
        <div className="relative z-20 flex-1 flex items-center">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Left Side - Text */}
              <div className="lg:w-1/3 text-center lg:text-left">
                <motion.h1
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tight"
                >
                  <span className="block text-white">EXCLUSIVE</span>
                  <span className="block text-[#BFF000]">WEB3</span>
                  <span className="block text-white">COLLECTION...</span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="rounded-full bg-[#BFF000] hover:bg-[#d4ff00] text-black px-8 py-6 text-lg font-bold" onClick={() => { const el = document.getElementById('contact-form'); if(el){ window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' }); } }}>
                      Get a Quote
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="rounded-full bg-transparent border border-white/30 hover:border-[#BFF000] text-white px-8 py-6 text-lg font-bold" onClick={() => { const el = document.getElementById('gallery'); if(el){ window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' }); } }}>
                      See Our Work
                    </Button>
                  </motion.div>
                </motion.div>
              </div>

              {/* Right Side - Made With Love Badge (matching catalog style) */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="lg:w-1/2 text-center lg:text-right"
              >
                <div className="inline-block">
                  <div className="text-white font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] flex flex-col items-end text-right">
                    <span className="block">MADE</span>
                    <span className="block">WITH</span>
                    <span className="flex items-center gap-0">
                      <span 
                        className="text-[#BFF000] italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl -mr-1"
                        style={{ fontFamily: "'Brush Script MT', 'Segoe Script', cursive", fontWeight: 400 }}
                      >
                        love
                      </span>
                      <svg 
                        viewBox="0 0 32 32" 
                        fill="none"
                        stroke="#BFF000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
                      >
                        <path d="M16 28c-1-1-2.5-2.2-4-3.5C7 20.5 3 17 3 11.5c0-2 .8-4 2.2-5.3C6.6 4.8 8.5 4 10.5 4c1.8 0 3.5.7 4.8 1.8l.7.7.7-.7C18 4.7 19.7 4 21.5 4c2 0 3.9.8 5.3 2.2C28.2 7.5 29 9.5 29 11.5c0 5.5-4 9-9 13-1.5 1.3-3 2.5-4 3.5z" strokeDasharray="2 1"/>
                      </svg>
                      <span className="text-white font-black ml-1">IN</span>
                    </span>
                    <span className="block text-white">INDIA</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="min-h-screen bg-black relative flex items-center justify-center pt-24 pb-12 md:pt-28 md:pb-16 overflow-hidden">
        {/* Abstract Line Graphics Background - More Prominent */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Diagonal lines - increased opacity */}
          <svg className="absolute top-0 left-0 w-full h-full opacity-[0.08]" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="100" y2="100" stroke="#BFF000" strokeWidth="0.15" />
            <line x1="20" y1="0" x2="100" y2="80" stroke="#BFF000" strokeWidth="0.1" />
            <line x1="40" y1="0" x2="100" y2="60" stroke="#BFF000" strokeWidth="0.1" />
            <line x1="0" y1="20" x2="80" y2="100" stroke="#BFF000" strokeWidth="0.1" />
            <line x1="0" y1="40" x2="60" y2="100" stroke="#BFF000" strokeWidth="0.1" />
            <line x1="60" y1="0" x2="100" y2="40" stroke="#BFF000" strokeWidth="0.08" />
            <line x1="80" y1="0" x2="100" y2="20" stroke="#BFF000" strokeWidth="0.08" />
          </svg>
          
          {/* Corner accents - more visible */}
          <div className="absolute top-8 left-8 w-40 h-40 border-l-2 border-t-2 border-[#BFF000]/20 rounded-tl-3xl" />
          <div className="absolute bottom-8 right-8 w-40 h-40 border-r-2 border-b-2 border-[#BFF000]/20 rounded-br-3xl" />
          <div className="absolute top-8 right-8 w-20 h-20 border-r border-t border-[#BFF000]/15" />
          <div className="absolute bottom-8 left-8 w-20 h-20 border-l border-b border-[#BFF000]/15" />
          
          {/* Floating circles - more prominent */}
          <motion.div 
            animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-1/5 w-72 h-72 rounded-full border border-[#BFF000]/15"
          />
          <motion.div 
            animate={{ y: [0, 20, 0], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 left-1/5 w-56 h-56 rounded-full border border-[#BFF000]/15"
          />
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-[#BFF000]/10"
          />
          
          {/* Horizontal accent lines - longer and more visible */}
          <div className="absolute top-1/4 left-0 w-40 h-px bg-gradient-to-r from-[#BFF000]/40 to-transparent" />
          <div className="absolute bottom-1/4 right-0 w-40 h-px bg-gradient-to-l from-[#BFF000]/40 to-transparent" />
          <div className="absolute top-2/3 left-0 w-28 h-px bg-gradient-to-r from-[#BFF000]/25 to-transparent" />
          <div className="absolute bottom-2/3 right-0 w-28 h-px bg-gradient-to-l from-[#BFF000]/25 to-transparent" />
          
          {/* Small dots - larger and brighter */}
          <div className="absolute top-1/2 left-12 w-2 h-2 rounded-full bg-[#BFF000]/30" />
          <div className="absolute top-1/3 right-24 w-1.5 h-1.5 rounded-full bg-[#BFF000]/40" />
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-[#BFF000]/30" />
          <div className="absolute top-1/5 left-1/4 w-1 h-1 rounded-full bg-[#BFF000]/35" />
          <div className="absolute bottom-1/5 right-1/3 w-1 h-1 rounded-full bg-[#BFF000]/35" />
          
          {/* Cross marks */}
          <div className="absolute top-20 right-1/4 text-[#BFF000]/20 text-2xl font-thin">+</div>
          <div className="absolute bottom-20 left-1/4 text-[#BFF000]/20 text-2xl font-thin">+</div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-10 md:mb-12"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              Features
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-[#BFF000]"
            >
              Not your average merch shop. We built different.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-6xl mx-auto relative z-10">
            {[
              {
                title: "Crypto Native",
                description: "Built for Web3 communities with blockchain-first mindset.",
              },
              {
                title: "Premium Material",
                description: "Only the finest fabrics sourced globally for lasting quality.",
              },
              {
                title: "Design Assistance",
                description: "Expert designers bring your brand vision to life.",
              },
              {
                title: "RFID Protected",
                description: "Advanced shielding technology to protect your data.",
              },
              {
                title: "NFC Enabled",
                description: "Smart merchandise with NFC chips for digital experiences.",
              },
              {
                title: "In House Manufacturing",
                description: "Complete control for consistent quality and faster delivery.",
              },
              {
                title: "Community Drops",
                description: "Exclusive limited edition releases for your community.",
              },
              {
                title: "Personalized Hampers",
                description: "Curated gift sets and welcome kits for your brand.",
              },
              {
                title: "100% Customisable",
                description: "Every detail from colors to materials to packaging.",
              },
              {
                title: "Fastest Turnaround",
                description: "Industry-leading production without compromising quality.",
              },
              {
                title: "Global Shipping",
                description: "Worldwide delivery to 150+ countries with tracking.",
              },
              {
                title: "Pay in Crypto & Fiat",
                description: "Flexible payment with crypto and traditional methods.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                className="group relative cursor-pointer p-3 md:p-4 rounded-lg border border-white/5 hover:border-[#BFF000]/40 hover:bg-[#BFF000]/5 transition-all duration-300"
              >
                <div className="text-center">
                  <h3 className="text-white/90 text-xs md:text-sm font-normal tracking-wide group-hover:text-[#BFF000] group-hover:font-semibold transition-all duration-300 mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-[10px] md:text-xs leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Flowchart Style */}
      <section id="process" className="min-h-screen bg-black relative flex items-center justify-center pt-24 pb-16 md:pt-28 md:pb-20 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 border-l-2 border-t-2 border-[#BFF000]/15 rounded-tl-3xl" />
          <div className="absolute bottom-10 right-10 w-32 h-32 border-r-2 border-b-2 border-[#BFF000]/15 rounded-br-3xl" />
          <motion.div 
            animate={{ opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 right-10 w-40 h-40 rounded-full border border-[#BFF000]/10"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              Process
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-[#BFF000]"
            >
              From idea to delivery, we got you covered.
            </motion.p>
          </motion.div>

          {/* Balanced Flowchart - 7 Steps */}
          <div className="max-w-6xl mx-auto">
            {/* Desktop Flowchart - Single Row Centered */}
            <div className="hidden md:block relative">
              <div className="flex items-center justify-center gap-0">
                {[
                  { 
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    ),
                    label: "Discovery",
                    isStart: true
                  },
                  { 
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    ),
                    label: "Brief"
                  },
                  { 
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    ),
                    label: "Mockup"
                  },
                  { 
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    ),
                    label: "Production"
                  },
                  { 
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    label: "QC & Pack"
                  },
                  { 
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    ),
                    label: "Shipping"
                  },
                  { 
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    ),
                    label: "Delivery",
                    isEnd: true
                  },
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="flex items-center"
                  >
                    <div className="flex flex-col items-center group cursor-pointer">
                      <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                        step.isStart || step.isEnd
                          ? 'bg-[#BFF000] text-black border-[#BFF000] shadow-lg shadow-[#BFF000]/30' 
                          : 'bg-transparent text-white border-white/50 group-hover:text-[#BFF000] group-hover:border-[#BFF000] group-hover:bg-[#BFF000]/10'
                      }`}>
                        {step.icon}
                      </div>
                      <span className={`mt-2 text-[10px] lg:text-xs font-medium transition-colors ${step.isStart || step.isEnd ? 'text-[#BFF000]' : 'text-white group-hover:text-[#BFF000]'}`}>
                        {step.label}
                      </span>
                    </div>
                    {index < 6 && (
                      <div className="w-8 lg:w-12 xl:w-16 h-px bg-gradient-to-r from-[#BFF000]/40 to-[#BFF000]/60 mx-1 lg:mx-2" />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Samples note */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="text-center mt-8"
              >
                <span className="text-xs text-gray-500">
                  <span className="text-[#BFF000]">*</span> Samples available on request
                </span>
              </motion.div>
            </div>

            {/* Mobile Flowchart - Reverse S, 2 steps per row */}
            <div className="md:hidden px-4">
              {(() => {
                const steps = [
                  { icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", label: "Discovery", isStart: true },
                  { icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", label: "Brief" },
                  { icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z", label: "Mockup" },
                  { icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01", label: "Production" },
                  { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: "QC & Pack" },
                  { icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4", label: "Shipping" },
                  { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Delivery", isEnd: true },
                ];
                const rows: any[][] = [];
                for (let i = 0; i < steps.length; i += 2) rows.push(steps.slice(i, i + 2));
                return rows.map((row, rowIdx) => {
                  const isEven = rowIdx % 2 === 0;
                  const displayRow = isEven ? row : [...row].reverse();
                  return (
                    <div key={rowIdx}>
                      <div className="flex items-center justify-center gap-4">
                        {displayRow.map((step: any, colIdx: number) => (
                          <div key={colIdx} className="flex items-center gap-3">
                            <div className="flex flex-col items-center">
                              <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${step.isStart || step.isEnd ? 'bg-[#BFF000] text-black border-[#BFF000]' : 'bg-transparent text-white border-white/50'}`}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={step.icon} />
                                </svg>
                              </div>
                              <span className={`mt-1.5 text-xs font-medium text-center ${step.isStart || step.isEnd ? 'text-[#BFF000]' : 'text-white'}`}>{step.label}</span>
                            </div>
                            {colIdx < displayRow.length - 1 && (
                              <div className="w-12 h-px bg-[#BFF000]/40 flex-shrink-0" />
                            )}
                          </div>
                        ))}
                      </div>
                      {rowIdx < rows.length - 1 && (
                        <div className={`flex my-2 ${isEven ? 'justify-end pr-10' : 'justify-start pl-10'}`}>
                          <div className="w-px h-8 bg-[#BFF000]/40" />
                        </div>
                      )}
                    </div>
                  );
                });
              })()}
              <p className="text-center text-[10px] text-gray-500 mt-4">
                <span className="text-[#BFF000]">*</span> Samples on request
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="min-h-screen bg-black relative flex items-center justify-center pt-24 pb-12 md:pt-28 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-32 h-32 border-r-2 border-t-2 border-[#BFF000]/15 rounded-tr-3xl" />
          <div className="absolute bottom-10 left-10 w-32 h-32 border-l-2 border-b-2 border-[#BFF000]/15 rounded-bl-3xl" />
          <motion.div 
            animate={{ opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full border border-[#BFF000]/10"
          />
          <div className="absolute top-1/3 left-0 w-32 h-px bg-gradient-to-r from-[#BFF000]/30 to-transparent" />
          <div className="absolute bottom-1/3 right-0 w-32 h-px bg-gradient-to-l from-[#BFF000]/30 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-10 md:mb-12"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              Products
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-[#BFF000]"
            >
              Premium merchandise across every category.
            </motion.p>
          </motion.div>

          {/* 3x3 Product Categories Grid */}
          <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            {[
              { name: "Apparel", img: "/images/products/apparels.jpg", cols: 3, rows: 3, items: ["Round Neck T-Shirt", "Polo T-Shirt", "Hoodie", "Puffer Jacket", "Kimono", "Shorts", "Jersey", "Oversized T-Shirt", "Joggers"] },
              { name: "Accessories", img: "/images/products/accessories.jpg", cols: 3, rows: 4, items: ["Baseball Cap", "Bucket Hat", "Beanie", "Sleep Mask", "Balaclava", "Neck Pillow", "Gloves", "Socks", "Scarf", "Bandana", "Sneakers", "Sliders"] },
              { name: "Bags & More", img: "/images/products/bags.jpg", cols: 3, rows: 3, items: ["Backpack", "Sling Bag", "Tote Bag", "Fanny Pack", "Laptop Bag", "", "Duffle Bag", "Laptop Cover", "Pouches"] },
              { name: "Leather Items", img: "/images/products/leather.jpg", cols: 3, rows: 2, items: ["Sunglass Case", "Wallet", "Leather Tray", "Passport Cover", "Coaster", "Luggage Tag"] },
              { name: "Drinkware", img: "/images/products/drinkwares.jpg", cols: 4, rows: 2, items: ["Ceramic Mug", "Cold Cup", "Steel Bottle", "Glass Tumbler", "Sipper", "Protein Shaker", "Stanley Cup", "Travel Mug"] },
              { name: "Gadgets", img: "/images/products/gadgets.jpg", cols: 4, rows: 4, items: ["Humidifier", "Uni-Adapter", "Tripod", "Speaker", "Power Bank", "Aroma Diffuser", "Yo-Yo Cable", "Connectors", "Headphone", "LED Backpack", "Webcam", "Earbuds", "", "Portable Fan", "Table Lamp", ""] },
              { name: "Stationery", img: "/images/products/stationery.jpg", cols: 4, rows: 2, items: ["Diaries & Notebooks", "Pens & Pencils", "Bookmark", "Desk Mat", "Mobile Stand", "Table Clock", "Pen Stand", "Card Holder"] },
              { name: "Events & More", img: "/images/products/events.jpg", cols: 3, rows: 3, items: ["ID Cards", "Lanyards", "Wrist Bands", "Table Tops", "Backdrop", "LED Boxes", "Standees", "Banners", "Cards & Pamphlets"] },
              { name: "Miscellaneous", img: "/images/products/miscellaneous.jpg", cols: 3, rows: 3, items: ["Plushies", "Stress Ball", "Coasters", "Gift Boxes", "Gift Paper Bags", "Keyrings & Stickers", "Enamel Pins", "Pop-Sockets", "Calendar"] },
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="group cursor-pointer"
                onClick={() => category.img && setSelectedCategory(category)}
              >
                <div className="aspect-square rounded-xl overflow-hidden border border-white/10 relative transition-all duration-300 hover:border-[#BFF000]/50 hover:shadow-lg hover:shadow-[#BFF000]/10">
                  {category.img ? (
                    <>
                      <img
                        src={category.img || "/placeholder.svg"}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                        </svg>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-white/5 flex items-center justify-center">
                      <svg className="w-10 h-10 md:w-12 md:h-12 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                </div>
                <p className="mt-2 text-center text-xs md:text-sm font-medium text-white/80 group-hover:text-[#BFF000] transition-colors">
                  {category.name}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Category Lightbox - Full Screen */}
          <AnimatePresence>
            {selectedCategory && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer"
                onClick={() => setSelectedCategory(null)}
              >
                <div className="absolute inset-0 bg-black" />
                <motion.div
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.92, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  {/* Category title top-left */}
                  <div className="absolute top-5 left-5 md:top-8 md:left-8 z-20">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#BFF000]">
                      {selectedCategory.name}
                    </h3>
                  </div>

                  {/* Image with labels overlaid under each product */}
                  <div className="relative w-full h-full flex items-center justify-center p-6 md:p-12" onClick={(e) => e.stopPropagation()}>
                    <div className="relative aspect-square" style={{ height: "min(85vh, 85vw)" }}>
                      <img
                        src={selectedCategory.img || "/placeholder.svg"}
                        alt={selectedCategory.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      {/* Label overlay grid - each label sits at bottom of its cell, under the product */}
                      {selectedCategory.items && selectedCategory.items.length > 0 && (
                        <div
                          className="absolute inset-0 pointer-events-none rounded-lg"
                          style={{
                            display: "grid",
                            gridTemplateColumns: `repeat(${selectedCategory.cols || 3}, 1fr)`,
                            gridTemplateRows: `repeat(${selectedCategory.rows || 3}, 1fr)`,
                          }}
                        >
                          {selectedCategory.items.map((label, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: label ? 1 : 0 }}
                              transition={{ delay: 0.3 + i * 0.05 }}
                              className="relative flex items-end justify-center"
                            >
                              {label && (
                                <span className="text-gray-400 text-[7px] md:text-[11px] font-normal whitespace-nowrap mb-1 md:mb-1.5">
                                  {label}
                                </span>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="text-center mt-8">
            <span className="text-xs text-gray-500">
              <span className="text-[#BFF000]">*</span> DM for IRL catalogs
            </span>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="min-h-screen bg-black relative flex items-center justify-center pt-24 pb-12 md:pt-28 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 border-l-2 border-t-2 border-[#BFF000]/15 rounded-tl-3xl" />
          <div className="absolute bottom-10 right-10 w-32 h-32 border-r-2 border-b-2 border-[#BFF000]/15 rounded-br-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-10 md:mb-12"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-bold mb-4 text-white"
            >
              Gallery
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-[#BFF000]"
            >
              A glimpse at what we create.
            </motion.p>
          </motion.div>

          {/* Gallery Lightbox - click outside to close */}
          <AnimatePresence>
            {lightboxImg && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
                onClick={() => setLightboxImg(null)}
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                  className="relative max-w-4xl max-h-[90vh] w-full cursor-default"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img src={lightboxImg} alt="Gallery" className="w-full h-auto max-h-[85vh] object-contain rounded-lg select-none" draggable={false} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Gallery Masonry Grid - balanced 4 columns desktop, 2 columns mobile */}
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2">
            {/* Column 1 — 6 items (removed eigencloud, moved to col3) */}
            <div className="flex flex-col gap-2">
              {[
                { src: "/images/gallery/ethindia-flatlay.png", alt: "ETHIndia branded merch flat-lay" },
                { src: "/images/gallery/debridge-hoodie.jpg", alt: "deBridge branded yellow hoodie" },
                { src: "/images/gallery/wave-kimono.jpg", alt: "Custom wave print kimono at event" },
                { src: "/images/gallery/fhe-summit.jpg", alt: "FHE Summit branded t-shirts" },
                { src: "/images/gallery/ethindia-tote-bag.jpg", alt: "ETHIndia illustrated tote bag" },
                { src: "/images/gallery/socket-box.jpg", alt: "Socket branded merch gift box" },
              ].map((img, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="overflow-hidden rounded-lg border border-white/10 cursor-pointer hover:border-[#BFF000]/50 transition-all" onClick={() => setLightboxImg(img.src)}>
                  <img src={img.src} alt={img.alt} className="w-full h-auto block hover:scale-105 transition-transform duration-300" />
                </motion.div>
              ))}
            </div>

            {/* Column 2 — 9 items (added ethglobal-cannes-tote + arbitrum-event from col4) */}
            <div className="flex flex-col gap-2">
              {[
                { src: "/images/gallery/event-capes.png", alt: "Branded capes at conference" },
                { src: "/images/gallery/cdp-backpack-ethindia.jpg", alt: "CDP backpack and merch at ETHIndia" },
                { src: "/images/gallery/story-merch.jpg", alt: "Story Protocol branded merch" },
                { src: "/images/gallery/ethmumbai-tote.jpg", alt: "ETHMumbai branded red tote bag" },
                { src: "/images/gallery/multipli-set.png", alt: "Multipli branded black merch set" },
                { src: "/images/gallery/og-socks-ethglobal.jpg", alt: "OG branded socks at ETHGlobal" },
                { src: "/images/gallery/aethir-merch.jpg", alt: "Aethir branded t-shirts and stickers" },
                { src: "/images/gallery/ethglobal-cannes-tote.jpg", alt: "ETHGlobal Cannes illustrated tote bag" },
                { src: "/images/gallery/arbitrum-event.jpg", alt: "Arbitrum Open House event" },
              ].map((img, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 + 0.03 }}
                  className="overflow-hidden rounded-lg border border-white/10 cursor-pointer hover:border-[#BFF000]/50 transition-all" onClick={() => setLightboxImg(img.src)}>
                  <img src={img.src} alt={img.alt} className="w-full h-auto block hover:scale-105 transition-transform duration-300" />
                </motion.div>
              ))}
            </div>

            {/* Column 3 — 9 items (added eigencloud from col1 + fluent-blend from col4) */}
            <div className="flex flex-col gap-2">
              {[
                { src: "/images/gallery/gpu-rich-tees.jpg", alt: "GPU Rich branded t-shirts" },
                { src: "/images/gallery/katerina-leather-set.jpg", alt: "Custom leather accessories gift set" },
                { src: "/images/gallery/chain-abstraction-mafia.jpg", alt: "Chain Abstraction Mafia team t-shirts" },
                { src: "/images/gallery/altlayer-tshirts.jpg", alt: "AltLayer branded t-shirts display" },
                { src: "/images/gallery/talus-box.jpg", alt: "Talus branded merch gift box" },
                { src: "/images/gallery/biconomy-tshirt-varanasi.jpg", alt: "Biconomy t-shirt at Varanasi ghats" },
                { src: "/images/gallery/ethglobal-swag-bag.jpg", alt: "ETHGlobal New Delhi swag bag" },
                { src: "/images/gallery/eigencloud-sunglasses.jpg", alt: "EigenCloud branded sunglasses" },
                { src: "/images/gallery/fluent-blend.jpg", alt: "Fluent and Blend branded t-shirts" },
              ].map((img, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 + 0.02 }}
                  className="overflow-hidden rounded-lg border border-white/10 cursor-pointer hover:border-[#BFF000]/50 transition-all" onClick={() => setLightboxImg(img.src)}>
                  <img src={img.src} alt={img.alt} className="w-full h-auto block hover:scale-105 transition-transform duration-300" />
                </motion.div>
              ))}
            </div>

            {/* Column 4 — 7 items (moved last 2 to col2) */}
            <div className="flex flex-col gap-2">
              {[
                { src: "/images/gallery/notlikesus-hoodie.jpg", alt: "Not Like Sus custom hoodie back print" },
                { src: "/images/gallery/copperx-cap.jpg", alt: "Copperx branded visor cap" },
                { src: "/images/gallery/fluent-merch-table.jpg", alt: "Fluent merch table at event" },
                { src: "/images/gallery/openhouse-merch.png", alt: "Open House Arbitrum merch" },
                { src: "/images/gallery/devcon-leather-wallet.jpg", alt: "Devcon leather wallet and accessories" },
                { src: "/images/gallery/akave-socks.png", alt: "AKAVE branded socks" },
                { src: "/images/gallery/1inch-merch.jpg", alt: "1inch branded merch set flat-lay" },
              ].map((img, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 + 0.05 }}
                  className="overflow-hidden rounded-lg border border-white/10 cursor-pointer hover:border-[#BFF000]/50 transition-all" onClick={() => setLightboxImg(img.src)}>
                  <img src={img.src} alt={img.alt} className="w-full h-auto block hover:scale-105 transition-transform duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <section id="clients" className="min-h-screen bg-black relative flex items-center justify-center pt-24 pb-20 scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.5, rotateZ: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-white"
            >
              Our Clients
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-[#BFF000]"
            >
              Trusted by 100+ leading Web3 companies and organizations worldwide
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-8"
          >
            <ClientLogosBanner />
          </motion.div>

        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="min-h-screen bg-black relative flex items-center justify-center pt-24 pb-20 scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: -50, rotateX: -90 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-white"
            >
              Testimonials
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-[#BFF000]"
            >
              What our clients say about us
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote: "The founders really liked the jacket quality.",
                author: "Siddharth",
                company: "Qiro",
              },
              {
                quote: "Shared these with the design team, they were pleased with the stitch work.",
                author: "Liza",
                company: "The Graph",
              },
              {
                quote: "Btw Team! The windcheaters are actually sick! Great Job! Getting you all some new clients for sure.",
                author: "Aditi",
                company: "Arbitrum",
              },
              {
                quote: "Epic work! Thanks for all the hard work with the swag, really appreciate it!",
                author: "Calvin",
                company: "Ethereum Foundation",
              },
              {
                quote: "I am in love with the backdrop, it's so bright! Thank you so much for your help and great work on the matter.",
                author: "Lisa",
                company: "ETHGlobal",
              },
              {
                quote: "Hey yes, I've received it and I am actually wearing one of them right now. The print and the t-shirt quality is fabulous.",
                author: "Pratik",
                company: "Superteam",
              },
              {
                quote: "Hey guys, the merch is amazing!! Super high quality!",
                author: "Jonnie",
                company: "deBridge",
              },
              {
                quote: "Thanks again for everything. It was wonderful getting to work with your team especially with the quick turnaround.",
                author: "LFGAmy",
                company: "EigenCloud",
              },
              {
                quote: "Merch was great thanks!! Very Popular!",
                author: "Aparna",
                company: "AltLayer",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100, rotateX: -45 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  type: "spring",
                  bounce: 0.4,
                }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(191, 255, 0, 0.1)",
                }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 transform-gpu"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  className="text-3xl text-[#BFF000] mb-4"
                >
                  "
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                  className="text-gray-300 mb-6"
                >
                  {testimonial.quote}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                >
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">{testimonial.company}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + Contact + Footer Section */}
      <section id="contact" className="min-h-screen bg-black flex items-center justify-center">
        <div className="container mx-auto px-4 py-32">
          {/* FAQ Section */}
          <div id="faq" className="mb-32 pt-20 -mt-20">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-5xl font-bold mb-4 text-white"
              >
                FAQ
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-[#BFF000]"
              >
                Answers to frequently asked questions
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <Accordion type="single" collapsible className="space-y-3">
                {[
                  {
                    question: "What is the minimum order quantity?",
                    answer:
                      "Our minimum order quantity is typically 50 units for standard items like t-shirts and hoodies. For accessories and specialty items, MOQ may vary. We also offer smaller runs for premium or limited-edition drops — reach out and we'll work with your budget.",
                  },
                  {
                    question: "How long does production take?",
                    answer:
                      "Standard production takes 2–3 weeks from design approval. We offer expedited production (7–10 days) for urgent event needs. For large orders (500+ units) we recommend 3–4 weeks to maintain quality. Rush timelines are available — contact us to discuss.",
                  },
                  {
                    question: "Do you ship internationally?",
                    answer:
                      "Yes, we ship to 150+ countries worldwide. We've fulfilled orders for events in the US, Europe, Southeast Asia, and beyond. International shipping costs and timelines vary by destination — we'll provide a full quote upfront.",
                  },
                  {
                    question: "Can I pay with crypto?",
                    answer:
                      "Absolutely — we accept USDC, USDT, ETH, and other major tokens. We're one of the few merch partners fully set up for crypto-native payments. Traditional wire transfer and card payments are also accepted.",
                  },
                  {
                    question: "Do you provide design help?",
                    answer:
                      "Yes! Our in-house design team can work from your brand guidelines, logo files, or even a rough idea. We'll create mockups for approval before production begins. Design assistance is included for orders above a certain quantity — contact us for details.",
                  },
                  {
                    question: "Can I get samples before the full order?",
                    answer:
                      "Yes, samples are available on request. We recommend ordering samples for large runs so you can approve the quality, fit, and print before we proceed. Sample costs are typically credited toward your final order.",
                  },
                  {
                    question: "What kind of customisation is available?",
                    answer:
                      "Almost everything is customisable — fabric, colour, cut, print method (screen print, embroidery, DTG, sublimation), labels, tags, and packaging. We also offer NFC-enabled merch and RFID-protected bags for Web3-native experiences.",
                  },
                  {
                    question: "How do I get started?",
                    answer:
                      "Fill out the contact form below or reach us on Telegram (@siddyb26 or @aoife05). Share your brief — what you need, quantities, timeline, and any design references — and we'll respond within 24 hours with a quote.",
                  },
                ].map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index + 1}`}
                    className="border-white/10 rounded-lg overflow-hidden"
                  >
                    <AccordionTrigger className="px-4 py-3 bg-white/5 hover:bg-white/10 text-left font-medium text-sm text-white hover:text-[#BFF000] transition-colors [&[data-state=open]]:text-[#BFF000]">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent forceMount className="px-4 py-3 text-gray-400 text-sm data-[state=closed]:hidden">
                      {item.answer.includes('@siddyb26') ? (
                        <>
                          Fill out the contact form below or reach us on Telegram ({' '}
                          <a href="https://t.me/siddyb26" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#BFF000] transition-colors">@siddyb26</a>
                          {' '}or{' '}
                          <a href="https://t.me/aoife05" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#BFF000] transition-colors">@aoife05</a>
                          ). Share your brief — what you need, quantities, timeline, and any design references — and we'll respond within 24 hours with a quote.
                        </>
                      ) : item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>

          {/* Contact Section */}
          <motion.div
            id="contact-form"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto pt-20 -mt-20"
          >
            {/* Left Side - Contact Info */}
            <div className="space-y-8">
              <div>
                <motion.h2
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight"
                >
                  Let's Cook Up Something Sick Together
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg text-[#BFF000] mb-8 max-w-lg"
                >
                  Got a wild idea brewing? Ready to turn your brand into the talk of every Web3 event? Hit us up and
                  let's make some magic happen! ✨
                </motion.p>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                {[
                  {
                    icon: "telegram",
                    title: "Telegram",
                    contact: "@siddyb26 · @aoife05",
                    href: "https://t.me/siddyb26",
                    href2: "https://t.me/aoife05",
                  },
                  {
                    icon: "email",
                    title: "Email",
                    contact: "sickwear.xyz@gmail.com",
                    href: "mailto:sickwear.xyz@gmail.com",
                  },
                  {
                    icon: "twitter",
                    title: "Twitter",
                    contact: "@sickwear_xyz",
                    href: "https://x.com/sickwear_xyz",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                      {item.icon === "telegram" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-[#BFF000]"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                        </svg>
                      )}
                      {item.icon === "email" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-[#BFF000]"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                      )}
                      {item.icon === "twitter" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-[#BFF000]"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                      {item.href2 ? (
                        <div className="flex gap-3">
                          <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#BFF000] transition-colors">@siddyb26</a>
                          <span className="text-gray-600">·</span>
                          <a href={item.href2} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#BFF000] transition-colors">@aoife05</a>
                        </div>
                      ) : (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#BFF000] transition-colors">{item.contact}</a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="pt-6 border-t border-white/10"
              >
                <p className="text-sm text-gray-400 mb-4">Follow us on social media</p>
                <div className="flex space-x-4">
                  <a
                    href="https://x.com/sickwear_xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-[#BFF000]/20 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#BFF000]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="https://t.me/sickweareth"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-[#BFF000]/20 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#BFF000]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8"
            >
              <h3 className="text-2xl font-bold text-[#BFF000] mb-6">Drop us a message</h3>

              {/* Success/Error Messages */}
              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <p className="text-green-400 text-sm">Message sent successfully! We'll get back to you soon.</p>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center space-x-3"
                  >
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    <p className="text-red-400 text-sm">
                      Failed to send message. Your email client should open as backup.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="_to" value="sickwear.xyz@gmail.com" />
                <input type="hidden" name="_subject" value="New Contact Form Submission" />

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#BFF000] focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#BFF000] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="telegramId" className="block text-sm font-medium text-white/80 mb-2">
                      Telegram ID
                    </label>
                    <input
                      type="text"
                      id="telegramId"
                      name="telegramId"
                      placeholder="@yourusername"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#BFF000] focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      placeholder="Your company name"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#BFF000] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us about your project"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#BFF000] focus:border-transparent transition-all resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full bg-[#BFF000] hover:bg-[#BFF000]/90 disabled:bg-[#BFF000]/50 text-black font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>

        </div>
      </section>

      

      {/* Full Footer */}
      <footer className="bg-black border-t border-white/10">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="text-2xl font-black mb-4">
                <span className="text-white">SICK</span><span className="text-[#BFF000]">WEAR</span>
              </div>
              <p className="text-gray-400 text-sm max-w-xs leading-relaxed mb-6">
                The #1 Web3 merchandise partner for global communities. Premium custom merch, made in India, shipped worldwide.
              </p>
              <div className="flex gap-3">
                <a href="https://x.com/sickwear_xyz" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#BFF000] hover:bg-[#BFF000]/10 transition-all">
                  <svg className="w-4 h-4 text-[#BFF000]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="https://t.me/sickweareth" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#BFF000] hover:bg-[#BFF000]/10 transition-all">
                  <svg className="w-4 h-4 text-[#BFF000]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { label: "Features", href: "#features" },
                  { label: "Products", href: "#products" },
                  { label: "Gallery", href: "#gallery" },
                  { label: "Clients", href: "#clients" },
                  { label: "FAQ", href: "#faq" },
                  { label: "Contact", href: "#contact-form" },
                ].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-gray-400 text-sm hover:text-[#BFF000] transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact</h4>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:sickwear.xyz@gmail.com" className="text-gray-400 text-sm hover:text-[#BFF000] transition-colors flex items-center gap-2">
                    <span className="text-[#BFF000]">✉</span> sickwear.xyz@gmail.com
                  </a>
                </li>
                <li>
                  <a href="https://t.me/siddyb26" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-[#BFF000] transition-colors flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-[#BFF000] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
                    @siddyb26 <span className="text-gray-600 text-xs">(Founder)</span>
                  </a>
                </li>
                <li>
                  <a href="https://t.me/aoife05" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-[#BFF000] transition-colors flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-[#BFF000] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
                    @aoife05 <span className="text-gray-600 text-xs">(Co-founder)</span>
                  </a>
                </li>
                <li>
                  <a href="https://x.com/sickwear_xyz" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-[#BFF000] transition-colors flex items-center gap-2">
                    <span className="text-[#BFF000]">𝕏</span> @sickwear_xyz
                  </a>
                </li>
                <li className="pt-2">
                  <span className="text-gray-500 text-xs">🇮🇳 Made in India · Shipped Worldwide</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Sickwear. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="/brand" className="text-xs text-gray-500 hover:text-[#BFF000] transition-colors">Brand Guidelines</a>
              <a href="/overview" className="text-xs text-gray-500 hover:text-[#BFF000] transition-colors">Overview</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
