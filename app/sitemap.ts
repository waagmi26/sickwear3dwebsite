import type { MetadataRoute } from "next"

const SITE = "https://www.sickwear.xyz"
const lastModified = new Date("2026-11-25")

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: SITE + "/web3-merch", lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: SITE + "/event-merch", lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: SITE + "/overview", lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: SITE + "/brand", lastModified, changeFrequency: "yearly", priority: 0.3 },
  ]
}
