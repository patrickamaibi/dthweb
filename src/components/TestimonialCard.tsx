import { Quote } from "lucide-react";
import StarRating from "./StarRating";
import TestimonialImage from "./TestimonialImage";
import type { PublicTestimonial } from "../lib/supabase";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

function Avatar({ t, size }: { t: PublicTestimonial; size: number }) {
  if (t.image_path) return <TestimonialImage path={t.image_path} name={t.client_name} size={size} />;
  return (
    <div
      aria-hidden="true"
      style={{ width: size, height: size }}
      className="flex shrink-0 items-center justify-center rounded-lg bg-white/15 font-jakarta font-bold text-white"
    >
      {initials(t.client_name)}
    </div>
  );
}

export default function TestimonialCard({
  t,
  compact = false,
  clamp = false,
}: {
  t: PublicTestimonial;
  compact?: boolean;
  clamp?: boolean;
}) {
  return (
    <figure
      className={`relative flex flex-col overflow-hidden bg-[#0A1F44] shadow-2xl dark:bg-gray-800 ${
        compact ? "h-full rounded-2xl p-6 md:p-8" : "rounded-3xl p-8 md:p-14"
      }`}
    >
      <Quote
        className={`absolute text-white/5 ${
          compact ? "right-4 top-4 h-16 w-16 md:h-24 md:w-24" : "right-6 top-6 h-24 w-24 md:h-44 md:w-44"
        }`}
        aria-hidden="true"
      />
      <div className={`relative flex flex-1 flex-col ${compact ? "" : "max-w-3xl"}`}>
        {t.rating && <StarRating value={t.rating} size={compact ? 18 : 22} />}
        <blockquote
          className={`whitespace-pre-line font-jakarta leading-relaxed text-white ${
            compact ? "mt-4 text-base md:text-lg" : "mt-6 text-xl md:text-2xl"
          }`}
          style={
            clamp
              ? {
                  display: "-webkit-box",
                  WebkitLineClamp: 7,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }
              : undefined
          }
        >
          {t.message}
        </blockquote>
        <figcaption className={`flex items-center gap-4 ${compact ? "mt-auto pt-6" : "mt-8"}`}>
          <Avatar t={t} size={compact ? 44 : 56} />
          <div className="min-w-0">
            <p className="font-bold text-white">{t.client_name}</p>
            {t.company && <p className="text-sm text-blue-200">{t.company}</p>}
            {t.service && <p className="text-sm text-blue-300">{t.service}</p>}
          </div>
        </figcaption>
      </div>
    </figure>
  );
}
