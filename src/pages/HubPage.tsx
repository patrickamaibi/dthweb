import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";
import {
  Zap, Wind, Monitor, Volume2, Bath, WifiOff,
  Users, ArrowRight, ChevronRight, CheckCircle2,
  Calendar, Clock, Building2, MapPin,
} from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// ─── Reusable scroll-reveal wrapper ──────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const variants = {
    up:    { hidden: { opacity: 0, y: 40 },  visible: { opacity: 1, y: 0 } },
    left:  { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 40 },  visible: { opacity: 1, x: 0 } },
    none:  { hidden: { opacity: 0 },          visible: { opacity: 1 } },
  }[direction];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const heroSlides = [
  { img: "/hub1.jpg", caption: "A professional space built for focused work" },
  { img: "/hub2.jpg", caption: "Ideal for trainings, workshops & team sessions" },
  { img: "/hub3.jpg", caption: "Executive meetings & presentations fully equipped" },
];

const amenities = [
  { icon: Zap,     label: "Constant Power",    sub: "Uninterrupted electricity zero downtime",  ok: true  },
  { icon: Wind,    label: "Air Conditioning",   sub: "Climate-controlled comfort all day",          ok: true  },
  { icon: Monitor, label: "Projector & Screen", sub: "HD display, presentation-ready",              ok: true  },
  { icon: Volume2, label: "PA System",          sub: "Crystal-clear audio for every session",       ok: true  },
  { icon: Bath,    label: "Conveniences",       sub: "Clean, well-maintained restroom facilities",  ok: true  },
  { icon: WifiOff, label: "No Internet",        sub: "Bring your own hotspot for online sessions",  ok: false },
];

const useCases = [
  { title: "Co-Working",           desc: "Escape distractions. Work in a quiet, professional environment." },
  { title: "Training & Workshops", desc: "ICT training, skill development, and hands-on learning sessions." },
  { title: "Executive Meetings",   desc: "Impress clients with a fully equipped boardroom experience." },
  { title: "Presentations",        desc: "Pitch days, product demos, and stakeholder briefings." },
  { title: "Team Offsites",        desc: "Quarterly reviews, strategic planning, team alignment days." },
  { title: "Seminars & Events",    desc: "Panel discussions, small conferences up to 22 persons." },
];

// ─── Form ─────────────────────────────────────────────────────────────────────
type FormData = {
  fullName: string; email: string; phone: string; organization: string;
  eventType: string; eventDate: string; startTime: string; endTime: string;
  attendees: string; requirements: string; heardFrom: string;
};

