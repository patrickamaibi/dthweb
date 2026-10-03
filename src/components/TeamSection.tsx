import { Linkedin } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { founders, team, Person } from "@/lib/team";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

function Photo({ p, className }: { p: Person; className: string }) {
  if (p.photo) {
    return (
      <img
        src={p.photo}
        alt={`${p.name}, ${p.role}`}
        loading="lazy"
        className={`${className} object-cover object-top`}
      />
    );
  }
  return (
    <div
      aria-hidden="true"
      className={`${className} flex items-center justify-center bg-blue-50 font-jakarta text-3xl font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300`}
    >
      {initials(p.name)}
    </div>
  );
}

function LinkedInLink({ p }: { p: Person }) {
  if (!p.linkedin) return null;
  return (
    <a
      href={p.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${p.name} on LinkedIn`}
      className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors hover:bg-blue-600 hover:text-white dark:bg-blue-900/40 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white"
    >
      <Linkedin className="h-4 w-4" />
    </a>
  );
}

export default function TeamSection() {
  if (founders.length === 0 && team.length === 0) return null;
  const both = founders.length > 0 && team.length > 0;

  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto max-w-6xl px-6">
        <AnimatedSection className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Our People
          </h2>
          <h3 className="font-jakarta text-4xl font-bold text-primary dark:text-white">
            The people behind DiscoveryTech Hub
          </h3>
        </AnimatedSection>

        {founders.length > 0 && (
          <div className={team.length > 0 ? "mb-16" : ""}>
            {both && (
              <h4 className="mb-6 font-jakarta text-lg font-bold text-primary dark:text-white">Founders</h4>
            )}
            <div
              className={`grid gap-8 ${
                founders.length === 1 ? "mx-auto max-w-2xl" : "md:grid-cols-2"
              }`}
            >
              {founders.map((p, i) => (
                <AnimatedSection key={p.name} delay={i * 0.1}>
                  <div className="flex h-full flex-col gap-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 sm:flex-row">
                    <Photo p={p} className="aspect-square w-full shrink-0 rounded-2xl sm:w-44" />
                    <div>
                      <h4 className="font-jakarta text-xl font-bold text-primary dark:text-white">{p.name}</h4>
                      <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">{p.role}</p>
                      {p.bio && (
                        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{p.bio}</p>
                      )}
                      <LinkedInLink p={p} />
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        )}

        {team.length > 0 && (
          <div>
            {both && (
              <h4 className="mb-6 font-jakarta text-lg font-bold text-primary dark:text-white">Team</h4>
            )}
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {team.map((p, i) => (
                <AnimatedSection key={p.name} delay={i * 0.05}>
                  <div className="h-full rounded-2xl border border-slate-100 bg-white p-4 text-center transition-all hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
                    <Photo p={p} className="aspect-square w-full rounded-xl" />
                    <h4 className="mt-4 font-jakarta font-bold text-primary dark:text-white">{p.name}</h4>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{p.role}</p>
                    <div className="flex justify-center">
                      <LinkedInLink p={p} />
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
