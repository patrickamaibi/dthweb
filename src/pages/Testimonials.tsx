import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Quote } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import StarRating from "../components/StarRating";
import TestimonialImage from "../components/TestimonialImage";
import { fetchLiveTestimonials, PublicTestimonial, SITE_URL } from "../lib/supabase";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

function monthYear(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

function Avatar({ t, size, light = false }: { t: PublicTestimonial; size: number; light?: boolean }) {
  if (t.image_path) return <TestimonialImage path={t.image_path} name={t.client_name} size={size} />;
  return (
    <div
      aria-hidden="true"
      style={{ width: size, height: size }}
      className={`flex shrink-0 items-center justify-center rounded-lg font-jakarta font-bold ${
        light
          ? "bg-white/15 text-white"
          : "bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
      }`}
    >
      {initials(t.client_name)}
    </div>
  );
}

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
  const featured =
    list.find((t) => (t.rating ?? 0) >= 4 && (t.message?.length ?? 0) >= 80) ?? list[0];
  const rest = list.filter((t) => t !== featured);

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

          {featured && (
            <figure className="relative overflow-hidden rounded-3xl bg-[#0A1F44] p-8 shadow-2xl md:p-14 dark:bg-gray-800">
              <Quote
                className="absolute right-6 top-6 h-24 w-24 text-white/5 md:h-44 md:w-44"
                aria-hidden="true"
              />
              <div className="relative max-w-3xl">
                {featured.rating && <StarRating value={featured.rating} size={22} />}
                <blockquote className="mt-6 whitespace-pre-line font-jakarta text-xl leading-relaxed text-white md:text-2xl">
                  {featured.message}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <Avatar t={featured} size={56} light />
                  <div>
                    <p className="font-bold text-white">{featured.client_name}</p>
                    {featured.company && <p className="text-sm text-blue-200">{featured.company}</p>}
                    {featured.service && <p className="text-sm text-blue-300">{featured.service}</p>}
                  </div>
                </figcaption>
              </div>
            </figure>
          )}

          {rest.length > 0 && (
            <div className="mt-8 columns-1 gap-6 md:columns-2 lg:columns-3">
              {rest.map((t) => (
                <figure
                  key={t.id}
                  className="mb-6 break-inside-avoid rounded-2xl border border-slate-100 bg-slate-50 p-7 transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(37,99,235,0.08)] dark:border-gray-700 dark:bg-gray-900"
                >
                  <div className="flex items-center justify-between gap-3">
                    {t.rating ? <StarRating value={t.rating} size={18} /> : <span />}
                    <span className="text-xs text-slate-400">{monthYear(t.submitted_at)}</span>
                  </div>
                  <blockquote className="mt-4 whitespace-pre-line leading-relaxed text-slate-700 dark:text-slate-200">
                    {t.message}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-5 dark:border-gray-700">
                    <Avatar t={t} size={44} />
                    <div className="min-w-0 text-sm">
                      <p className="font-bold text-primary dark:text-white">{t.client_name}</p>
                      {t.company && <p className="text-slate-500 dark:text-slate-400">{t.company}</p>}
                      {t.service && <p className="text-blue-600 dark:text-blue-400">{t.service}</p>}
                    </div>
                  </figcaption>
                </figure>
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
