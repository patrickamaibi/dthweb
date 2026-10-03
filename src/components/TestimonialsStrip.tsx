import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TestimonialCard from "./TestimonialCard";
import { fetchLiveTestimonials, PublicTestimonial } from "../lib/supabase";

export default function TestimonialsStrip() {
  const [items, setItems] = useState<PublicTestimonial[]>([]);

  useEffect(() => {
    fetchLiveTestimonials()
      .then((d) => setItems(d.slice(0, 4)))
      .catch(() => {});
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="font-jakarta text-3xl font-bold text-primary dark:text-white md:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-500 dark:text-slate-400">
            Honest feedback from the businesses and organizations we have worked with.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((t) => (
            <TestimonialCard key={t.id} t={t} compact clamp />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/testimonials"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-10 py-4 text-lg font-bold text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-blue-700"
          >
            View All Testimonials
          </Link>
        </div>
      </div>
    </section>
  );
}
