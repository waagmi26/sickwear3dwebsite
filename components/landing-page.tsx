import Link from "next/link"

type Fact = { label: string; value: string }
type Block = { heading: string; body?: string; items?: string[] }
type Faq = { question: string; answer: string }
type Quote = { text: string; name: string; org: string }

export type LandingPageProps = {
  path: string
  crumb: string
  h1: string
  intro: string
  serviceType: string
  facts: Fact[]
  blocks: Block[]
  quotes: Quote[]
  faqs: Faq[]
  related: { href: string; label: string }[]
}

const SITE = "https://www.sickwear.xyz"

export default function LandingPage(props: LandingPageProps) {
  const url = SITE + props.path
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Sickwear", item: SITE },
          { "@type": "ListItem", position: 2, name: props.crumb, item: url },
        ],
      },
      {
        "@type": "Service",
        name: props.h1,
        serviceType: props.serviceType,
        description: props.intro,
        url,
        areaServed: "Worldwide",
        provider: { "@id": SITE + "/#organization" },
      },
    ],
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header className="border-b border-white/10 py-3">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" aria-label="Sickwear home">
            <img src="/images/sickwear-logo.svg" alt="Sickwear" width={739} height={574} className="h-16 w-auto" />
          </Link>
          <a
            href="/#contact-form"
            className="rounded-full bg-[#BFF000] hover:bg-[#d4ff00] text-black px-5 py-2 text-sm font-bold"
          >
            Get a Quote
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <nav aria-label="Breadcrumb" className="text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#BFF000]">Sickwear</Link> / <span>{props.crumb}</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-black mb-6">{props.h1}</h1>
        <p className="text-lg text-white/80 leading-relaxed mb-12">{props.intro}</p>

        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4 text-[#BFF000]">At a glance</h2>
          <dl className="divide-y divide-white/10 border border-white/10 rounded-lg">
            {props.facts.map((fact) => (
              <div key={fact.label} className="grid grid-cols-1 md:grid-cols-3 gap-1 p-4">
                <dt className="font-semibold text-white">{fact.label}</dt>
                <dd className="md:col-span-2 text-gray-300">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {props.blocks.map((block) => (
          <section key={block.heading} className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-[#BFF000]">{block.heading}</h2>
            {block.body && <p className="text-gray-300 leading-relaxed mb-4">{block.body}</p>}
            {block.items && (
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4 text-[#BFF000]">What clients say</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {props.quotes.map((quote) => (
              <blockquote key={quote.name} className="border border-white/10 rounded-lg p-5 text-gray-300">
                <p className="mb-3">{quote.text}</p>
                <footer className="text-sm text-gray-500">{quote.name}, {quote.org}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4 text-[#BFF000]">Common questions</h2>
          {props.faqs.map((faq) => (
            <div key={faq.question} className="mb-6">
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </section>

        <section className="border border-white/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Get a quote</h2>
          <p className="text-gray-300 mb-6">
            Share what you need, quantities, timeline and any design references. We respond within 24 hours.
          </p>
          <a
            href="/#contact-form"
            className="inline-block rounded-full bg-[#BFF000] hover:bg-[#d4ff00] text-black px-8 py-3 font-bold"
          >
            Contact Sickwear
          </a>
        </section>

        <nav aria-label="Related pages" className="mt-12 flex flex-wrap gap-6 text-sm text-gray-400">
          {props.related.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[#BFF000]">
              {link.label}
            </Link>
          ))}
        </nav>
      </main>
    </div>
  )
}
