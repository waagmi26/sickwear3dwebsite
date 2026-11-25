"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import GlobalMap from "@/components/global-map"

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md py-3">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ x: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="flex items-center gap-2 relative"
            >
              <ArrowLeft className="w-5 h-5 text-white/60 group-hover:text-[#BFF000] transition-colors" />
              <Image
                src="/images/sickwear-logo-mono-white.svg"
                alt="Sickwear"
                width={739}
                height={574}
                className="h-16 w-auto transition-all duration-300 group-hover:opacity-0"
                style={{ background: "transparent" }}
                priority
              />
              <Image
                src="/images/sickwear-logo.svg"
                alt="Sickwear"
                width={739}
                height={574}
                className="h-16 w-auto absolute top-0 left-7 transition-all duration-300 opacity-0 group-hover:opacity-100"
                style={{ background: "transparent" }}
                priority
              />
            </motion.div>
          </Link>
        </div>
      </header>

      {/* Push content below fixed header */}
      <div className="pt-24">
        <GlobalMap />
      </div>

      {/* Back to Home Footer */}
      <div className="bg-black py-8 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#BFF000] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
