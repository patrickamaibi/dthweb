import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';
import WhatsAppFloating from '@/components/WhatsAppFloating';
import ScrollToTop from '@/components/ScrollToTop';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Quote from '@/pages/Quote';
import HubPage from '@/pages/HubPage';
import { X } from 'lucide-react';

function App() {
  const [showCookie, setShowCookie] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  // ====================== THEME SYSTEM ======================
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
    } else {
      setTheme('system');
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        document.documentElement.classList.toggle('dark', media.matches);
      }
    };
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, [theme]);

  const setThemeMode = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    if (newTheme === 'system') {
      localStorage.removeItem('theme');
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', isDark);
    } else {
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }
  };

  // ====================== COOKIE CONSENT ======================
  useEffect(() => {
    const accepted = localStorage.getItem('cookieAccepted');
    if (!accepted) setShowCookie(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieAccepted', 'true');
    setShowCookie(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieAccepted', 'false');
    setShowCookie(false);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <meta name="robots" content="index, follow" />
        <meta name="author" content="DiscoveryTech Hub" />
        <meta property="og:site_name" content="DiscoveryTech Hub" />
      </Helmet>

      <Router>
        <ScrollToTop />
        <div
          className="font-sans antialiased text-[#0A1F44] dark:text-white dark:bg-gray-950 flex flex-col min-h-screen relative"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          <WhatsAppFloating />
          <Preloader />

          <Navbar theme={theme} setThemeMode={setThemeMode} />

          <main className="flex-grow">
            <Routes>
              <Route path="/"         element={<Home />}    />
              <Route path="/about"    element={<About />}   />
              <Route path="/services" element={<Services />}/>
              <Route path="/quote"    element={<Quote />}   />
              <Route path="/hub"      element={<HubPage />} />
            </Routes>
          </main>

          <Footer theme={theme} setThemeMode={setThemeMode} />

          {/* Cookie Banner */}
          {showCookie && (
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A1F44] dark:bg-gray-900 text-white px-6 py-4 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-200 max-w-2xl">
                🍪 We use cookies to improve your experience on our website. By continuing to browse, you agree to our{' '}
                <button
                  onClick={() => setShowPrivacy(true)}
                  className="underline text-blue-300 hover:text-blue-200 cursor-pointer"
                >
                  Privacy Policy
                </button>.
              </p>
              <div className="flex gap-3 shrink-0">
                <button
                  onClick={declineCookies}
                  className="px-5 py-2 rounded-lg border border-slate-400 text-slate-300 text-sm hover:bg-slate-700 transition-all"
                >
                  Decline
                </button>
                <button
                  onClick={acceptCookies}
                  className="px-5 py-2 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 transition-all"
                >
                  Accept
                </button>
              </div>
            </div>
          )}

          {/* Privacy Policy Modal */}
          {showPrivacy && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 rounded-t-2xl">
                  <h2 className="text-xl font-bold text-[#0A1F44] dark:text-white">Privacy Policy</h2>
                  <button
                    onClick={() => setShowPrivacy(false)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  </button>
                </div>

                <div className="px-6 py-6 text-sm text-slate-600 dark:text-slate-300 space-y-5 leading-relaxed">
                  <p className="text-xs text-slate-400">Last updated: April 2026</p>
                  <div>
                    <h3 className="font-semibold text-[#0A1F44] dark:text-white mb-1">1. Introduction</h3>
                    <p>DiscoveryTech Hub ("we", "us", or "our") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit discoverytechhub.com.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A1F44] dark:text-white mb-1">2. Information We Collect</h3>
                    <p>We may collect personal information you provide directly to us, including your name, email address, phone number, and any other details you submit via our contact or quote forms.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A1F44] dark:text-white mb-1">3. How We Use Your Information</h3>
                    <p>We use the information we collect to respond to your enquiries, provide our services, improve our website experience, and communicate with you about our offerings.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A1F44] dark:text-white mb-1">4. Cookies</h3>
                    <p>We use cookies to enhance your browsing experience on our website. Cookies are small files stored on your device that help us understand how visitors interact with our site. You may choose to decline cookies, though some features of the site may not function properly.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A1F44] dark:text-white mb-1">5. Data Sharing</h3>
                    <p>We do not sell, trade, or rent your personal information to third parties. Your data is only used internally to serve you better.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A1F44] dark:text-white mb-1">6. Data Security</h3>
                    <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, or disclosure.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A1F44] dark:text-white mb-1">7. Your Rights</h3>
                    <p>You have the right to request access to, correction of, or deletion of your personal data at any time. To exercise these rights, please contact us at info@discoverytechhub.com.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A1F44] dark:text-white mb-1">8. Contact Us</h3>
                    <p>If you have any questions about this Privacy Policy, please reach out to us at{' '}
                      <a href="mailto:info@discoverytechhub.com" className="text-blue-600 dark:text-blue-400 underline">
                        info@discoverytechhub.com
                      </a>.
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-slate-100 dark:border-gray-700 flex justify-end">
                  <button
                    onClick={() => setShowPrivacy(false)}
                    className="px-6 py-2 bg-[#0A1F44] dark:bg-blue-700 text-white rounded-full text-sm font-semibold hover:bg-blue-900 dark:hover:bg-blue-600 transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;