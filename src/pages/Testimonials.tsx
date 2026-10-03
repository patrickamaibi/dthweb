import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Quote } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import StarRating from "../components/StarRating";
import TestimonialCard from "../components/TestimonialCard";
import { fetchLiveTestimonials, PublicTestimonial, SITE_URL } from "../lib/supabase";

export default function Testimonials() {
  const [items, setItems] = useState<PublicTestimonial[] | null>(null);

  useEffect(() => {
    fetchLiveTestimonials().then(setItems);
  }, []);

  const list = items ?? [];
  const rated = list.filter((t) => t.rating);
  const average = rated.length
    ? rated.reduce((sum, t) => sum + (t.rating ?? 0), 0) / rated.length
    : 0;

  return (
    // data-testimonials-ready lets the prerender script know the reviews have loaded
    <div
      className="flex flex-col min-h-screen pt-20"
      {...(items !== null ? { "data-testimonials-ready": "true" } : {})}
    >
      <Helmet>
        <title>Client Testimonials | DiscoveryTech Hub</title>
        <meta
          name="description"
          content="Read what clients say about working with DiscoveryTech Hub on websites, digital products, training and ICT services in Abuja, Nigeria."
        />
        <link rel="canonical" href={`${SITE_URL}/testimonials`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/testimonials`} />
        <meta property="og:title" content="Client Testimonials | DiscoveryTech Hub" />
        <meta
          property="og:description"
          content="Real feedback from clients of DiscoveryTech Hub in Abuja."
        />
        <meta property="og:image" content="https://discoverytechhub.com/og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="DiscoveryTech Hub client testimonials" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${SITE_URL}/testimonials`} />
        <meta name="twitter:title" content="Client Testimonials | DiscoveryTech Hub" />
        <meta
          name="twitter:description"
          content="Real feedback from clients of DiscoveryTech Hub in Abuja."
        />
        <meta name="twitter:image" content="https://discoverytechhub.com/og.png" />
        <meta name="twitter:image:alt" content="DiscoveryTech Hub client testimonials" />
      </Helmet>

      {/* Page Header (same as Services) */}
      <section className="bg-primary dark:bg-gray-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero1.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-bold font-jakarta mb-6">Client Testimonials</h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
              Honest feedback from the businesses, organizations and individuals we have built
              websites, brands and training programmes for.
            </p>
            {rated.length > 0 && (
              <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-md">
                <StarRating value={Math.round(average)} size={20} />
                <span className="font-medium">
                  {average.toFixed(1)} average from {rated.length} review
                  {rated.length > 1 ? "s" : ""}
                </span>
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 bg-white dark:bg-gray-950 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 dark:via-blue-900 to-transparent"></div>
        <div className="container mx-auto max-w-6xl px-6">
          {items === null && (
            <p className="text-center text-slate-500 dark:text-slate-400">Loading reviews…</p>
          )}

          {items !== null && list.length === 0 && (
            <div className="mx-auto max-w-xl rounded-3xl border border-slate-100 bg-slate-50 p-12 text-center dark:border-gray-700 dark:bg-gray-900">
              <Quote className="mx-auto h-10 w-10 text-blue-500/40" aria-hidden="true" />
              <h2 className="mt-4 font-jakarta text-2xl font-bold text-primary dark:text-white">
                Our first reviews are on the way
              </h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                Check back soon to read what our clients have to say.
              </p>
            </div>
          )}

          {list.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {list.map((t) => (
                <TestimonialCard key={t.id} t={t} compact />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Footer Banner (same as Services) */}
      <section className="py-20 bg-primary dark:bg-gray-900 text-center">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold font-jakarta text-white mb-6">Ready to be our next success story?</h2>
            <p className="text-blue-200 dark:text-blue-300 text-lg max-w-2xl mx-auto mb-8">
              Tell us about your project and we will put together a tailored plan and quote.
            </p>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 px-10 py-4 bg-white dark:bg-blue-700 text-primary dark:text-white rounded-full font-bold text-lg hover:bg-slate-100 dark:hover:bg-blue-600 transition-all shadow-xl hover:-translate-y-1"
            >
              Get a Quote
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
