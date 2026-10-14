import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Copy } from 'lucide-react';
import AcademyFooterLink from '@/components/AcademyFooterLink';
import { supabase } from '@/lib/supabase'; // same path your Review.tsx uses

type Status = 'idle' | 'loading' | 'success' | 'error';

const LOGO_SRC = '/logo.png'; // change if your logo file is named differently
const HERO_IMAGE = '/dth1.webp'; // lives in /public
const PAGE_URL = 'https://discoverytechhub.com/academy/waitlist?ref=share';
const SHARE_TEXT = 'I just reserved my seat for DiscoveryTech Academy. Join the waitlist:';

const shareLinks = [
  { label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${PAGE_URL}`)}` },
  { label: 'X', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(PAGE_URL)}` },
  { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(PAGE_URL)}` },
];

const perks = ['Free to join', 'Early access before launch', 'Practical AI skills, no coding'];

/* Same typography as the Academy About page: Inter + Courier-style mono eyebrow */
const PAGE_CSS = `
  .dth-wl { font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
  .dth-wl .dth-mono { font-family: 'Courier New', Courier, monospace; }
`;

/* ---------------- Nigeria outline (simplified, decorative) ----------------
   [longitude, latitude] points, clockwise from the Benin border at the coast. */
const NIGERIA_COORDS: [number, number][] = [
  // Benin border, south to north
  [2.70, 6.40], [2.72, 6.85], [2.74, 7.50], [2.78, 8.35], [3.05, 9.00], [3.35, 9.50], [3.72, 10.00],
  [3.70, 10.70], [3.60, 11.70],
  // Niger border, west to east
  [3.90, 12.10], [4.10, 12.80], [4.20, 13.40], [4.80, 13.70], [5.40, 13.85], [6.20, 13.55], [7.20, 13.30],
  [8.30, 13.35], [9.40, 13.20], [10.40, 13.25], [11.50, 13.40], [12.50, 13.45], [13.20, 13.70], [13.60, 13.88],
  // Lake Chad and Cameroon border, north to south
  [14.00, 13.50], [14.20, 13.10], [14.20, 12.35], [14.00, 11.90], [13.80, 11.40], [13.75, 10.90], [13.70, 10.40],
  [13.40, 9.90], [13.05, 9.40], [12.85, 8.95], [12.45, 8.50], [12.10, 8.00], [11.75, 7.50], [11.45, 7.05],
  [11.10, 6.60], [10.60, 6.45], [9.90, 6.35], [9.30, 6.15], [9.00, 5.60], [8.75, 5.10], [8.55, 4.65],
  // Atlantic coast, east to west (Niger Delta bulge in the middle)
  [8.20, 4.50], [7.80, 4.45], [7.35, 4.40], [6.95, 4.35], [6.55, 4.30], [6.20, 4.27], [5.85, 4.45],
  [5.55, 4.90], [5.35, 5.35], [5.10, 5.70], [4.60, 6.00], [4.00, 6.35], [3.40, 6.42], [2.90, 6.38],
];

const LON_MIN = 2.3;
const LON_MAX = 14.9;
const LAT_MAX = 14.0;
const LAT_MIN = 4.1;
const SCALE = 60;
const PAD = 8;
const VB_W = Math.round((LON_MAX - LON_MIN) * SCALE + PAD * 2);
const VB_H = Math.round((LAT_MAX - LAT_MIN) * SCALE + PAD * 2);

const project = (lon: number, lat: number): [number, number] => [
  (lon - LON_MIN) * SCALE + PAD,
  (LAT_MAX - lat) * SCALE + PAD,
];
const toPath = (coords: [number, number][]) =>
  'M ' +
  coords
    .map(([lo, la]) => project(lo, la))
    .map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(' L ') +
  ' Z';

const NIGERIA_PATH = toPath(NIGERIA_COORDS);
const ABUJA = project(7.49, 9.08);
const ABUJA_POS = { left: `${(ABUJA[0] / VB_W) * 100}%`, top: `${(ABUJA[1] / VB_H) * 100}%` };

/* ------------------------------ Pieces ------------------------------ */

