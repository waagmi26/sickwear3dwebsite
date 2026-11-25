import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sickwear.xyz"),
  title: {
    default: "Sickwear – #1 Web3 Merch & Merchandise Partner for Global Communities",
    template: "%s | Sickwear",
  },
  description:
    "Sickwear is the leading Web3 merchandise partner trusted by 80+ global companies including Coinbase, ETHGlobal, OKX, Polkadot & LayerZero. Premium custom merch, global shipping, crypto payments. Made in India.",
  keywords: [
    "web3 merch",
    "web3 merchandise",
    "crypto merch",
    "NFT merchandise",
    "DAO merchandise",
    "blockchain merchandise",
    "web3 community merch",
    "custom merch india",
    "web3 event merchandise",
    "ETHGlobal merch",
    "crypto hoodie",
    "web3 tshirt",
    "custom hoodies india",
    "merch for startups",
    "b2b merch partner",
    "sickwear",
    "sickwear.xyz",
  ],
  authors: [{ name: "Sickwear", url: "https://www.sickwear.xyz" }],
  creator: "Sickwear",
  publisher: "Sickwear",
  category: "ecommerce",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.sickwear.xyz",
    siteName: "Sickwear",
    title: "Sickwear – #1 Web3 Merch Partner for Global Communities",
    description:
      "Premium Web3 merchandise trusted by Coinbase, ETHGlobal, OKX, Polkadot & 80+ global companies. Custom merch, global shipping, crypto payments.",
    images: [
      {
        url: "/images/sickwear-og.jpg",
        width: 1200,
        height: 630,
        alt: "Sickwear – Web3 Merch Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sickwear_xyz",
    creator: "@sickwear_xyz",
    title: "Sickwear – #1 Web3 Merch Partner",
    description:
      "Premium Web3 merchandise trusted by 80+ global companies. Custom merch, global shipping, crypto payments.",
    images: ["/images/sickwear-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.sickwear.xyz",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="canonical" href="https://www.sickwear.xyz" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Sickwear",
              url: "https://www.sickwear.xyz",
              logo: "https://www.sickwear.xyz/images/sickwear-logo-square.png",
              description:
                "Sickwear is the #1 Web3 merchandise partner trusted by 80+ global companies. Premium custom merch with global shipping and crypto payments.",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                email: "sickwear.xyz@gmail.com",
                availableLanguage: "English",
              },
              sameAs: [
                "https://x.com/sickwear_xyz",
                "https://t.me/sickweareth",
              ],
              areaServed: "Worldwide",
              foundingLocation: "India",
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
