import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import TestimonialImage from "./TestimonialImage";
import { fetchLiveTestimonials, PublicTestimonial } from "../lib/supabase";

// Drop <TestimonialsStrip /> into Home.tsx (for example above the FAQ section).
// It renders nothing until there is at least one live review.
export default function TestimonialsStrip() {
  const [items, setItems] = useState<PublicTestimonial[]>([]);

  useEffect(() => {
    fetchLiveTestimonials(3).then(setItems);
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16" data-testimonials-ready="true">
      <h2 className="text-2xl font-bold md:text-3xl">What our clients say</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {items.map((t) => (
          <figure
            key={t.id}
            className="rounded-xl border border-gray-200 p-6 dark:border-gray-700"
          >
            {t.rating && <StarRating value={t.rating} size={18} />}
            <blockquote className="mt-3 line-clamp-5 text-gray-800 dark:text-gray-100">
              {t.message}
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <TestimonialImage path={t.image_path} name={t.client_name} size={44} />
              <div>
                <span className="font-semibold">{t.client_name}</span>
                {t.company ? `, ${t.company}` : ""}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      <Link
        to="/testimonials"
        className="mt-8 inline-block font-medium underline underline-offset-4"
      >
        Read all reviews
      </Link>
    </section>
  );
}
