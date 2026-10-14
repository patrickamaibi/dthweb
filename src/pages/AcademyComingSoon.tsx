import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ACADEMY_LIVE, ACADEMY_URL } from '@/config/academy';

const BLUR_PX = 8; // background blur strength: raise for more blur, lower for less

export default function AcademyComingSoon() {
  const reduce = !!useReducedMotion();

  // Launch day: flip ACADEMY_LIVE in src/config/academy.ts
  useEffect(() => {
    if (ACADEMY_LIVE) window.location.replace(ACADEMY_URL);
  }, []);
  if (ACADEMY_LIVE) return null;

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <>
      <Helmet>
        <title>DiscoveryTech Academy | Coming Soon</title>
        <meta
          name="description"
          content="DiscoveryTech Academy is the e-learning platform of DiscoveryTech Hub in Abuja, Nigeria. Coming soon. Join the waitlist to be first in line."
        />
        <link rel="canonical" href="https://discoverytechhub.com/academy" />
        <meta property="og:title" content="DiscoveryTech Academy | Coming Soon" />
        <meta
          property="og:description"
          content="Practical digital and AI skills, built in Africa, for Africa. Join the waitlist."
        />
        <meta property="og:url" content="https://discoverytechhub.com/academy" />
      </Helmet>

      <div className="relative isolate flex min-h-[90svh] flex-col overflow-hidden bg-[#e6edfc] pt-16 text-[#0a1f44]">
        {/* Background: clipped wrapper + oversized image so the blurred edges stay off-screen */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div
            className="absolute -inset-16 transform-gpu bg-cover bg-center"
            style={{ backgroundImage: "url('/academy1.webp')", filter: `blur(${BLUR_PX}px)` }}
          />
          <div className="absolute inset-0 bg-white/30" />
        </div>

        <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 py-16 text-center sm:px-8">
          <motion.h1
            {...rise(0.05)}
            className="text-5xl font-extrabold tracking-[-0.04em] text-[#0a1230] sm:text-6xl lg:text-7xl"
          >
            Coming Soon
          </motion.h1>

          <motion.div {...rise(0.18)} className="mt-9">
            <Link
              to="/academy/waitlist"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-blue-700 px-8 font-semibold text-white shadow-lg shadow-blue-700/25 transition hover:bg-blue-800 active:scale-[0.98]"
            >
              Join the waitlist
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </main>
      </div>
    </>
  );
}
