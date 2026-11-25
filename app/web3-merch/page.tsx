import type { Metadata } from "next"
import LandingPage from "@/components/landing-page"

const title = "Custom Web3 & Crypto Merch"
const description =
  "Custom Web3 merch for protocols, DAOs, NFT communities and crypto brands. Apparel, accessories and NFC-enabled items made in India, shipped to 150+ countries. Pay in USDC, USDT, ETH or fiat."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://www.sickwear.xyz/web3-merch" },
  openGraph: {
    type: "website",
    siteName: "Sickwear",
    url: "https://www.sickwear.xyz/web3-merch",
    title: title + " | Sickwear",
    description,
    images: [{ url: "/images/sickwear-og.jpg", width: 1200, height: 630, alt: "Sickwear" }],
  },
  twitter: { card: "summary_large_image", title: title + " | Sickwear", description, images: ["/images/sickwear-og.jpg"] },
}

export default function Web3MerchPage() {
  return (
    <LandingPage
      path="/web3-merch"
      crumb="Web3 merch"
      h1="Custom Web3 and crypto merch"
      serviceType="Custom Web3 merchandise"
      intro="Sickwear makes custom merchandise for Web3 protocols, DAOs, NFT communities and crypto companies. We handle design, in-house manufacturing in India and tracked shipping to 150+ countries, and accept payment in USDC, USDT, ETH and other major tokens as well as wire transfer and card."
      facts={[
        { label: "Minimum order", value: "Typically 50 units for standard items such as T-shirts and hoodies. Smaller premium or limited-edition runs on request." },
        { label: "Production time", value: "2–3 weeks from design approval, or 7–10 days expedited. Allow 3–4 weeks for 500+ units." },
        { label: "Shipping", value: "150+ countries, with tracking." },
        { label: "Payment", value: "USDC, USDT, ETH and other major tokens, wire transfer and card." },
        { label: "Branding methods", value: "Screen print, embroidery, DTG and sublimation, plus custom labels, tags and packaging." },
        { label: "Samples", value: "Available on request. Sample costs are typically credited toward the final order." },
      ]}
      blocks={[
        {
          heading: "What we make",
          items: [
            "Apparel: T-shirts, polos, hoodies, puffer jackets, kimonos, jerseys, shorts and joggers",
            "Accessories: caps, bucket hats, beanies, balaclavas, socks, scarves, sleep masks and neck pillows",
            "Bags and leather goods: backpacks, totes, duffles, laptop covers, wallets, passport covers and luggage tags",
            "Drinkware, gadgets and stationery: bottles, tumblers, power banks, speakers, notebooks, pens and desk mats",
            "Community items: enamel pins, stickers, keyrings, plushies and gift boxes",
          ],
        },
        {
          heading: "Built for Web3 teams",
          items: [
            "Community drops: exclusive limited-edition releases for your community",
            "NFC-enabled merch that links a physical item to a digital experience",
            "RFID-protected bags and accessories",
            "Design help from brand guidelines, logo files or a rough idea, with mockups before production",
            "Personalized hampers and welcome kits for teams and contributors",
          ],
        },
        {
          heading: "Who we have worked with",
          body: "Sickwear has worked with 150+ companies and organizations. Clients shown on our site include Coinbase, OKX, ETHGlobal, Polkadot, LayerZero, Scroll, Safe, Story Protocol, Aptos, Zerion, Biconomy, deBridge and Bitget.",
        },
        {
          heading: "How an order works",
          body: "Discovery, brief, mockup, production, quality check and packing, shipping, delivery. Nothing goes into production until you approve the mockup.",
        },
      ]}
      quotes={[
        { text: "Epic work! Thanks for all the hard work with the swag, really appreciate it!", name: "Calvin", org: "Ethereum Foundation" },
        { text: "Hey guys, the merch is amazing!! Super high quality!", name: "Jonnie", org: "deBridge" },
      ]}
      faqs={[
        { question: "Can we pay for merch in stablecoins?", answer: "Yes. Sickwear accepts USDC and USDT, along with ETH and other major tokens. Wire transfer and card are also accepted." },
        { question: "What is the minimum order for custom Web3 merch?", answer: "Typically 50 units for standard items such as T-shirts and hoodies. Minimums vary for accessories and specialty items, and smaller premium or limited-edition runs are possible." },
        { question: "Do you help with design?", answer: "Yes. The in-house design team can work from brand guidelines, logo files or a rough idea, and sends mockups for approval before production." },
      ]}
      related={[
        { href: "/event-merch", label: "Event and hackathon merch" },
        { href: "/overview", label: "Global presence" },
        { href: "/", label: "Sickwear home" },
      ]}
    />
  )
}
