"use client"

import { motion } from "framer-motion"
import ClientLogosBanner from "./client-logos-banner"

export default function ClientLogos() {
  return (
    <section id="clients" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Clients</h2>
          <p className="text-xl text-white/70">Trusted by 150+ leading Web3 companies and organizations worldwide</p>
        </motion.div>

        {/* Client Logos Banner */}
        <ClientLogosBanner />

        <div className="mt-12 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-white/70 italic"
          >
            "Sickwear has been our go-to merchandise partner for all our global events. Their quality and attention to
            detail is unmatched."
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-white/90 font-medium mt-2"
          >
            — ETHGlobal Team
          </motion.p>
        </div>
      </div>
    </section>
  )
}
