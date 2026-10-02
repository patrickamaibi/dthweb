import { Helmet } from "react-helmet-async";
import AnimatedSection from "@/components/AnimatedSection";
import { ChevronRight } from "lucide-react";
import { faqSchema } from "@/lib/site";
import type { FaqItem } from "@/lib/site";

export default function FAQSection({
  title,
  eyebrow = "FAQ",
  items,
}: {
  title: string;
  eyebrow?: string;
  items: FaqItem[];
}) {
  return (
    <section className="py-24 bg-white dark:bg-gray-950 px-4">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema(items))}</script>
      </Helmet>
      <div className="max-w-3xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase text-sm mb-2">
            {eyebrow}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold font-jakarta text-primary dark:text-white">
            {title}
          </h3>
        </AnimatedSection>
        <div className="space-y-4">
          {items.map((item) => (
            <details
              key={item.q}
              className="group bg-slate-50 dark:bg-gray-800 border border-slate-100 dark:border-gray-700 rounded-2xl px-6 py-5 open:shadow-md"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden font-semibold font-jakarta text-primary dark:text-white">
                {item.q}
                <ChevronRight className="w-5 h-5 shrink-0 text-blue-600 dark:text-blue-400 transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
