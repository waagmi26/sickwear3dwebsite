import type { Metadata } from "next"
import LandingPage from "@/components/landing-page"

const title = "Event, Hackathon & Conference Merch"
const description =
  "Custom event merch for hackathons, conferences and crypto summits: T-shirts, totes, lanyards, ID cards, backdrops and gift hampers. 7–10 day rush options, shipping to 150+ countries, crypto or fiat payment."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://www.sickwear.xyz/event-merch" },
  openGraph: {
    type: "website",
    siteName: "Sickwear",
    url: "https://www.sickwear.xyz/event-merch",
    title: title + " | Sickwear",
    description,
    images: [{ url: "/images/sickwear-og.jpg", width: 1200, height: 630, alt: "Sickwear" }],
  },
  twitter: { card: "summary_large_image", title: title + " | Sickwear", description, images: ["/images/sickwear-og.jpg"] },
}

export default function EventMerchPage() {
  return (
    <LandingPage
      path="/event-merch"
      crumb="Event merch"
      h1="Event, hackathon and conference merch"
      serviceType="Custom event merchandise"
      intro="Sickwear makes custom merch for hackathons, conferences and community events: T-shirts, hoodies, tote bags, lanyards, ID cards, wristbands, backdrops and gift hampers. Everything is made in India and shipped with tracking to 150+ countries, with rush production available."
      facts={[
        { label: "Standard production", value: "2–3 weeks from design approval." },
        { label: "Rush production", value: "7–10 days for urgent event needs." },
        { label: "Large orders", value: "Allow 3–4 weeks for 500+ units." },
        { label: "Minimum order", value: "Typically 50 units for standard items. Varies for accessories and specialty items." },
        { label: "Shipping", value: "150+ countries, with tracking. Costs and timelines vary by destination and are quoted upfront." },
        { label: "Payment", value: "USDC, USDT, ETH and other major tokens, wire transfer and card." },
      ]}
      blocks={[
        {
          heading: "Merch for attendees and teams",
          items: [
            "T-shirts, hoodies, windcheaters, caps and socks",
            "Tote bags, backpacks, bottles and tumblers",
            "Stickers, enamel pins, notebooks and lanyards",
            "Gift hampers and welcome kits",
          ],
        },
        {
          heading: "Event and venue items",
          items: [
            "ID cards, lanyards and wrist bands",
            "Backdrops, banners and standees",
            "Table tops and LED boxes",
            "Cards and pamphlets",
          ],
        },
        {
          heading: "When to order",
          body: "Work back from the date you need the items in hand. Production takes 2–3 weeks after you approve the design (3–4 weeks for 500+ units), and shipping time to your destination comes on top. If time is short, ask about 7–10 day expedited production.",
        },
        {
          heading: "Event organisers and communities",
          body: "Sickwear has worked with 150+ companies and organizations. Clients shown on our site include ETHGlobal, ETHIndia, Devfolio, PizzaDAO and Polkadot.",
        },
      ]}
      quotes={[
        { text: "I am in love with the backdrop, it's so bright! Thank you so much for your help and great work on the matter.", name: "Lisa", org: "ETHGlobal" },
        { text: "Thanks again for everything. It was wonderful getting to work with your team especially with the quick turnaround. LFG", name: "Amy", org: "EigenCloud" },
      ]}
      faqs={[
        { question: "How far ahead should we order event merch?", answer: "Plan on 2–3 weeks of production after design approval, or 3–4 weeks for 500+ units, plus shipping time to your destination." },
        { question: "Can you handle a rush order?", answer: "Yes. Expedited production takes 7–10 days for urgent event needs. Contact us to confirm what is possible for your items and quantity." },
        { question: "Do you make more than T-shirts?", answer: "Yes. Alongside apparel, we make bags, drinkware, stationery, lanyards, ID cards, wristbands, backdrops, banners, standees and gift hampers." },
      ]}
      related={[
        { href: "/web3-merch", label: "Custom Web3 merch" },
        { href: "/overview", label: "Global presence" },
        { href: "/", label: "Sickwear home" },
      ]}
    />
  )
}
