import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

// ====================== THEME TOGGLE COMPONENT ======================
interface ThemeToggleProps {
  theme: 'light' | 'dark' | 'system';
  setThemeMode: (t: 'light' | 'dark' | 'system') => void;
}

function ThemeToggle({ theme, setThemeMode }: ThemeToggleProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handler = () => setOpen(false);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [open]);

  const SunIcon = ({ cls }: { cls: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={cls} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4.5" />
      <line x1="12" y1="2" x2="12" y2="4.5" />
      <line x1="12" y1="19.5" x2="12" y2="22" />
      <line x1="2" y1="12" x2="4.5" y2="12" />
      <line x1="19.5" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="6.7" y2="6.7" />
      <line x1="17.3" y1="17.3" x2="19.07" y2="19.07" />
      <line x1="4.93" y1="19.07" x2="6.7" y2="17.3" />
      <line x1="17.3" y1="6.7" x2="19.07" y2="4.93" />
    </svg>
  );

  const MoonIcon = ({ cls }: { cls: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={cls} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M21 12.79A9 9 0 0 1 11.21 3a7 7 0 1 0 9.79 9.79z" />
    </svg>
  );

  const MonitorIcon = ({ cls }: { cls: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={cls} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );

  const options = [
    { value: 'light'  as const, label: 'Light',  Icon: SunIcon },
    { value: 'dark'   as const, label: 'Dark',   Icon: MoonIcon },
    { value: 'system' as const, label: 'System', Icon: MonitorIcon },
  ];

  const activeOption = options.find((o) => o.value === theme) ?? options[0];

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle theme"
        className="px-2 py-2 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors text-slate-600 dark:text-slate-300"
      >
        <activeOption.Icon cls="w-[22px] h-[22px]" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl shadow-lg z-50 overflow-hidden py-1">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { setThemeMode(opt.value); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                theme === opt.value
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-gray-800'
              }`}
            >
              <span className={theme === opt.value ? 'text-blue-500 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}>
                <opt.Icon cls="w-4 h-4" />
              </span>
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ====================== NAVBAR ======================
interface NavbarProps {
  theme: 'light' | 'dark' | 'system';
  setThemeMode: (t: 'light' | 'dark' | 'system') => void;
}

export default function Navbar({ theme, setThemeMode }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  const navLinks = [
    { to: "/",        label: "Home"        },
    { to: "/about",   label: "About Us"    },
    { to: "/services",label: "Services"    },
    { to: "/hub",     label: "Book a Space"},  // ← NEW
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 shadow-sm border-b border-slate-100 dark:border-gray-800">
      <div className="container mx-auto px-6 h-16 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <img
            src="/logonav.png"
            alt="DiscoveryTech Hub"
            width={160}
            height={40}
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center font-medium text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                location.pathname === link.to
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-slate-700 dark:text-slate-300"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/quote"
            className="px-5 py-2 bg-primary dark:bg-blue-700 text-white rounded-full text-sm hover:bg-blue-900 dark:hover:bg-blue-600 transition-colors shadow-sm"
          >
            Get Quote
          </Link>
          <ThemeToggle theme={theme} setThemeMode={setThemeMode} />
        </nav>

        {/* Mobile: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle theme={theme} setThemeMode={setThemeMode} />
          <button
            type="button"
            className="relative z-[60] p-2 text-primary dark:text-white bg-white dark:bg-gray-900 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden fixed top-16 left-0 right-0 bottom-0 bg-white dark:bg-gray-900 border-t border-slate-100 dark:border-gray-800 shadow-xl z-50 px-6 py-6 overflow-y-auto"
          >
            <nav className="flex flex-col">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.07 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center py-4 text-base font-medium border-b border-slate-100 dark:border-gray-800 transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                      location.pathname === link.to
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {link.label}
                    {/* Highlight badge for Book a Space */}
                    {link.to === "/hub" && (
                      <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full font-semibold">
                        New
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.28 }}
                className="pt-6"
              >
                <Link
                  to="/quote"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-3 text-center bg-primary dark:bg-blue-700 text-white rounded-full font-semibold text-base hover:bg-blue-900 dark:hover:bg-blue-600 transition-colors shadow-md"
                >
                  Get Quote
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="pt-4"
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-3 text-center text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-gray-700 rounded-full font-medium text-base hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Close Menu
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}