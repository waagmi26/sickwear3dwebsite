import type { Metadata } from "next"
import type { ReactNode } from "react"

const title = "Global Presence"
const description = "See where Sickwear delivers custom Web3 and event merch, from hackathons to blockchain conferences around the world."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://www.sickwear.xyz/overview" },
  openGraph: {
    type: "website",
    siteName: "Sickwear",
    url: "https://www.sickwear.xyz/overview",
    title: title + " | Sickwear",
    description,
    images: [{ url: "/images/sickwear-og.jpg", width: 1200, height: 630, alt: "Sickwear" }],
  },
  twitter: { card: "summary_large_image", title: title + " | Sickwear", description, images: ["/images/sickwear-og.jpg"] },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