function GoldCap({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 90" className={className} fill="none" aria-hidden>
      <defs>
        <linearGradient id="capGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fef3c7" />
          <stop offset="1" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
      <path d="M28 46v18c0 9 64 9 64 0V46L60 58 28 46Z" fill="url(#capGold)" fillOpacity=".65" />
      <path d="M60 8 116 31 60 54 4 31 60 8Z" fill="url(#capGold)" />
      <path d="M104 36v30" stroke="#fde68a" strokeWidth="3" strokeLinecap="round" />
      <circle cx="104" cy="70" r="5" fill="#fde68a" />
    </svg>
  );
}

function CapIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 90" className={className} fill="#ffffff" aria-hidden>
      <path d="M28 46v18c0 9 64 9 64 0V46L60 58 28 46Z" fillOpacity=".7" />
      <path d="M60 8 116 31 60 54 4 31 60 8Z" />
    </svg>
  );
}

function Brand() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="flex items-center gap-3">
      {failed ? (
        <span className="flex items-center gap-2 text-base font-bold text-[#0a1f44]">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-700 to-cyan-500">
            <CapIcon className="h-5 w-5" />
          </span>
          DiscoveryTech
        </span>
      ) : (
        <img src={LOGO_SRC} alt="DiscoveryTech Hub" className="h-9 w-auto" onError={() => setFailed(true)} />
      )}
      <span className="h-6 w-px bg-slate-300" />
      <span className="text-[12px] font-medium uppercase tracking-[0.3em] text-slate-600">Academy</span>
    </div>
  );
}

/* Illustration used inside the shape until the real photo loads */
const C = { blue: '#60a5fa', cyan: '#67e8f9', slate: '#94a3b8', slateDark: '#64748b', amber: '#fde68a', green: '#6ee7b7' };
const CODE_ROWS: { indent: number; segs: [number, string][] }[] = [
  { indent: 0, segs: [[14, C.blue], [22, C.cyan], [10, C.slate]] },
  { indent: 0, segs: [[18, C.blue], [30, C.amber]] },
  { indent: 1, segs: [[12, C.cyan], [26, C.slate], [16, C.green]] },
  { indent: 1, segs: [[20, C.slate], [14, C.blue]] },
  { indent: 2, segs: [[10, C.blue], [34, C.slateDark], [12, C.amber]] },
  { indent: 2, segs: [[24, C.green], [18, C.cyan]] },
  { indent: 1, segs: [[16, C.blue], [28, C.slate]] },
  { indent: 0, segs: [[12, C.blue]] },
  { indent: 0, segs: [[22, C.cyan], [18, C.slate], [14, C.amber]] },
  { indent: 1, segs: [[30, C.slate], [12, C.green]] },
];

function CodeScene() {
  return (
    <g>
      <rect width={VB_W} height={VB_H} fill="#0a1a45" />
      {CODE_ROWS.map((row, i) => {
        let x = VB_W * 0.2 + row.indent * 22;
        const y = VB_H * 0.16 + i * 40;
        return (
          <g key={i} opacity=".8">
            {row.segs.map(([w, color], j) => {
              const width = w * 3.6;
              const el = <rect key={j} x={x} y={y} width={width} height={10} rx={5} fill={color} />;
              x += width + 12;
              return el;
            })}
          </g>
        );
      })}
    </g>
  );
}

