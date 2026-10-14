import { useCallback, useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, GraduationCap, X } from 'lucide-react';
import { ACADEMY_LIVE, ACADEMY_URL } from '@/config/academy';

type Props = { className?: string; children?: ReactNode };

export default function AcademyFooterLink({ className = '', children = 'Academy' }: Props) {
  const reduce = !!useReducedMotion();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const joinRef = useRef<HTMLAnchorElement>(null);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    joinRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
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
  }, [open, close]);

  // Academy is live: behave like a normal link
  if (ACADEMY_LIVE) {
    return (
      <a href={ACADEMY_URL} className={className}>
        {children}
      </a>
    );
  }

  const onTrigger = (e: MouseEvent<HTMLAnchorElement>) => {
    // let ctrl/cmd/shift-click and middle-click open /academy in a new tab as usual
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    setOpen(true);
  };

  const dialog = (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-black/40 p-4 backdrop-blur-[2px] sm:items-center"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="academy-popup-title"
        initial={reduce ? false : { opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white p-6 text-[#0A1F44] shadow-2xl dark:bg-gray-900 dark:text-white"
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-400" />

        <button
          type="button"
          onClick={() => close()}
          aria-label="Close"
          className="absolute right-3 top-4 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-gray-800"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-blue-700 to-cyan-500 text-white shadow-lg shadow-blue-700/30">
          <GraduationCap className="h-6 w-6" />
        </div>

        <p
          className="mt-5 text-xs font-bold uppercase tracking-wide text-blue-700 dark:text-blue-300"
          style={{ fontFamily: '"Courier New", Courier, monospace' }}
        >
          DiscoveryTech Academy
        </p>
        <h2 id="academy-popup-title" className="mt-2 text-2xl font-extrabold tracking-tight">
          Academy opens soon
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          We're putting the finishing touches on it. Join the waitlist and be the first to know when the doors open.
        </p>

        <Link
          ref={joinRef}
          to="/academy/waitlist"
          onClick={() => close(false)}
          className="group mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-700 font-semibold text-white shadow-lg shadow-blue-700/25 transition hover:bg-blue-800"
        >
          Join the waitlist
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>

        <div className="mt-4 flex items-center justify-center gap-5 text-sm">
          <button
            type="button"
            onClick={() => close()}
            className="text-slate-500 transition hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
          >
            Maybe later
          </button>
          <Link
            to="/academy"
            onClick={() => close(false)}
            className="font-medium text-blue-700 transition hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-200"
          >
            See what's coming
          </Link>
        </div>
      </motion.div>
    </div>
  );

  return (
    <>
      <a ref={triggerRef} href="/academy" onClick={onTrigger} className={className} aria-haspopup="dialog">
        {children}
      </a>
      {open && createPortal(dialog, document.body)}
    </>
  );
}