const EMPTY: FormData = {
  fullName: "", email: "", phone: "", organization: "",
  eventType: "", eventDate: "", startTime: "", endTime: "",
  attendees: "", requirements: "", heardFrom: "",
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function HubPage() {
  const [form, setForm]           = useState<FormData>(EMPTY);
  const [errors, setErrors]       = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [mailError, setMailError] = useState(false);

  const validate = (): Partial<FormData> => {
    const e: Partial<FormData> = {};
    if (!form.fullName.trim())                                    e.fullName  = "Full name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email     = "Valid email required";
    if (!form.phone.trim())                                       e.phone     = "Phone number is required";
    if (!form.eventType)                                          e.eventType = "Please select an event type";
    if (!form.eventDate)                                          e.eventDate = "Please select a date";
    if (!form.attendees)                                          e.attendees = "Please select attendee count";
    return e;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name as keyof FormData])
      setErrors(p => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setMailError(false);

    // ── WhatsApp message (pre-filled, opens in new tab) ──────────────────────
    const whatsappMsg =
`*New Hub Booking DiscoveryTech Hub*
──────────────────────────────
👤 *Name:* ${form.fullName}
📧 *Email:* ${form.email}
📞 *Phone:* ${form.phone}
🏢 *Organisation:* ${form.organization || "N/A"}
──────────────────────────────
🎯 *Event Type:* ${form.eventType}
📅 *Date:* ${form.eventDate}
⏰ *Time:* ${form.startTime || "TBD"} – ${form.endTime || "TBD"}
👥 *Attendees:* ${form.attendees}
📝 *Special Requirements:* ${form.requirements || "None"}
📣 *How they found us:* ${form.heardFrom || "N/A"}`;

    // ── POST to PHP mailer (background, silent) ───────────────────────────────
    // Place send-booking.php at the root of your server or adjust the path below.
    try {
      const res = await fetch("/send-booking.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!json.success) setMailError(true);
    } catch {
      // Network / server error flag it but don't block the user
      setMailError(true);
    }

    setLoading(false);
    setSubmitted(true);

    // Open WhatsApp with pre-filled message
    window.open(
      `https://wa.me/2349047465802?text=${encodeURIComponent(whatsappMsg)}`,
      "_blank"
    );
  };

  const inputCls = (field: keyof FormData) =>
    `w-full border rounded-xl px-4 py-3 text-sm bg-white dark:bg-gray-800 dark:text-white outline-none
     focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200
     ${errors[field]
       ? "border-red-400 dark:border-red-500"
       : "border-slate-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500"}`;

  return (
    <>
      <Helmet>
        <title>Book the Hub – DiscoveryTech Hub | Multipurpose Space in Abuja</title>
        <meta name="description" content="Book DiscoveryTech Hub's professional multipurpose hall in Abuja. Co-working, training, executive meetings & events. Seats 22 persons. ₦80,000/day." />
        <link rel="canonical" href="https://discoverytechhub.com/hub" />
        <meta property="og:url"         content="https://discoverytechhub.com/hub" />
        <meta property="og:title"       content="Book the Hub – DiscoveryTech Hub | Multipurpose Space Abuja" />
        <meta property="og:description" content="Professional multipurpose hall in Abuja. Seats 22. AC, projector, PA, constant power. ₦80,000/day." />
        <meta property="og:image"       content="https://discoverytechhub.com/hub1.jpg" />
      </Helmet>

      <div className="flex flex-col min-h-screen pt-16">

        {/* ══ HERO SLIDER ══════════════════════════════════════════════════════ */}
        <section className="relative h-[88vh] min-h-[560px] overflow-hidden">
          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            effect="fade"
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            loop
            className="h-full w-full"
          >
            {heroSlides.map((slide, i) => (
              <SwiperSlide key={i} className="relative h-full">
                <img
                  src={slide.img}
                  alt={slide.caption}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A1F44]/80 via-[#0A1F44]/55 to-[#0A1F44]/85" />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Hero text floats above Swiper */}
          <div className="absolute inset-0 z-10 flex items-center justify-center px-6 pointer-events-none">
            <div className="text-center max-w-4xl pointer-events-auto">
              <motion.span
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block bg-blue-600/90 text-white text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6"
              >
                Now Available for Booking
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-7xl font-bold font-jakarta text-white leading-tight mb-5"
              >
                The{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  DiscoveryTech
                </span>{" "}
                Hub
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              >
                A professional multipurpose space in Abuja built for focused work,
                impactful trainings, and productive meetings.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="flex flex-wrap justify-center gap-3 mb-10"
              >
                {[
                  { icon: Users,    text: "22 Persons Max"  },
                  { icon: MapPin,   text: "Abuja, Nigeria"  },
                  { icon: Calendar, text: "₦80,000 / Day"   },
                ].map(({ icon: Icon, text }) => (
                  <span
                    key={text}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm px-4 py-2 rounded-full"
                  >
                    <Icon className="w-4 h-4 text-blue-300" />
                    {text}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <a
                  href="#booking-form"
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full
                             transition-all shadow-lg hover:shadow-blue-600/30 hover:-translate-y-1
                             flex items-center gap-2"
                >
                  Book This Space <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#amenities"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20
                             text-white font-medium rounded-full transition-all hover:-translate-y-1"
                >
                  See What's Included
                </a>
              </motion.div>
            </div>
          </div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center pt-2"
            >
              <div className="w-1 h-2 bg-white/60 rounded-full" />
            </motion.div>
          </motion.div>
        </section>

        {/* ══ QUICK STATS BAR ══════════════════════════════════════════════════ */}
        <section className="bg-[#0A1F44] dark:bg-gray-900 py-5 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 text-white text-center">
            {[
              { label: "Capacity",     value: "22 Persons" },
              { label: "Daily Rate",   value: "₦80,000"    },
              { label: "Power Supply", value: "Constant"   },
              { label: "Location",     value: "Abuja, NG"  },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} direction="none">
                <div className="px-4 py-2">
                  <p className="text-2xl font-bold font-jakarta text-white">{s.value}</p>
                  <p className="text-xs text-white/70 uppercase tracking-wider mt-0.5">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ AMENITIES ════════════════════════════════════════════════════════ */}
        <section id="amenities" className="py-24 bg-slate-50 dark:bg-gray-900 px-4">
          <div className="max-w-5xl mx-auto">
            <Reveal className="text-center mb-14">
              <span className="text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase text-sm">
                Fully Equipped
              </span>
              <h2 className="text-4xl font-bold font-jakarta text-primary dark:text-white mt-2">
                What's Included
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto">
                Everything you need for a productive session nothing you don't.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {amenities.map(({ icon: Icon, label, sub, ok }, i) => (
                <Reveal key={label} delay={i * 0.08}>
                  <motion.div
                    whileHover={ok ? { y: -6, scale: 1.02 } : {}}
                    className={`bg-white dark:bg-gray-800 rounded-2xl p-7 border transition-all duration-300
                      ${ok
                        ? "border-slate-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-600"
                        : "border-dashed border-slate-200 dark:border-gray-700 opacity-55"}`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4
                      ${ok
                        ? "bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"
                        : "bg-slate-100 dark:bg-gray-700 text-slate-400"}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-primary dark:text-white text-base">{label}</h3>
                      {!ok && (
                        <span className="text-xs bg-slate-100 dark:bg-gray-700 text-slate-400 px-2 py-0.5 rounded-full">
                          Not included
                        </span>
                      )}
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{sub}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PHOTO STRIP (thumbnail slider) ══════════════════════════════════ */}
        <section className="py-16 bg-white dark:bg-gray-950 px-4 overflow-hidden">
          <div className="max-w-5xl mx-auto">
            <Reveal className="text-center mb-10">
              <h2 className="text-3xl font-bold font-jakarta text-primary dark:text-white">
                See the Space
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                A closer look at the DiscoveryTech Hub.
              </p>
            </Reveal>

            <Reveal direction="none">
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation
                loop
                breakpoints={{
                  0:   { slidesPerView: 1,   spaceBetween: 16 },
                  640: { slidesPerView: 2,   spaceBetween: 20 },
                  1024:{ slidesPerView: 2.4, spaceBetween: 24 },
                }}
                className="pb-12"
              >
                {["/hub1.jpg", "/hub2.jpg", "/hub3.jpg"].map((src, i) => (
                  <SwiperSlide key={i}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-2xl overflow-hidden aspect-video shadow-md border border-slate-100 dark:border-gray-700"
                    >
                      <img
                        src={src}
                        alt={`DiscoveryTech Hub view ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Reveal>
          </div>
        </section>

        {/* ══ USE CASES SLIDER ═════════════════════════════════════════════════ */}
        <section className="py-24 bg-slate-50 dark:bg-gray-900 px-4 overflow-hidden">
          <div className="max-w-5xl mx-auto">
            <Reveal className="text-center mb-14">
              <span className="text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase text-sm">
                Versatile by Design
              </span>
              <h2 className="text-4xl font-bold font-jakarta text-primary dark:text-white mt-2">
                Perfect For
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-3">
                One space. Endless possibilities.
              </p>
            </Reveal>

            <Reveal direction="none">
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3200, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop
                breakpoints={{
                  0:    { slidesPerView: 1,   spaceBetween: 16 },
                  640:  { slidesPerView: 2,   spaceBetween: 20 },
                  1024: { slidesPerView: 3,   spaceBetween: 24 },
                }}
                className="pb-12"
              >
                {useCases.map((u) => (
                  <SwiperSlide key={u.title}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      className="bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700
                                 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-xl
                                 rounded-2xl p-8 h-full transition-all duration-300 group cursor-default"
                    >
                      <div className="w-10 h-10 bg-blue-600/10 dark:bg-blue-500/20 rounded-xl flex items-center justify-center mb-5">
                        <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="font-bold font-jakarta text-primary dark:text-white text-lg mb-3
                                     group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {u.title}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{u.desc}</p>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Reveal>
          </div>
        </section>

        {/* ══ PRICING ══════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-primary dark:bg-gray-950 relative overflow-hidden px-4">
          <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/4 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[140px] opacity-25 pointer-events-none" />
          <div className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/4 w-[400px] h-[400px] bg-indigo-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10">
            <Reveal className="text-center mb-14">
              <span className="text-blue-300 font-bold tracking-wider uppercase text-sm">
                Transparent Pricing
              </span>
              <h2 className="text-4xl font-bold font-jakarta text-white mt-2">
                Simple. No surprises.
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <Reveal direction="left">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-10 text-center">
                  <p className="text-blue-300 text-xs uppercase tracking-widest mb-3">Full Day Rate</p>
                  <p className="text-6xl font-bold font-jakarta text-white mb-1">₦80,000</p>
                  <p className="text-blue-300 text-sm mb-8">Negotiable for multi-day bookings</p>
                  <a
                    href="#booking-form"
                    className="block bg-blue-600 hover:bg-blue-500 text-white font-semibold
                               px-6 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg"
                  >
                    Reserve Your Date
                  </a>
                </div>
              </Reveal>

              <Reveal direction="right" delay={0.1}>
                <ul className="space-y-4">
                  {[
                    "Full day access (negotiate your hours)",
                    "Constant power supply throughout",
                    "Air-conditioned comfort",
                    "Projector & screen setup",
                    "PA system for presentations",
                    "Clean conveniences on-site",
                    "Up to 22 persons capacity",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-blue-100 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-blue-400/60 text-xs mt-6">
                  * Internet not included. Bring a personal hotspot for online sessions.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ BOOKING FORM ═════════════════════════════════════════════════════ */}
        <section id="booking-form" className="py-24 bg-slate-50 dark:bg-gray-900 px-4">
          <div className="max-w-2xl mx-auto">
            <Reveal className="text-center mb-12">
              <span className="text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase text-sm">
                Reserve Your Date
              </span>
              <h2 className="text-4xl font-bold font-jakarta text-primary dark:text-white mt-2">
                Book the Space
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-3">
                Fill in your details and we'll confirm availability via WhatsApp within 24 hours.
              </p>
            </Reveal>

            {submitted ? (
              <Reveal direction="none">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-3xl p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 14 }}
                    className="text-6xl mb-5"
                  >
                    ✅
                  </motion.div>
                  <h3 className="text-2xl font-bold font-jakarta text-green-800 dark:text-green-300 mb-3">
                    Booking Request Sent!
                  </h3>
                  <p className="text-green-700 dark:text-green-400 text-sm max-w-sm mx-auto leading-relaxed">
                    Your request has been forwarded to our WhatsApp and emailed to our team.
                    We'll confirm your booking within 24 hours.
                  </p>
                  {/* Soft warning if PHP mailer failed WhatsApp still went through */}
                  {mailError && (
                    <p className="mt-4 text-xs text-amber-600 dark:text-amber-400">
                      Note: the email notification may not have delivered, but your WhatsApp message was sent successfully.
                    </p>
                  )}
                  <button
                    onClick={() => { setSubmitted(false); setForm(EMPTY); setMailError(false); }}
                    className="mt-8 text-sm text-blue-600 dark:text-blue-400 underline hover:text-blue-800"
                  >
                    Submit another request
                  </button>
                </div>
              </Reveal>
            ) : (
              <Reveal direction="up">
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-white dark:bg-gray-800 rounded-3xl border border-slate-100 dark:border-gray-700 shadow-sm p-8 md:p-10 space-y-8"
                >
                  {/* Your Details */}
                  <fieldset>
                    <legend className="text-xs font-bold text-primary dark:text-blue-400 uppercase tracking-widest mb-5 pb-2 border-b border-slate-100 dark:border-gray-700 w-full block">
                      Your Details
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input type="text" name="fullName" value={form.fullName}
                          onChange={handleChange} placeholder="e.g. Amina Bello"
                          className={inputCls("fullName")} />
                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input type="tel" name="phone" value={form.phone}
                          onChange={handleChange} placeholder="+234 800 000 0000"
                          className={inputCls("phone")} />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input type="email" name="email" value={form.email}
                          onChange={handleChange} placeholder="you@example.com"
                          className={inputCls("email")} />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                          Organisation / Company
                        </label>
                        <input type="text" name="organization" value={form.organization}
                          onChange={handleChange} placeholder="Optional"
                          className={inputCls("organization")} />
                      </div>
                    </div>
                  </fieldset>

                  {/* Event Details */}
                  <fieldset>
                    <legend className="text-xs font-bold text-primary dark:text-blue-400 uppercase tracking-widest mb-5 pb-2 border-b border-slate-100 dark:border-gray-700 w-full block">
                      Event Details
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                          Event Type <span className="text-red-500">*</span>
                        </label>
                        <select name="eventType" value={form.eventType} onChange={handleChange}
                          className={inputCls("eventType")}>
                          <option value="">Select event type</option>
                          <option>Co-Working</option>
                          <option>Training / Workshop</option>
                          <option>Executive Meeting</option>
                          <option>Presentation / Pitch</option>
                          <option>Team Offsite</option>
                          <option>Seminar / Conference</option>
                          <option>Other</option>
                        </select>
                        {errors.eventType && <p className="text-red-500 text-xs mt-1">{errors.eventType}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                          No. of Attendees <span className="text-red-500">*</span>
                        </label>
                        <select name="attendees" value={form.attendees} onChange={handleChange}
                          className={inputCls("attendees")}>
                          <option value="">Select range</option>
                          <option>1 – 5</option>
                          <option>6 – 10</option>
                          <option>11 – 15</option>
                          <option>16 – 22</option>
                        </select>
                        {errors.attendees && <p className="text-red-500 text-xs mt-1">{errors.attendees}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                          Preferred Date <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          <input type="date" name="eventDate" value={form.eventDate}
                            onChange={handleChange}
                            min={new Date().toISOString().split("T")[0]}
                            className={`${inputCls("eventDate")} pl-10`} />
                        </div>
                        {errors.eventDate && <p className="text-red-500 text-xs mt-1">{errors.eventDate}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                            Start Time
                          </label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            <input type="time" name="startTime" value={form.startTime}
                              onChange={handleChange}
                              className={`${inputCls("startTime")} pl-10`} />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                            End Time
                          </label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            <input type="time" name="endTime" value={form.endTime}
                              onChange={handleChange}
                              className={`${inputCls("endTime")} pl-10`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </fieldset>

                  {/* Additional */}
                  <fieldset>
                    <legend className="text-xs font-bold text-primary dark:text-blue-400 uppercase tracking-widest mb-5 pb-2 border-b border-slate-100 dark:border-gray-700 w-full block">
                      Additional Information
                    </legend>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                          Special Requirements
                        </label>
                        <textarea name="requirements" value={form.requirements}
                          onChange={handleChange} rows={3}
                          placeholder="Any special setup, arrangements, or requests..."
                          className={`${inputCls("requirements")} resize-none`} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                          How did you hear about us?
                        </label>
                        <select name="heardFrom" value={form.heardFrom} onChange={handleChange}
                          className={inputCls("heardFrom")}>
                          <option value="">Select an option</option>
                          <option>Google Search</option>
                          <option>Social Media</option>
                          <option>Word of Mouth</option>
                          <option>Returning Client</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                  </fieldset>

                  {/* Note */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl px-5 py-4 text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                    <strong>Note:</strong> Submitting this form will open WhatsApp with your booking
                    details pre-filled and send a copy to our team at{" "}
                    <span className="font-medium">info@discoverytechhub.com</span>. We'll confirm
                    availability and pricing within 24 hours.
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.01 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="w-full bg-primary dark:bg-blue-700 hover:bg-blue-900 dark:hover:bg-blue-600
                               disabled:opacity-60 text-white font-bold py-4 rounded-2xl
                               transition-colors duration-200 text-base flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending your request...
                      </>
                    ) : (
                      <>
                        Submit Booking Request
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </form>
              </Reveal>
            )}
          </div>
        </section>

        {/* ══ BOTTOM CTA ════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 text-center px-4">
          <Reveal>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">Still have questions?</p>
            <h3 className="text-3xl font-bold font-jakarta text-primary dark:text-white mb-6">
              Let's talk before you book.
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/2349047465802?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20the%20DiscoveryTech%20Hub%20space."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary dark:bg-blue-700 text-white
                           rounded-full font-bold hover:bg-blue-900 transition-all shadow-lg hover:-translate-y-1"
              >
                Chat on WhatsApp <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 px-8 py-4 border border-slate-200 dark:border-gray-700
                           text-primary dark:text-white rounded-full font-medium
                           hover:bg-slate-50 dark:hover:bg-gray-800 transition-all"
              >
                Get a General Quote
              </Link>
            </div>
          </Reveal>
        </section>

      </div>
    </>
  );
}