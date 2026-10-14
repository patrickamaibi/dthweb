import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUp, Check, Copy, MessageCircle, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase'; // same path your Review.tsx uses

type Status = 'idle' | 'loading' | 'success' | 'error';

const LOGO_SRC = '/logo.png'; // change if your logo file is named differently
const SHARE_TEXT = 'I just reserved my seat for DiscoveryTech Academy. Join the waitlist:';

/* ---------------------------- SEO / GEO / OG ---------------------------- */
/* Keep these in sync with scripts/inject-waitlist-seo.mjs */
const SITE_URL = 'https://discoverytechhub.com';
const CANONICAL = `${SITE_URL}/academy/waitlist`;
const SEO_TITLE = 'DiscoveryTech Academy | Join the Waitlist';
const SEO_DESCRIPTION =
  'Join the free DiscoveryTech Academy waitlist and get early access to practical, no-code AI skills. Built in Abuja, Nigeria by DiscoveryTech Hub.';
const OG_IMAGE = `${SITE_URL}/ogwaitlist.webp`; // lives in /public
const OG_IMAGE_TYPE = OG_IMAGE.endsWith('.png')
  ? 'image/png'
  : OG_IMAGE.endsWith('.webp')
    ? 'image/webp'
    : 'image/jpeg';
const OG_IMAGE_ALT = 'DiscoveryTech Academy waitlist: practical AI skills, opening soon in Nigeria';

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${CANONICAL}#webpage`,
      url: CANONICAL,
      name: SEO_TITLE,
      description: SEO_DESCRIPTION,
      inLanguage: 'en-NG',
      isPartOf: { '@type': 'WebSite', name: 'DiscoveryTech Hub', url: SITE_URL },
      primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE },
      about: 'DiscoveryTech Academy, an online AI skills learning platform opening soon',
      contentLocation: {
        '@type': 'Place',
        name: 'Abuja, Nigeria',
      },
      publisher: {
        '@type': 'Organization',
        name: 'DiscoveryTech Hub',
        url: SITE_URL,
        logo: `${SITE_URL}${LOGO_SRC}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Abuja',
          addressCountry: 'NG',
        },
      },
    },
  ],
};

/* ------------------------------ Sharing ------------------------------ */
/* Each channel gets its own ?ref= so the waitlist source column shows where signups come from */
const shareUrl = (channel: string) => `${CANONICAL}?ref=${channel}`;
const enc = encodeURIComponent;

const ICON_CLS = 'h-3.5 w-3.5';

function IconWhatsApp() {
  return <MessageCircle className={ICON_CLS} aria-hidden />;
}

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" className={ICON_CLS} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconX() {
  return (
    <svg viewBox="0 0 24 24" className={ICON_CLS} fill="currentColor" aria-hidden>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" className={ICON_CLS} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" className={ICON_CLS} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

const shareLinks = [
  { key: 'whatsapp', label: 'WhatsApp', Icon: IconWhatsApp, href: `https://wa.me/?text=${enc(`${SHARE_TEXT} ${shareUrl('whatsapp')}`)}` },
  { key: 'facebook', label: 'Facebook', Icon: IconFacebook, href: `https://www.facebook.com/sharer/sharer.php?u=${enc(shareUrl('facebook'))}` },
  { key: 'x', label: 'X', Icon: IconX, href: `https://twitter.com/intent/tweet?text=${enc(SHARE_TEXT)}&url=${enc(shareUrl('x'))}` },
  { key: 'linkedin', label: 'LinkedIn', Icon: IconLinkedIn, href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(shareUrl('linkedin'))}` },
];

const SHARE_BTN =
  'inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50';

const perks = ['Free to join', 'Early access before launch', 'Practical AI skills, no coding'];

/* Edit these to match your real routes */
const FOOTER_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

/* Conversations shown inside the phone. They play one after another, then loop. */
type Msg = { role: 'user' | 'ai'; text: string };
type Scenario = { topic: string; messages: Msg[] };

const SCENARIOS: Scenario[] = [
  {
    topic: 'Farming',
    messages: [
      { role: 'user', text: 'Can AI help me plan my maize planting season?' },
      {
        role: 'ai',
        text: "Yes. Tell me when your rains usually start and I'll build a simple planting calendar.",
      },
      { role: 'user', text: 'Late April.' },
      { role: 'ai', text: 'Done. Your planting, weeding and harvest windows are mapped out.' },
    ],
  },
  {
    topic: 'App development',
    messages: [
      { role: 'user', text: 'I want to build a booking app for my salon. Where do I start?' },
      {
        role: 'ai',
        text: 'Start with three screens: services, available times and confirmation. I can sketch the flow.',
      },
      { role: 'user', text: 'Can you write the first screen?' },
      { role: 'ai', text: "Here's a clean starter screen with a service list and a Book button." },
    ],
  },
  {
    topic: 'Document drafting',
    messages: [
      { role: 'user', text: 'Draft a polite payment reminder for a client who is two weeks late.' },
      {
        role: 'ai',
        text: "Here's a short, friendly version. It states the amount and due date, and asks for a payment date.",
      },
      { role: 'user', text: 'Make it more formal.' },
      { role: 'ai', text: 'Updated. The tone is now professional, with a clear deadline.' },
    ],
  },
  {
    topic: 'Graphic design',
    messages: [
      { role: 'user', text: 'I need a logo idea for my bakery in Abuja.' },
      {
        role: 'ai',
        text: 'Try a simple wheat mark in warm gold with a rounded wordmark. Want a few colour palettes?',
      },
      { role: 'user', text: 'Yes, with a green option.' },
      { role: 'ai', text: 'Here are three palettes, including a deep green and cream pairing.' },
    ],
  },
];

/* Brand: navy #0A1F44, electric blue #1A4FD6, Inter. Mono eyebrow matches the Academy About page. */
const PAGE_CSS = `
  .dth-wl { font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
  .dth-wl .dth-mono { font-family: 'Courier New', Courier, monospace; }
`;

/* ------------------------------ Pieces ------------------------------ */

function Brand() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="flex items-center gap-3">
      {failed ? (
        <span className="text-base font-bold text-[#0A1F44]">DiscoveryTech</span>
      ) : (
        <img src={LOGO_SRC} alt="DiscoveryTech Hub" className="h-9 w-auto" onError={() => setFailed(true)} />
      )}
      <span className="h-6 w-px bg-slate-300" />
      <span className="text-[12px] font-medium uppercase tracking-[0.3em] text-slate-600">Academy</span>
    </div>
  );
}

/* Abstract background shapes for the hero */
function HeroAbstract() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-[#1A4FD6]/15 blur-3xl" />
      <div className="absolute -bottom-10 -left-32 h-[24rem] w-[24rem] rounded-full bg-[#0A1F44]/10 blur-3xl" />
      <div
        className="absolute left-[4%] top-[14%] hidden h-40 w-40 opacity-30 lg:block"
        style={{
          backgroundImage: 'radial-gradient(#1A4FD6 1.2px, transparent 1.2px)',
          backgroundSize: '20px 20px',
        }}
      />
    </div>
  );
}

/* Flowing abstract edge at the bottom of the hero. Last layer matches the footer colour. */
function HeroEdge() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 160"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -bottom-px left-0 h-24 w-full sm:h-32 lg:h-40"
    >
      <path
        d="M0 90 C 180 30, 360 30, 540 80 S 900 150, 1100 90 S 1330 30, 1440 70 L1440 160 L0 160 Z"
        fill="#1A4FD6"
        fillOpacity=".08"
      />
      <path
        d="M0 115 C 220 60, 420 60, 620 105 S 1000 160, 1200 110 S 1380 70, 1440 95 L1440 160 L0 160 Z"
        fill="#1A4FD6"
        fillOpacity=".12"
      />
      <path
        d="M0 112 C 240 70, 480 70, 720 104 S 1200 140, 1440 100"
        stroke="#1A4FD6"
        strokeOpacity=".25"
        strokeWidth="1.5"
        fill="none"
      />
      <path d="M0 140 C 240 100, 480 100, 720 130 S 1200 160, 1440 125 L1440 160 L0 160 Z" fill="#F3F6FE" />
    </svg>
  );
}

function TypingDots() {
  return (
    <span className="flex items-center gap-1 py-1" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-slate-400 motion-safe:animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  );
}

function PhoneChat({ reduce }: { reduce: boolean }) {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState(reduce ? SCENARIOS[0].messages.length : 0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (reduce) {
      setIdx(0);
      setShown(SCENARIOS[0].messages.length);
      setTyping(false);
      return;
    }

    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms));
      });

    (async () => {
      let s = 0;
      while (!cancelled) {
        setIdx(s);
        setShown(0);
        setTyping(false);
        await wait(900);

        const msgs = SCENARIOS[s].messages;
        for (let i = 0; i < msgs.length; i++) {
          if (cancelled) return;
          if (msgs[i].role === 'ai') {
            setTyping(true);
            await wait(1400);
            if (cancelled) return;
            setTyping(false);
          } else {
            await wait(700);
          }
          if (cancelled) return;
          setShown(i + 1);
          await wait(1500);
        }

        await wait(2600);
        s = (s + 1) % SCENARIOS.length;
      }
    })();

    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [reduce]);

  const scenario = SCENARIOS[idx];

  const fade = {
    initial: { opacity: 0, y: 10, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: 'easeOut' as const },
  };

  return (
    <div className="relative flex w-full justify-center">
      {/* Abstract rings, glow and dots behind the phone */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="absolute h-[22rem] w-[22rem] rounded-full bg-[#1A4FD6]/25 blur-3xl" />
        <div className="absolute h-[26rem] w-[26rem] rounded-full border border-[#1A4FD6]/20" />
        <div className="absolute h-[36rem] w-[36rem] rounded-full border border-[#1A4FD6]/10" />
        <div
          className="absolute -right-2 bottom-4 h-32 w-32 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(#0A1F44 1.2px, transparent 1.2px)',
            backgroundSize: '16px 16px',
          }}
        />
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          role="img"
          aria-label="Animated preview of chats between learners and the Academy AI assistant, covering farming, app development, document drafting and graphic design"
          className="relative h-[35.5rem] w-[17.5rem] rounded-[2.8rem] bg-[#0A1F44] p-2.5 shadow-[0_40px_80px_-20px_rgba(10,31,68,0.45)] sm:h-[38rem] sm:w-[19rem]"
        >
          {/* Side buttons */}
          <span aria-hidden className="absolute -left-[3px] top-24 h-8 w-[3px] rounded-l bg-[#0A1F44]" />
          <span aria-hidden className="absolute -left-[3px] top-36 h-12 w-[3px] rounded-l bg-[#0A1F44]" />
          <span aria-hidden className="absolute -right-[3px] top-32 h-16 w-[3px] rounded-r bg-[#0A1F44]" />

          <div className="relative flex h-full flex-col overflow-hidden rounded-[2.3rem] bg-white">
            {/* Island */}
            <span aria-hidden className="absolute left-1/2 top-3 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-[#0A1F44]" />

            {/* Chat header */}
            <div className="flex items-center gap-3 border-b border-slate-100 px-5 pb-3 pt-11">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#0A1F44] to-[#1A4FD6] text-white">
                <Sparkles className="h-4 w-4" />
              </span>
              <div className="min-w-0 leading-tight">
                <p className="text-sm font-semibold text-[#0A1F44]">Academy Assistant</p>
                <p className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={scenario.topic}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="truncate"
                    >
                      Helping with {scenario.topic.toLowerCase()}
                    </motion.span>
                  </AnimatePresence>
                </p>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex flex-1 flex-col justify-end gap-2.5 overflow-hidden px-4 py-4"
              style={{
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 16%)',
                maskImage: 'linear-gradient(to bottom, transparent, black 16%)',
              }}
            >
              <AnimatePresence initial={false}>
                {scenario.messages.slice(0, shown).map((m, i) => (
                  <motion.div
                    key={`m-${idx}-${i}`}
                    {...fade}
                    className={
                      m.role === 'user'
                        ? 'max-w-[85%] self-end rounded-2xl rounded-br-md bg-[#1A4FD6] px-3.5 py-2.5 text-[13px] leading-snug text-white'
                        : 'max-w-[85%] self-start rounded-2xl rounded-bl-md bg-slate-100 px-3.5 py-2.5 text-[13px] leading-snug text-[#0A1F44]'
                    }
                  >
                    {m.text}
                  </motion.div>
                ))}
                {typing && (
                  <motion.div
                    key={`typing-${idx}`}
                    {...fade}
                    className="self-start rounded-2xl rounded-bl-md bg-slate-100 px-3.5 py-2"
                  >
                    <TypingDots />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Composer */}
            <div className="flex items-center gap-2 px-4 pb-5 pt-2">
              <div className="flex-1 rounded-full border border-slate-200 px-4 py-2.5 text-xs text-slate-400">
                Ask anything...
              </div>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#1A4FD6] text-white">
                <ArrowUp className="h-4 w-4" />
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-[#F3F6FE] px-5 pb-8 pt-6">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Brand />
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Your Digital Transformation Partner. ICT training and digital services from Abuja, Nigeria.
            </p>
          </div>

          <nav aria-label="Footer" className="flex gap-16 text-sm">
            <div>
              <p className="dth-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A4FD6]">Explore</p>
              <ul className="mt-4 space-y-2.5">
                {FOOTER_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-slate-600 transition hover:text-[#0A1F44]">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="dth-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A4FD6]">Academy</p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a href="#waitlist-email" className="text-slate-600 transition hover:text-[#0A1F44]">
                    Join the waitlist
                  </a>
                </li>
                <li className="text-slate-500">Opening soon</li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} DiscoveryTech Hub. All rights reserved.</p>
          <p>Abuja, Nigeria</p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------- Page ------------------------------- */

export default function AcademyWaitlist() {
  const reduce = !!useReducedMotion();
  const [params] = useSearchParams();
  const ref = (params.get('ref') || '').replace(/[^a-z0-9_-]/gi, '').slice(0, 40);

  const [email, setEmail] = useState('');
  const [trap, setTrap] = useState(''); // honeypot for bots
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [position, setPosition] = useState<number | null>(null);
  const [already, setAlready] = useState(false);
  const [copied, setCopied] = useState<'link' | 'instagram' | null>(null);

  const cleanEmail = email.trim().toLowerCase();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (trap || status === 'loading') return;

    if (!supabase) {
      setStatus('error');
      setMessage('The waitlist service is unavailable right now.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    try {
      const { data, error } = await supabase.functions.invoke('academy-waitlist', {
        body: { email: cleanEmail, source: ref || 'waitlist-page' },
      });

      if (error || data?.error) {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
        return;
      }

      setPosition(typeof data?.position === 'number' ? data.position : null);
      setAlready(Boolean(data?.already));
      setStatus('success');
    } catch {
      setStatus('error');
      setMessage('Connection problem. Check your network and try again.');
    }
  };

  const flashCopied = (which: 'link' | 'instagram') => {
    setCopied(which);
    setTimeout(() => setCopied(null), 2200);
  };

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false; // clipboard blocked
    }
  };

  const copyLink = async () => {
    if (await copyText(shareUrl('link'))) flashCopied('link');
  };

  /* Instagram has no web share URL. Phones get the native share sheet (pick Instagram there);
     desktop copies the link and opens Instagram so it can be pasted. */
  const shareInstagram = async () => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({ title: SEO_TITLE, text: SHARE_TEXT, url: shareUrl('instagram') });
        return;
      } catch (err) {
        if ((err as DOMException)?.name === 'AbortError') return; // user closed the sheet
      }
    }
    if (await copyText(shareUrl('instagram'))) flashCopied('instagram');
    window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
  };

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <>
      <Helmet>
        <title>{SEO_TITLE}</title>
        <meta name="description" content={SEO_DESCRIPTION} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={CANONICAL} />
        <link rel="alternate" hrefLang="en-NG" href={CANONICAL} />
        <link rel="alternate" hrefLang="x-default" href={CANONICAL} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="DiscoveryTech Hub" />
        <meta property="og:locale" content="en_NG" />
        <meta property="og:title" content={SEO_TITLE} />
        <meta property="og:description" content={SEO_DESCRIPTION} />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:type" content={OG_IMAGE_TYPE} />
        <meta property="og:image:alt" content={OG_IMAGE_ALT} />

        {/* X / Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO_TITLE} />
        <meta name="twitter:description" content={SEO_DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta name="twitter:image:alt" content={OG_IMAGE_ALT} />

        {/* Structured data */}
        <script type="application/ld+json">{JSON.stringify(JSON_LD)}</script>

        {/* Inter, same as the Academy site. Remove these three lines if your site already loads Inter. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        />
        <style>{PAGE_CSS}</style>
      </Helmet>

      <div className="dth-wl flex min-h-screen flex-col bg-[#F3F6FE] text-[#0A1F44]">
        {/* Header */}
        <header className="relative z-20 border-b border-slate-200/70 bg-white/90 backdrop-blur">
          <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-5">
            <Brand />
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-[#0A1F44]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to site
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="relative flex-1 overflow-hidden bg-gradient-to-b from-[#d5e1fb] via-[#e3ebfc] to-[#F3F6FE]">
          <HeroAbstract />

          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 pb-32 pt-12 lg:grid-cols-[1fr_0.85fr] lg:gap-10 lg:pb-44 lg:pt-16">
            {/* Text and form */}
            <div className="order-1">
              <motion.p
                {...rise(0.05)}
                className="dth-mono text-[12px] font-bold uppercase tracking-[0.2em] text-[#1A4FD6]"
              >
                DiscoveryTech Academy · Opening soon
              </motion.p>

              <motion.h1
                {...rise(0.12)}
                className="mt-5 text-[2.6rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-[#0A1F44] sm:text-6xl lg:text-[3.25rem] xl:text-[4rem]"
              >
                Learn practical AI, one day at a time.
              </motion.h1>

              <motion.p {...rise(0.2)} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                Join the waitlist for{' '}
                <strong className="font-semibold text-[#0A1F44]">DiscoveryTech Academy</strong>, the e-learning
                platform of DiscoveryTech Hub in Abuja, and be the first to know when we open our doors.
              </motion.p>

              <motion.div {...rise(0.28)}>
                <AnimatePresence mode="wait">
                  {status !== 'success' ? (
                    <motion.form
                      key="form"
                      onSubmit={submit}
                      noValidate
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="mt-8 max-w-xl"
                    >
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={trap}
                        onChange={(e) => setTrap(e.target.value)}
                        className="absolute left-[-9999px] h-0 w-0 opacity-0"
                        aria-hidden
                      />

                      <div className="flex flex-col gap-3 sm:flex-row">
                        <div className="flex-1">
                          <label htmlFor="waitlist-email" className="sr-only">
                            Email address
                          </label>
                          <input
                            id="waitlist-email"
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (status === 'error') setStatus('idle');
                            }}
                            className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-base text-slate-900 placeholder-slate-400 shadow-sm outline-none transition focus:border-[#1A4FD6] focus:ring-4 focus:ring-[#1A4FD6]/15"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={status === 'loading'}
                          className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#1A4FD6] px-6 font-semibold text-white shadow-lg shadow-[#1A4FD6]/25 transition hover:bg-[#153FB0] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {status === 'loading' ? (
                            <>
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                              Reserving...
                            </>
                          ) : (
                            <>
                              Join the waitlist
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </>
                          )}
                        </button>
                      </div>

                      {status === 'error' && (
                        <p role="alert" className="mt-3 text-sm font-medium text-rose-600">
                          {message}
                        </p>
                      )}

                      <p className="mt-4 text-sm text-slate-500">{perks.join(' · ')}</p>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mt-8 max-w-xl"
                    >
                      <p className="dth-mono text-[12px] font-bold uppercase tracking-[0.2em] text-[#1A4FD6]">
                        {already ? 'Already registered' : "You're in"}
                      </p>
                      <p className="mt-2 text-2xl font-bold text-[#0A1F44]">
                        {already ? "You're already on the list." : 'Seat reserved. Check your inbox.'}
                      </p>

                      {/* Founding learner pass */}
                      <motion.div
                        initial={reduce ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="relative mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-[#0A1F44]/10"
                      >
                        <div className="absolute inset-y-0 left-0 w-1 bg-[#1A4FD6]" />
                        <div className="py-5 pl-6 pr-5">
                          <div className="flex items-center justify-between">
                            <p className="dth-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A4FD6]">
                              Founding learner pass
                            </p>
                            <p className="dth-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">Admit one</p>
                          </div>
                          <p className="dth-mono mt-4 text-4xl font-bold tracking-tight text-[#0A1F44]">
                            {position ? `#${String(position).padStart(4, '0')}` : 'FOUNDING'}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">DiscoveryTech Academy · Opening soon</p>
                          <div className="my-4 border-t border-dashed border-slate-300" />
                          <p className="dth-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">Reserved for</p>
                          <p className="dth-mono mt-1 truncate text-sm text-[#0A1F44]">{cleanEmail}</p>
                        </div>
                      </motion.div>

                      {/* Share */}
                      <p className="mt-6 text-sm font-semibold text-[#0A1F44]">Share your pass</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {shareLinks.map(({ key, label, href, Icon }) => (
                          <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={SHARE_BTN}>
                            <Icon />
                            {label}
                          </a>
                        ))}
                        <button type="button" onClick={shareInstagram} className={SHARE_BTN}>
                          <IconInstagram />
                          {copied === 'instagram' ? 'Link copied' : 'Instagram'}
                        </button>
                        <button type="button" onClick={copyLink} className={SHARE_BTN}>
                          {copied === 'link' ? <Check className={ICON_CLS} /> : <Copy className={ICON_CLS} />}
                          {copied === 'link' ? 'Copied' : 'Copy link'}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Phone */}
            <div className="order-2">
              <PhoneChat reduce={reduce} />
            </div>
          </div>

          <HeroEdge />
        </section>

        <SiteFooter />
      </div>
    </>
  );
}
