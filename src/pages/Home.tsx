import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, MonitorSmartphone, TrendingUp, Presentation, Users, Briefcase, ChevronRight, Zap, Wind, Monitor, Volume2 } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { Helmet } from "react-helmet-async";

export default function Home() {
  const whyChooseUs = [
    { title: "One-stop digital solutions", icon: <MonitorSmartphone className="w-6 h-6" /> },
    { title: "Experienced professionals",  icon: <Users className="w-6 h-6" /> },
    { title: "Client-focused approach",    icon: <Briefcase className="w-6 h-6" /> },
    { title: "Affordable & transparent",   icon: <TrendingUp className="w-6 h-6" /> },
    { title: "Timely project delivery",    icon: <CheckCircle2 className="w-6 h-6" /> },
    { title: "Ongoing support & training", icon: <Presentation className="w-6 h-6" /> },
  ];

  const process = [
    { title: "Discover",         desc: "Understanding your goals and challenges" },
    { title: "Strategize",       desc: "Crafting a tailored solution" },
    { title: "Design & Develop", desc: "Building with precision" },
    { title: "Review & Refine",  desc: "Perfecting the solution" },
    { title: "Deliver & Deploy", desc: "Launching your project" },
    { title: "Support & Grow",   desc: "Ensuring long-term success" },
  ];

  const hubHighlights = [
    { icon: <Users className="w-5 h-5" />,   text: "Seats 22 persons"     },
    { icon: <Zap className="w-5 h-5" />,     text: "Constant power supply" },
    { icon: <Wind className="w-5 h-5" />,    text: "Air conditioned"       },
    { icon: <Monitor className="w-5 h-5" />, text: "Projector & PA system" },
    { icon: <Volume2 className="w-5 h-5" />, text: "PA system included"    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>DiscoveryTech Hub | Your Digital Transformation Partner</title>
        <meta name="description" content="DiscoveryTech Hub offers web design, ICT training, graphic design, branding & consultancy services in Nigeria and beyond. Transform your business today." />
        <link rel="canonical" href="https://discoverytechhub.com/" />
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content="https://discoverytechhub.com/" />
        <meta property="og:title"       content="DiscoveryTech Hub | Your Digital Transformation Partner" />
        <meta property="og:description" content="DiscoveryTech Hub offers web design, ICT training, graphic design, branding & consultancy services in Nigeria and beyond. Transform your business today." />
        <meta property="og:image"       content="https://discoverytechhub.com/og.png" />
        <meta property="og:image:width"  content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt"    content="DiscoveryTech Hub - Your Digital Transformation Partner" />
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:url"         content="https://discoverytechhub.com/" />
        <meta name="twitter:title"       content="DiscoveryTech Hub | Your Digital Transformation Partner" />
        <meta name="twitter:description" content="DiscoveryTech Hub offers web design, ICT training, graphic design, branding & consultancy services in Nigeria and beyond. Transform your business today." />
        <meta name="twitter:image"       content="https://discoverytechhub.com/og.png" />
        <meta name="twitter:image:alt"   content="DiscoveryTech Hub - Your Digital Transformation Partner" />
      </Helmet>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center min-h-[90vh] bg-primary dark:bg-gray-950">
        <div className="absolute inset-0 z-0 opacity-30">
          <img src="/hero.jpg" alt="DiscoveryTech Hub Hero Background" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 z-0 opacity-[0.10] mix-blend-overlay">
          <img src="/hero1.jpg" alt="Tech Overlay" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 z-0 bg-blue-900/70 dark:bg-gray-950/80 mix-blend-multiply"></div>
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[120px] opacity-40 z-0"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[120px] opacity-30 z-0"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h1 className="text-5xl md:text-7xl font-bold font-jakarta text-white leading-tight mb-6">
                Your Digital{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  Transformation
                </span>{" "}
                Partner
              </h1>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                Empowering businesses, organizations, and individuals with innovative web design, ICT training, branding, and high-quality technology solutions.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.4} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/quote"
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-500 transition-all shadow-lg hover:shadow-xl hover:shadow-blue-600/20 hover:-translate-y-1 flex items-center justify-center gap-2 border border-blue-500"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white backdrop-blur-md rounded-full font-medium shadow-sm hover:bg-white/20 border border-white/20 transition-all hover:-translate-y-1"
              >
                View Services
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── About Preview ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50 dark:bg-gray-900 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <AnimatedSection className="w-full md:w-1/2">
              <div className="aspect-square rounded-3xl border border-white dark:border-gray-700 shadow-2xl relative overflow-hidden flex items-end justify-center group">
                <img
                  src="/image1.jpg"
                  alt="ICT Solutions and Web Design Services in Nigeria"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent dark:from-gray-950/90"></div>
                <div className="glassmorphism p-6 m-8 rounded-2xl w-full max-w-sm text-center border-white z-10 shadow-xl backdrop-blur-md relative overflow-hidden transition-transform hover:-translate-y-2">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100/50 rounded-full blur-xl"></div>
                  <MonitorSmartphone className="w-12 h-12 text-blue-600 mx-auto mb-4 relative z-10" />
                  <h3 className="text-xl font-bold font-jakarta mb-2 text-primary dark:text-white relative z-10">
                    End-to-End Digital Solutions
                  </h3>
                </div>
              </div>
            </AnimatedSection>

            <div className="w-full md:w-1/2">
              <AnimatedSection>
                <h2 className="text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase text-sm mb-2">About DiscoveryTech Hub</h2>
                <h3 className="text-4xl font-bold font-jakarta text-primary dark:text-white mb-6">Web Design & ICT Solutions Built for Nigeria</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 text-lg">
                  DiscoveryTech Hub is a premier ICT solutions company operating at the intersection of technology, creativity, and education. We deliver end-to-end digital services including web design, ICT training, graphic design, branding, and consultancy.
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8 text-lg">
                  From web development and branding to ICT training and consultancy, we provide everything you need under one roof, serving businesses across Nigeria and beyond.
                </p>
                <Link
                  to="/about"
                  className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1"
                >
                  Learn more about our mission <ArrowRight className="w-4 h-4" />
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ─────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase text-sm mb-2">Why Choose DiscoveryTech Hub</h2>
            <h3 className="text-3xl md:text-4xl font-bold font-jakarta text-primary dark:text-white">Nigeria's Trusted ICT & Digital Solutions Partner</h3>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="glassmorphism p-8 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-2 group border border-slate-100 dark:border-gray-700 dark:bg-gray-800/50">
                  <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-bold font-jakarta text-primary dark:text-white mb-3">{item.title}</h4>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ───────────────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50 dark:bg-gray-900 relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase text-sm mb-2">Our Web Design & ICT Service Process</h2>
            <h3 className="text-4xl md:text-5xl font-bold font-jakarta text-primary dark:text-white mb-4">How We Deliver Technology Solutions</h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              A clear, client-focused process for delivering web design, ICT training, branding, and consultancy services across Nigeria.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {process.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 lg:p-10 rounded-3xl flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_20px_40px_rgba(37,99,235,0.08)] border border-transparent hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-500 transition-all duration-400 group hover:-translate-y-2 relative overflow-hidden">
                  <span className="font-jakarta text-6xl lg:text-7xl font-bold text-blue-500 opacity-[0.08] group-hover:opacity-20 transition-opacity leading-none absolute -right-2 -bottom-2 sm:relative sm:right-auto sm:bottom-auto sm:opacity-20 sm:group-hover:opacity-40 sm:min-w-[70px] z-0 pointer-events-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 relative z-10 w-full">
                    <h4 className="text-xl lg:text-2xl font-bold font-jakarta text-primary dark:text-white mb-2 pr-12 sm:pr-0">
                      {step.title}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm lg:text-base leading-relaxed m-0">{step.desc}</p>
                  </div>
                  <div className="hidden sm:block ml-auto text-blue-600 dark:text-blue-400 group-hover:translate-x-2 transition-transform duration-300 flex-shrink-0 relative z-10">
                    {i === process.length - 1 ? (
                      <CheckCircle2 className="w-6 h-6 lg:w-8 lg:h-8" />
                    ) : (
                      <ArrowRight className="w-6 h-6 lg:w-8 lg:h-8" />
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HUB TEASER ════════════════════════════════════════════════════════
          Injected between Process and the final CTA banner
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white dark:bg-gray-950 px-4">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-2xl">

              {/* Left — image */}
              <div className="relative h-64 md:h-auto overflow-hidden">
                <img
                  src="/hub1.jpg"
                  alt="DiscoveryTech Hub multipurpose space Abuja"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F44]/60 via-transparent to-transparent md:bg-gradient-to-t md:from-[#0A1F44]/50 md:via-transparent" />
                <span className="absolute top-5 left-5 bg-blue-600 text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full">
                  Now Bookable
                </span>
              </div>

              {/* Right — copy */}
              <div className="bg-[#0A1F44] dark:bg-gray-900 p-10 md:p-12 flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold font-jakarta text-white leading-tight mb-4">
                    Need a professional space in Abuja?
                  </h2>
                  <p className="text-blue-200 text-base leading-relaxed mb-8">
                    Our multipurpose hub is available for co-working, trainings, executive meetings, and events. Fully equipped. Ready when you are.
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-3 mb-8">
                    {hubHighlights.slice(0, 4).map((h) => (
                      <li key={h.text} className="flex items-center gap-3 text-blue-100 text-sm">
                        <span className="text-blue-400 shrink-0">{h.icon}</span>
                        {h.text}
                      </li>
                    ))}
                  </ul>

                  <p className="text-blue-300 text-sm mb-8">
                    From{" "}
                    <span className="text-white font-bold text-xl">₦80,000</span>
                    <span className="text-blue-300"> / day · Negotiable</span>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/hub"
                    className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500
                               text-white font-semibold px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg text-sm"
                  >
                    View Space & Book <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="https://wa.me/2349047465802?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20booking%20the%20DiscoveryTech%20Hub%20space."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-white/25 hover:bg-white/10
                               text-white font-medium px-6 py-3 rounded-xl transition-all text-sm"
                  >
                    WhatsApp Us
                  </a>
                </div>
              </div>

            </div>
          </AnimatedSection>
        </div>
      </section>
      {/* ══ END HUB TEASER ══════════════════════════════════════════════════ */}

      {/* ── CTA Banner ────────────────────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold font-jakarta text-primary dark:text-white mb-8 max-w-3xl mx-auto leading-tight">
              Let's build something{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                extraordinary
              </span>{" "}
              together.
            </h2>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 px-10 py-5 bg-primary dark:bg-blue-700 text-white rounded-full font-bold text-lg hover:bg-blue-900 dark:hover:bg-blue-600 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Get a Quote <ChevronRight className="w-5 h-5" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}