function NigeriaCard({ reduce }: { reduce: boolean }) {
  const [imgOk, setImgOk] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImgOk(true);
    img.onerror = () => setImgOk(false);
    img.src = HERO_IMAGE;
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[36rem] lg:mx-0 lg:max-w-none lg:translate-x-5 xl:translate-x-8">
      <div aria-hidden className="absolute -inset-10 rounded-full bg-blue-400/30 blur-3xl" />
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full drop-shadow-[0_30px_50px_rgba(30,64,175,0.28)]"
        style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
      >
        {/* Photo cut into the shape of Nigeria, with a white outline */}
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="absolute inset-0 h-full w-full"
          fill="none"
          role="img"
          aria-label="Map of Nigeria with Abuja marked"
        >
          <defs>
            <clipPath id="nigeria-clip">
              <path d={NIGERIA_PATH} />
            </clipPath>
            <linearGradient id="nigeria-tint" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#1e3a8a" stopOpacity=".25" />
              <stop offset="1" stopColor="#1e3a8a" stopOpacity="0" />
            </linearGradient>
          </defs>

          <g clipPath="url(#nigeria-clip)">
            <rect width={VB_W} height={VB_H} fill="#0a1a45" />
            {imgOk ? (
              <image href={HERO_IMAGE} x="0" y="0" width={VB_W} height={VB_H} preserveAspectRatio="xMidYMid slice" />
            ) : (
              <CodeScene />
            )}
            <rect width={VB_W} height={VB_H} fill="url(#nigeria-tint)" />
          </g>

          <path d={NIGERIA_PATH} stroke="#ffffff" strokeOpacity=".95" strokeWidth="5" strokeLinejoin="round" />
        </svg>

        {/* Abuja marker */}
        <div className="absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2" style={ABUJA_POS}>
          <span className="absolute inset-0 rounded-full bg-white/70 motion-safe:animate-ping" />
          <span className="relative block h-5 w-5 rounded-full border-[5px] border-white bg-blue-700 shadow-lg" />
          <GoldCap className="absolute -top-9 left-1/2 h-8 w-10 -translate-x-1/2 drop-shadow-md" />
          <span className="dth-mono absolute left-8 top-1/2 -translate-y-1/2 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold tracking-[0.2em] text-blue-800 shadow">
            ABUJA
          </span>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------- Page ------------------------------- */

export default function AcademyWaitlist() {
  const reduce = !!useReducedMotion();
  const [params] = useSearchParams();
  const ref = (params.get('ref') || '').slice(0, 40);

  const [email, setEmail] = useState('');
  const [trap, setTrap] = useState(''); // honeypot for bots
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [position, setPosition] = useState<number | null>(null);
  const [already, setAlready] = useState(false);
  const [copied, setCopied] = useState(false);

  const cleanEmail = email.trim().toLowerCase();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (trap) return;

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
    const { data, error } = await supabase.functions.invoke('academy-waitlist', {
      body: { email: cleanEmail, source: ref || 'waitlist-page' },
    });

    if (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      return;
    }

    setPosition(typeof data?.position === 'number' ? data.position : null);
    setAlready(Boolean(data?.already));
    setStatus('success');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(PAGE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: ignore */
    }
  };

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <>
      <Helmet>
        <title>Join the Academy Waitlist | DiscoveryTech Hub</title>
        <meta
          name="description"
          content="Join the DiscoveryTech Academy waitlist and be first to know when the doors open. Practical digital and AI skills, built in Africa, for Africa."
        />
        <link rel="canonical" href="https://discoverytechhub.com/academy/waitlist" />
        <meta property="og:title" content="Join the Academy Waitlist | DiscoveryTech Hub" />
        <meta
          property="og:description"
          content="Reserve your seat for DiscoveryTech Academy and be first in line when we open."
        />
        <meta property="og:url" content="https://discoverytechhub.com/academy/waitlist" />
        {/* Inter, same as the Academy site. Remove these three lines if your site already loads Inter. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        />
        <style>{PAGE_CSS}</style>
      </Helmet>

      <div className="dth-wl flex min-h-screen flex-col bg-[#f3f6fe] text-[#0a1f44]">
        {/* Header */}
        <header className="relative z-20 border-b border-slate-200/70 bg-white/90 backdrop-blur">
          <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-5">
            <Brand />
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to site
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="relative flex-1 overflow-hidden bg-gradient-to-b from-[#c9d8f7] via-[#dbe5fb] to-[#eef3fe]">
          {/* Curved bottom edge */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-44 left-1/2 h-72 w-[150%] -translate-x-1/2 rounded-[50%] bg-[#f3f6fe]"
          />

          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 pb-32 pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:pb-40 lg:pt-16">
            {/* Text and form */}
            <div className="order-1">
              <motion.p
                {...rise(0.05)}
                className="dth-mono text-[12px] font-bold uppercase tracking-[0.2em] text-blue-700"
              >
                DiscoveryTech Academy · Opening soon
              </motion.p>

              <motion.h1
                {...rise(0.12)}
                className="mt-5 text-[2.9rem] font-extrabold leading-[1] tracking-[-0.03em] text-[#0a1230] sm:text-6xl lg:text-[3.5rem] xl:text-[4.25rem]"
              >
                Nigeria's next skills start here.
              </motion.h1>

              <motion.p {...rise(0.2)} className="mt-6 max-w-xl text-xl leading-relaxed text-slate-500">
                Join the waitlist for{' '}
                <strong className="font-semibold text-[#0a1230]">DiscoveryTech Academy</strong>, the e-learning
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
                        <div className="relative flex-1">
                          <label htmlFor="waitlist-email" className="sr-only">
                            Email address
                          </label>
                          <svg
                            viewBox="0 0 24 24"
                            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          >
                            <rect x="3" y="5" width="18" height="14" rx="3" />
                            <path d="m4 7 8 6 8-6" />
                          </svg>
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
                            className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-base text-slate-900 placeholder-slate-400 shadow-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/15"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={status === 'loading'}
                          className="group inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-blue-700 px-7 font-semibold text-white shadow-lg shadow-blue-700/25 transition hover:bg-blue-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {status === 'loading' ? (
                            <>
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                              Reserving...
                            </>
                          ) : (
                            <>
                              Join the waitlist
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </>
                          )}
                        </button>
                      </div>

                      {status === 'error' && (
                        <p role="alert" className="mt-3 text-sm font-medium text-rose-600">
                          {message}
                        </p>
                      )}

                      <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                        {perks.map((p) => (
                          <li key={p} className="flex items-center gap-2 text-sm text-slate-600">
                            <span className="grid h-4 w-4 place-items-center rounded-full bg-blue-700 text-white">
                              <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                            </span>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mt-8 max-w-xl"
                    >
                      <p className="dth-mono text-[12px] font-bold uppercase tracking-[0.2em] text-blue-700">
                        {already ? 'Already registered' : "You're in"}
                      </p>
                      <p className="mt-2 text-2xl font-bold text-[#0a1230]">
                        {already ? "You're already on the list." : 'Seat reserved. Check your inbox.'}
                      </p>

                      {/* Founding learner pass */}
                      <motion.div
                        initial={reduce ? false : { opacity: 0, rotate: -1.5, y: 14 }}
                        animate={{ opacity: 1, rotate: 0, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="relative mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-blue-900/10"
                      >
                        <div
                          className="absolute inset-y-0 left-0 w-1.5"
                          style={{ background: 'linear-gradient(#008751 33%, #e5e7eb 33% 66%, #008751 66%)' }}
                        />
                        <div className="py-5 pl-7 pr-5">
                          <div className="flex items-center justify-between">
                            <p className="dth-mono text-[10px] font-bold uppercase tracking-[0.2em] text-blue-700">
                              Founding learner pass
                            </p>
                            <p className="dth-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">Admit one</p>
                          </div>
                          <p className="dth-mono mt-4 text-4xl font-bold tracking-tight text-blue-700">
                            {position ? `#${String(position).padStart(4, '0')}` : 'FOUNDING'}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">DiscoveryTech Academy · Opening soon</p>
                          <div className="my-4 border-t border-dashed border-slate-300" />
                          <p className="dth-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">Reserved for</p>
                          <p className="dth-mono mt-1 truncate text-sm text-[#0a1230]">{cleanEmail}</p>
                        </div>
                      </motion.div>

                      {/* Share */}
                      <p className="mt-6 text-sm font-semibold text-[#0a1230]">Share your pass</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {shareLinks.map((s) => (
                          <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                          >
                            {s.label}
                          </a>
                        ))}
                        <button
                          type="button"
                          onClick={copyLink}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                        >
                          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                          {copied ? 'Copied' : 'Copy link'}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Map */}
            <div className="order-2">
              <NigeriaCard reduce={reduce} />
            </div>
          </div>
        </section>

        <footer className="relative z-10 bg-[#f3f6fe] px-5 pb-8 pt-2 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} DiscoveryTech Hub · Abuja, Nigeria
        </footer>
      </div>
    </>
  );
}
