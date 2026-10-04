import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import ServicesList, { services } from "@/components/ServicesList";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { servicesSchema } from "@/lib/site";
import { ChevronDown } from "lucide-react";

const TITLE = "Web, Software, AI & Mobile App Services in Nigeria | DiscoveryTech Hub";
const DESCRIPTION = "Web design, software, AI solutions, mobile apps, e-commerce, digital marketing, gadgets and IT training for businesses in Nigeria and across Africa. Get a quote.";

const whyUs = [
  { title: "One team for everything digital", text: "Development, marketing, and support under one roof." },
  { title: "Built for the African market", text: "We understand local payments, mobile-first users, and real business conditions." },
  { title: "Clear communication", text: "Plain language, honest timelines, and no surprise costs." },
  { title: "Support after launch", text: "We do not disappear once your project goes live." },
];

const faqs = [
  { q: "How much does a website or app cost?", a: "It depends on what you need. After a short conversation about your goals, we send a clear quotation with no hidden charges." },
  { q: "How long does a project take?", a: "A standard business website can often be ready in a few weeks. Apps and custom software take longer. We confirm a timeline in writing before we begin." },
  { q: "Do you offer support after the project is delivered?", a: "Yes. We offer maintenance and support plans for websites, apps, hosting, and social media, so your systems keep working well." },
  { q: "Can you work with clients outside Abuja or outside Nigeria?", a: "Yes. Most of our work is delivered remotely, so we serve clients across Nigeria and Africa." },
  { q: "Can I combine services in one package?", a: "Absolutely. Many clients start with a website and social media together. We will put together a package that fits your needs and budget." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const SITE = "https://discoverytechhub.com";
const provider = { "@type": "Organization", name: "DiscoveryTech Hub", url: SITE };

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE}/services#webpage`,
      url: `${SITE}/services`,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "en-NG",
      isPartOf: { "@type": "WebSite", name: "DiscoveryTech Hub", url: SITE },
      about: provider,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE}/services` },
      ],
    },
    {
      "@type": "ItemList",
      name: "DiscoveryTech Hub Services",
      itemListElement: services.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: s.title,
          serviceType: s.title,
          description: s.fullDesc,
          provider,
          areaServed: [
            { "@type": "Country", name: "Nigeria" },
            { "@type": "Continent", name: "Africa" },
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: s.title,
            itemListElement: s.features.map((f) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: f },
            })),
          },
        },
      })),
    },
  ],
};

export default function Services() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="flex flex-col min-h-screen pt-20">
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <link rel="canonical" href="https://discoverytechhub.com/services" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://discoverytechhub.com/services" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content="https://discoverytechhub.com/og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="DiscoveryTech Hub Services - Web, Software, Mobile Apps & More" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://discoverytechhub.com/services" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content="https://discoverytechhub.com/og.png" />
        <meta name="twitter:image:alt" content="DiscoveryTech Hub Services - Web, Software, Mobile Apps & More" />
        <script type="application/ld+json">{JSON.stringify(servicesSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
      </Helmet>

      {/* Page Header */}
      <section className="bg-primary dark:bg-gray-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero1.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-bold font-jakarta mb-6">Our Services</h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
              We empower businesses with cutting-edge technology solutions tailored for growth. Learn more about how we can help you succeed.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white dark:bg-gray-950 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 dark:via-blue-900 to-transparent"></div>
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-jakarta text-primary dark:text-white mb-6">
                Technology Services for Businesses in Nigeria and Africa
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                DiscoveryTech Hub offers web design and development, software and AI solutions, mobile apps, e-commerce, digital marketing, ICT systems integration, gadget supply and maintenance, and IT training. We work with startups, small and medium businesses, schools, NGOs, and professional firms across Nigeria and Africa, and deliver most projects remotely.
              </p>
            </div>
          </AnimatedSection>
          <ServicesList />
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-24 bg-slate-50 dark:bg-gray-900 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 dark:via-blue-900 to-transparent"></div>
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold font-jakarta text-center text-primary dark:text-white mb-14">Why Work With DiscoveryTech Hub</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.map((w, i) => (
              <AnimatedSection key={w.title} delay={i * 0.1}>
                <div className="glassmorphism p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all h-full border border-slate-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <h3 className="text-xl font-bold font-jakarta text-primary dark:text-white mb-3">{w.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{w.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20 bg-white dark:bg-gray-950 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 dark:via-blue-900 to-transparent"></div>
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold font-jakarta text-primary dark:text-white mb-6">Who We Serve</h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
              We work with startups, small and medium businesses, schools, churches, NGOs, cooperatives, and professional firms that want reliable technology without the complexity.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Training and Community */}
      <section className="py-20 bg-primary dark:bg-gray-900 text-center">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold font-jakarta text-white mb-6">Training and Community</h2>
            <p className="text-blue-200 dark:text-blue-300 text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
              Beyond client work, DiscoveryTech Hub invests in the next generation of tech talent through technology clubs in secondary schools and a national innovation challenge focused on AI and blockchain. Schools and sponsors who want to be part of this can reach out through our Contact page.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 bg-white dark:bg-blue-700 text-primary dark:text-white rounded-full font-bold text-lg hover:bg-slate-100 dark:hover:bg-blue-600 transition-all shadow-xl hover:-translate-y-1"
            >
              Partner With Us
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-slate-50 dark:bg-gray-900 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 dark:via-blue-900 to-transparent"></div>
        <div className="container mx-auto px-6 max-w-3xl">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold font-jakarta text-center text-primary dark:text-white mb-12">Frequently Asked Questions</h2>
          </AnimatedSection>
          <div className="space-y-4">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="rounded-3xl border border-slate-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="w-full flex items-center justify-between gap-4 text-left px-8 py-6 font-bold font-jakarta text-primary dark:text-white"
                  >
                    {f.q}
                    <ChevronDown className={`w-5 h-5 shrink-0 text-blue-600 dark:text-blue-400 transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                  <p hidden={!open} className="px-8 pb-6 text-slate-600 dark:text-slate-300 leading-relaxed">{f.a}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-20 bg-primary dark:bg-gray-900 text-center relative">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold font-jakarta text-white mb-6">Ready to Move Your Business Forward?</h2>
            <p className="text-blue-200 dark:text-blue-300 text-lg max-w-2xl mx-auto mb-8">
              Tell us what you want to achieve, and we will show you how technology can help.
            </p>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 px-10 py-4 bg-white dark:bg-blue-700 text-primary dark:text-white rounded-full font-bold text-lg hover:bg-slate-100 dark:hover:bg-blue-600 transition-all shadow-xl hover:-translate-y-1"
            >
              Contact Us Today
            </Link>
          </AnimatedSection>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
      </section>
    </div>
  );
}