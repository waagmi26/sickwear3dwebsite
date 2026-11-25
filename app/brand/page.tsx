"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, ArrowRight } from "lucide-react"

export default function BrandPage() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const colorPalette = [
    { name: "Sick Green", hex: "#BFF000", rgb: "191, 255, 0", class: "bg-[#BFF000] text-black" },
    { name: "Sick Black", hex: "#000000", rgb: "0, 0, 0", class: "bg-black text-white" },
    { name: "Sick White", hex: "#FFFFFF", rgb: "255, 255, 255", class: "bg-white text-black border border-gray-200" },
    { name: "Sick Blue", hex: "#4169E1", rgb: "65, 105, 225", class: "bg-[#4169E1] text-white" },
    { name: "Sick Gray", hex: "#1A1A1A", rgb: "26, 26, 26", class: "bg-[#1A1A1A] text-white" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md py-3">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold flex items-center">
            <span className="text-white">Sick</span>
            <span className="text-[#BFF000]">wear</span>
          </Link>
          <Button asChild variant="outline" className="rounded-full border-white/20 hover:bg-white/10 bg-transparent">
            <Link href="/">
              Back to Home <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#BFF000]/20 via-black to-black"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Sickwear <span className="text-[#BFF000]">Brand</span> Guidelines
            </h1>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Our brand identity is bold, playful, and distinctive. These guidelines ensure consistency across all
              touchpoints.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { src: "/images/sickwear-logo.svg", alt: "Sickwear primary logo", bg: "bg-black" },
                { src: "/images/sickwear-logo-mono-black.svg", alt: "Sickwear black logo", bg: "bg-white" },
                { src: "/images/sickwear-og.jpg", alt: "Sickwear logo with tagline", bg: "bg-black" },
                { src: "/images/sickwear-logo-mono-white.svg", alt: "Sickwear white logo", bg: "bg-black" },
              ].map((logo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`aspect-square ${logo.bg} border border-white/10 rounded-xl p-6 flex items-center justify-center`}
                >
                  <Image
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.alt}
                    width={150}
                    height={150}
                    className="w-full h-auto"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand Elements */}
      <section className="py-20 bg-gradient-to-b from-black to-[#1A1A1A]">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="logo" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-12">
              <TabsTrigger value="logo">Logo</TabsTrigger>
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="typography">Typography</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
            </TabsList>

            <TabsContent value="logo" className="mt-6">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Logo Specifications</h2>
                  <p className="text-white/70 mb-6">
                    The Sickwear logo pairs a shaka hand sign with a bold, rounded wordmark. The playful shapes
                    represent creativity, energy, and the brand's dynamic nature.
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#BFF000] mr-3"></div>
                      <p>Always maintain clear space around the logo</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#BFF000] mr-3"></div>
                      <p>Never stretch or distort the logo</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#BFF000] mr-3"></div>
                      <p>Minimum size: 30px height for digital, 10mm for print</p>
                    </div>
                  </div>
                  <Button className="bg-[#BFF000] text-black hover:bg-[#BFF000]/90">Download Logo Pack</Button>
                </div>
                <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-8 flex items-center justify-center">
                  <Image
                    src="/images/sickwear-logo.svg"
                    alt="Sickwear Logo Specifications"
                    width={300}
                    height={300}
                    className="w-full max-w-[300px] h-auto"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="colors" className="mt-6">
              <h2 className="text-3xl font-bold mb-6">Color Palette</h2>
              <p className="text-white/70 mb-8 max-w-3xl">
                Our color palette is bold and high-contrast, centered around our signature Sick Green. This vibrant
                color represents energy, creativity, and the disruptive nature of Web3.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
                {colorPalette.map((color, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="rounded-xl overflow-hidden"
                  >
                    <div className={`h-32 ${color.class}`}></div>
                    <div className="bg-white/5 p-4">
                      <h3 className="font-bold mb-1">{color.name}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white/70">{color.hex}</span>
                        <button
                          onClick={() => copyToClipboard(color.hex, `${color.name}-hex`)}
                          className="text-white/50 hover:text-white"
                          aria-label={`Copy ${color.name} hex code`}
                        >
                          {copied === `${color.name}-hex` ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-white/70">RGB {color.rgb}</span>
                        <button
                          onClick={() => copyToClipboard(`rgb(${color.rgb})`, `${color.name}-rgb`)}
                          className="text-white/50 hover:text-white"
                          aria-label={`Copy ${color.name} RGB code`}
                        >
                          {copied === `${color.name}-rgb` ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-[#BFF000]/10 to-[#BFF000]/5 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Color Usage Guidelines</h3>
                <ul className="space-y-2 text-white/70">
                  <li>• Use Sick Green as the primary accent color for maximum impact</li>
                  <li>• Maintain high contrast between text and background colors</li>
                  <li>• Black and Sick Green is our signature color combination</li>
                  <li>• Use Sick Blue for secondary accents and variety</li>
                  <li>• White text on dark backgrounds for maximum readability</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="typography" className="mt-6">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Typography</h2>
                  <p className="text-white/70 mb-6">
                    Our typography is bold, clear, and modern. We use a combination of fonts that reflect our brand's
                    personality: bold, playful yet professional.
                  </p>

                  <div className="space-y-8 mb-8">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Primary Font: Geist</h3>
                      <p className="text-white/70 mb-4">Used for body text, UI elements, and general content.</p>
                      <div className="space-y-2">
                        <div className="font-normal">Geist Regular - The quick brown fox jumps over the lazy dog</div>
                        <div className="font-medium">Geist Medium - The quick brown fox jumps over the lazy dog</div>
                        <div className="font-bold">Geist Bold - The quick brown fox jumps over the lazy dog</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-2">Display Font: Clash Display</h3>
                      <p className="text-white/70 mb-4">Used for headings, large text, and impactful statements.</p>
                      <div className="space-y-2">
                        <div className="text-2xl font-bold">Headings & Titles</div>
                        <div className="text-4xl font-bold">BOLD STATEMENTS</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4">Heading Hierarchy</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-4xl font-bold mb-1">H1 Heading</div>
                        <div className="text-white/50 text-sm">48px / Bold / 1.1 Line Height</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold mb-1">H2 Heading</div>
                        <div className="text-white/50 text-sm">36px / Bold / 1.2 Line Height</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold mb-1">H3 Heading</div>
                        <div className="text-white/50 text-sm">24px / Bold / 1.3 Line Height</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold mb-1">H4 Heading</div>
                        <div className="text-white/50 text-sm">20px / Bold / 1.4 Line Height</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4">Body Text</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-lg mb-1">Large Body</div>
                        <div className="text-white/50 text-sm">18px / Regular / 1.5 Line Height</div>
                      </div>
                      <div>
                        <div className="text-base mb-1">Regular Body</div>
                        <div className="text-white/50 text-sm">16px / Regular / 1.5 Line Height</div>
                      </div>
                      <div>
                        <div className="text-sm mb-1">Small Body</div>
                        <div className="text-white/50 text-sm">14px / Regular / 1.5 Line Height</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="usage" className="mt-6">
              <h2 className="text-3xl font-bold mb-6">Brand Usage</h2>
              <div className="grid md:grid-cols-2 gap-12 mb-12">
                <div>
                  <h3 className="text-xl font-bold mb-4">Do's</h3>
                  <ul className="space-y-3 text-white/80">
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3 mt-1">
                        <Check className="h-3 w-3 text-black" />
                      </div>
                      Use the logo on contrasting backgrounds for visibility
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3 mt-1">
                        <Check className="h-3 w-3 text-black" />
                      </div>
                      Maintain the logo's proportions when scaling
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3 mt-1">
                        <Check className="h-3 w-3 text-black" />
                      </div>
                      Use approved color combinations
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3 mt-1">
                        <Check className="h-3 w-3 text-black" />
                      </div>
                      Keep adequate clear space around the logo
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3 mt-1">
                        <Check className="h-3 w-3 text-black" />
                      </div>
                      Use the brand voice: bold, playful, and confident
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Don'ts</h3>
                  <ul className="space-y-3 text-white/80">
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center mr-3 mt-1">
                        <div className="h-3 w-0.5 bg-black rotate-45"></div>
                        <div className="h-3 w-0.5 bg-black -rotate-45 absolute"></div>
                      </div>
                      Stretch or distort the logo
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center mr-3 mt-1">
                        <div className="h-3 w-0.5 bg-black rotate-45"></div>
                        <div className="h-3 w-0.5 bg-black -rotate-45 absolute"></div>
                      </div>
                      Use the logo on busy backgrounds that reduce visibility
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center mr-3 mt-1">
                        <div className="h-3 w-0.5 bg-black rotate-45"></div>
                        <div className="h-3 w-0.5 bg-black -rotate-45 absolute"></div>
                      </div>
                      Add effects like shadows or outlines to the logo
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center mr-3 mt-1">
                        <div className="h-3 w-0.5 bg-black rotate-45"></div>
                        <div className="h-3 w-0.5 bg-black -rotate-45 absolute"></div>
                      </div>
                      Use colors outside our approved palette
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center mr-3 mt-1">
                        <div className="h-3 w-0.5 bg-black rotate-45"></div>
                        <div className="h-3 w-0.5 bg-black -rotate-45 absolute"></div>
                      </div>
                      Modify or recreate the logo in any way
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#BFF000]/10 to-black rounded-xl p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Merchandise Application</h3>
                    <p className="text-white/70 mb-6">
                      Our brand comes to life on our merchandise. The logo should be prominently displayed and maintain
                      its integrity across all products.
                    </p>
                    <Button className="bg-[#BFF000] text-black hover:bg-[#BFF000]/90">
                      View Merchandise Guidelines
                    </Button>
                  </div>
                  <div>
                    <Image
                      src="/images/sickwear-merch-display.png"
                      alt="Sickwear Merchandise Display"
                      width={500}
                      height={300}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12">
        <div className="container mx-auto px-4 text-center">
          <Link href="/" className="text-2xl font-bold flex items-center justify-center mb-6">
            <span className="text-white">Sick</span>
            <span className="text-[#BFF000]">wear</span>
          </Link>
          <p className="text-white/60 text-sm max-w-md mx-auto">
            For any brand-related questions or to request brand assets, please contact our marketing team.
          </p>
          <div className="mt-8">
            <Button asChild variant="outline" className="rounded-full border-white/20 hover:bg-white/10 bg-transparent">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
          <div className="mt-12 pt-6 border-t border-white/10 text-center text-sm text-white/40">
            <p>© {new Date().getFullYear()} Sickwear. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
