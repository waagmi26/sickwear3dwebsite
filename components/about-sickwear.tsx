const facts = [
  ["What we do", "Custom merchandise for Web3 projects, events, communities and brands"],
  ["Products", "Apparel, accessories, bags, leather goods, drinkware, gadgets, stationery, event items and gift hampers"],
  ["Minimum order", "Typically 50 units for standard items; smaller premium runs on request"],
  ["Production time", "2–3 weeks from design approval; 7–10 days expedited"],
  ["Shipping", "150+ countries, with tracking"],
  ["Payment", "USDC, USDT, ETH and other major tokens, wire transfer and card"],
  ["Branding methods", "Screen print, embroidery, DTG and sublimation, plus NFC-enabled merch"],
  ["Made in", "India, with in-house manufacturing"],
]

export default function AboutSickwear() {
  return (
    <section id="about" className="bg-black py-20 scroll-mt-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white text-center">What is Sickwear?</h2>
        <p className="text-lg text-gray-300 leading-relaxed text-center mb-10">
          Sickwear is a custom merchandise company focused on Web3. We design, make and ship branded apparel,
          accessories and event merch for protocols, DAOs, hackathons, conferences and startups. Everything is made in
          India and shipped worldwide, and you can pay in crypto or fiat.
        </p>
        <dl className="divide-y divide-white/10 border border-white/10 rounded-lg">
          {facts.map(([label, value]) => (
            <div key={label} className="grid grid-cols-1 md:grid-cols-3 gap-1 p-4">
              <dt className="font-semibold text-white">{label}</dt>
              <dd className="md:col-span-2 text-gray-300">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="text-center text-sm text-gray-400 mt-8">
          More: <a href="/web3-merch" className="text-[#BFF000] hover:underline">Custom Web3 merch</a> ·{" "}
          <a href="/event-merch" className="text-[#BFF000] hover:underline">Event and hackathon merch</a>
        </p>
      </div>
    </section>
  )
}
