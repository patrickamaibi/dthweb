import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

interface FooterProps {
  theme: 'light' | 'dark' | 'system';
  setThemeMode: (t: 'light' | 'dark' | 'system') => void;
}

// ====================== THEME TOGGLE (Footer variant) ======================
function ThemeToggle({ theme, setThemeMode }: FooterProps) {
  const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" viewBox="0 0 24 24">
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

  const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M21 12.79A9 9 0 0 1 11.21 3a7 7 0 1 0 9.79 9.79z" />
    </svg>
  );

  const MonitorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
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

  return (
    <div className="flex items-center gap-1 bg-white/10 rounded-full p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setThemeMode(opt.value)}
          title={opt.label}
          className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${
            theme === opt.value
              ? 'bg-white text-[#0A1F44] shadow'
              : 'text-blue-200 hover:text-white'
          }`}
        >
          <opt.Icon />
        </button>
      ))}
    </div>
  );
}

export default function Footer({ theme, setThemeMode }: FooterProps) {
  return (
    <footer className="bg-primary dark:bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <img src="/logowhite.png" alt="DiscoveryTech Hub" className="w-auto h-24 md:h-36 object-contain drop-shadow-lg lg:-ml-4 relative -left-2" />
          <div className="relative z-10 -mt-2 md:-mt-8">
            <p className="text-blue-200 dark:text-blue-300 mb-1 font-medium">Where Technology Meets Creativity</p>
            <p className="text-blue-100 dark:text-blue-200 italic">Let's build something extraordinary together.</p>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-blue-200 dark:text-blue-300">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li><Link to="/quote" className="hover:text-white transition-colors">Get Quote</Link></li>
            <li>
              <a
                href="https://blog.discoverytechhub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Blog
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-xl mb-6 font-jakarta">Contact Information</h4>
          <ul className="space-y-4 text-blue-200 dark:text-blue-300 mb-8">
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <span>+2349047465802 <br /> +2348076854730</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <a href="mailto:info@discoverytechhub.com" className="hover:text-white transition-colors cursor-pointer">
                info@discoverytechhub.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <span>Abuja, Nigeria and Remote</span>
            </li>
          </ul>

          <h4 className="font-bold text-lg mb-4 font-jakarta">Connect with us</h4>
          <div className="flex items-center gap-3 flex-wrap">
            <a href="https://web.facebook.com/disctechhub" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-900/50 dark:bg-blue-950/60 flex items-center justify-center text-blue-300 hover:bg-blue-600 hover:text-white hover:-translate-y-1 transition-all shadow border border-blue-800/30">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://x.com/disctechhub" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-900/50 dark:bg-blue-950/60 flex items-center justify-center text-blue-300 hover:bg-black hover:text-white hover:-translate-y-1 transition-all shadow border border-blue-800/30">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/company/discoverytechhub" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-900/50 dark:bg-blue-950/60 flex items-center justify-center text-blue-300 hover:bg-blue-600 hover:text-white hover:-translate-y-1 transition-all shadow border border-blue-800/30">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/discoverytechhub" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-900/50 dark:bg-blue-950/60 flex items-center justify-center text-blue-300 hover:bg-pink-600 hover:text-white hover:-translate-y-1 transition-all shadow border border-blue-800/30">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="http://tiktok.com/@discoverytechhub" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-900/50 dark:bg-blue-950/60 flex items-center justify-center text-blue-300 hover:bg-black hover:text-white hover:-translate-y-1 transition-all shadow border border-blue-800/30">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 15.68a6.34 6.34 0 0012.67-1.48V8.63a8.31 8.31 0 004.77 1.52v-3.4a4.85 4.85 0 01-2.85-1.06z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar: copyright + theme toggle */}
      <div className="container mx-auto px-6 mt-12 pt-6 border-t border-blue-800 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-blue-300 dark:text-gray-400">
        <span>© {new Date().getFullYear()} DiscoveryTech Hub. All rights reserved.</span>
        <ThemeToggle theme={theme} setThemeMode={setThemeMode} />
      </div>
    </footer>
  );
}