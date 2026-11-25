import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sickwear.xyz"),
  title: {
    default: "Sickwear – Web3, Event & Personalized Merch Partner",
    template: "%s | Sickwear",
  },
  description:
    "Custom Web3, event & personalized merch trusted by 150+ clients including Coinbase, ETHGlobal & OKX. Made in India, shipped worldwide, crypto or fiat payment.",
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
    title: "Sickwear – Web3, Event & Personalized Merch Partner",
    description:
      "Custom Web3, event & personalized merch trusted by 150+ clients including Coinbase, ETHGlobal & OKX. Made in India, shipped worldwide, crypto or fiat payment.",
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
    title: "Sickwear – Web3, Event & Personalized Merch Partner",
    description:
      "Custom Web3, event & personalized merch trusted by 150+ clients including Coinbase, ETHGlobal & OKX. Made in India, shipped worldwide, crypto or fiat payment.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.sickwear.xyz/#organization",
                  name: "Sickwear",
                  url: "https://www.sickwear.xyz",
                  logo: "https://www.sickwear.xyz/images/sickwear-logo-square.png",
                  image: "https://www.sickwear.xyz/images/sickwear-og.jpg",
                  slogan: "Pioneer in Web3 Merch",
                  description:
                    "Sickwear makes custom merchandise for Web3 projects, events, communities and brands. Made in India, shipped to 150+ countries, payable in crypto or fiat.",
                  email: "sickwear.xyz@gmail.com",
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "sales",
                    email: "sickwear.xyz@gmail.com",
                    availableLanguage: "English",
                  },
                  sameAs: ["https://x.com/sickwear_xyz", "https://t.me/sickweareth"],
                  areaServed: "Worldwide",
                  foundingLocation: { "@type": "Place", name: "India" },
                  knowsAbout: [
                    "Web3 merchandise",
                    "Crypto merch",
                    "Event and hackathon swag",
                    "Custom apparel",
                    "NFC-enabled merchandise",
                  ],
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Custom merchandise",
                    itemListElement: [
                      "Apparel",
                      "Accessories",
                      "Bags",
                      "Leather items",
                      "Drinkware",
                      "Gadgets",
                      "Stationery",
                      "Event items",
                      "Gift hampers",
                    ].map((name) => ({
                      "@type": "Offer",
                      itemOffered: { "@type": "Service", name: "Custom " + name.toLowerCase() },
                    })),
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.sickwear.xyz/#website",
                  url: "https://www.sickwear.xyz",
                  name: "Sickwear",
                  inLanguage: "en",
                  publisher: { "@id": "https://www.sickwear.xyz/#organization" },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
