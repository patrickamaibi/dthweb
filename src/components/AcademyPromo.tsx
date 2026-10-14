import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, GraduationCap, X } from 'lucide-react';
import { ACADEMY_LIVE } from '@/config/academy';

const STORAGE_KEY = 'academyPromo';
const DELAY_MS = 8000; // time on site before the popup appears
const SNOOZE_DAYS = 7; // hidden for this long after "Maybe later" or close
const JOINED_DAYS = 30; // hidden for this long after clicking "Join the waitlist"
const HIDDEN_PREFIXES = ['/academy', '/admin', '/review', '/socials'];

function isSnoozed() {
  try {
    return Number(localStorage.getItem(STORAGE_KEY)) > Date.now();
  } catch {
    return false;
  }
}

function snooze(days: number) {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now() + days * 86_400_000));
  } catch {
    /* storage unavailable: popup may show again next visit */
  }
}

export default function AcademyPromo({ ready = true }: { ready?: boolean }) {
  const { pathname } = useLocation();
  const reduce = !!useReducedMotion();
  const [open, setOpen] = useState(false);
  const shownRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const joinRef = useRef<HTMLAnchorElement>(null);

  const eligible =
    !ACADEMY_LIVE && !HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + '/'));

  const dismiss = useCallback(() => {
    snooze(SNOOZE_DAYS);
    setOpen(false);
  }, []);

  const joined = useCallback(() => {
    snooze(JOINED_DAYS);
    setOpen(false);
  }, []);

  // Show once, after the delay, when the page is eligible and the cookie banner is out of the way
  useEffect(() => {
    if (!eligible || !ready || shownRef.current || isSnoozed()) return;
    const t = window.setTimeout(() => {
      shownRef.current = true;
      setOpen(true);
    }, DELAY_MS);
    return () => window.clearTimeout(t);
  }, [eligible, ready]);

  // Close if the visitor navigates somewhere the popup should not appear
  useEffect(() => {
    if (!eligible) setOpen(false);
  }, [eligible]);

  // Scroll lock, focus and keyboard handling while open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    joinRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dismiss();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const items = dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, dismiss]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="academy-promo"
          className="fixed inset-0 z-[90] flex items-end justify-center bg-black/50 p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) dismiss();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="academy-promo-title"
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white text-[#0A1F44] shadow-2xl dark:bg-gray-900 dark:text-white"
          >
            {/* Header band */}
            <div className="relative flex h-32 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-800 via-blue-600 to-cyan-500">
              <div aria-hidden className="absolute -left-10 -top-12 h-40 w-40 rounded-full bg-white/10" />
              <div aria-hidden className="absolute -bottom-16 -right-8 h-44 w-44 rounded-full bg-white/10" />
              <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-sm">
                <GraduationCap className="h-9 w-9" />
              </div>
              <button
                type="button"
                onClick={dismiss}
                aria-label="Close"
                className="absolute right-3 top-3 rounded-full p-2 text-white/80 transition hover:bg-white/15 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-7 pb-7 pt-6 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-300">
                Opening soon
              </p>
              <h2
                id="academy-promo-title"
                className="mt-2 text-2xl font-extrabold tracking-tight sm:text-[1.7rem]"
              >
                Join the DiscoveryTech Academy
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Practical digital and AI skills, built in Africa, for Africa. Get on the waitlist and be first in
                when the doors open.
              </p>

              <Link
                ref={joinRef}
                to="/academy/waitlist"
                onClick={joined}
                className="group mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-700 font-semibold text-white shadow-lg shadow-blue-700/25 transition hover:bg-blue-800 active:scale-[0.98]"
              >
                Join the waitlist
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <button
                type="button"
                onClick={dismiss}
                className="mt-3 w-full rounded-lg py-2 text-sm text-slate-500 transition hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
