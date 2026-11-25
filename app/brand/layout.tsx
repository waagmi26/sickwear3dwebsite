import type { Metadata } from "next"
import type { ReactNode } from "react"

const title = "Brand Guidelines"
const description = "Sickwear brand guidelines: logo, colours, typography and usage rules."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://www.sickwear.xyz/brand" },
  openGraph: {
    type: "website",
    siteName: "Sickwear",
    url: "https://www.sickwear.xyz/brand",
    title: title + " | Sickwear",
    description,
    images: [{ url: "/images/sickwear-og.jpg", width: 1200, height: 630, alt: "Sickwear" }],
  },
  twitter: { card: "summary_large_image", title: title + " | Sickwear", description, images: ["/images/sickwear-og.jpg"] },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
