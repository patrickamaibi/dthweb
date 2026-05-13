import AnimatedSection from "@/components/AnimatedSection";
import { ChevronRight, Target, Eye, Lightbulb, CheckCircle2, HeartHandshake, BookOpen, Search, Code, LayoutDashboard, Rocket, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function About() {
  const values = [
    { title: "Innovation", desc: "Pushing boundaries with creative solutions", icon: <Lightbulb className="w-8 h-8" /> },
    { title: "Excellence", desc: "Delivering top-quality results", icon: <CheckCircle2 className="w-8 h-8" /> },
    { title: "Integrity", desc: "Operating with honesty and transparency", icon: <CheckCircle2 className="w-8 h-8" /> },
    { title: "Client-Centricity", desc: "Putting clients first", icon: <HeartHandshake className="w-8 h-8" /> },
    { title: "Collaboration", desc: "Building strong partnerships", icon: <HeartHandshake className="w-8 h-8" /> },
    { title: "Continuous Learning", desc: "Staying ahead in a fast-changing world", icon: <BookOpen className="w-8 h-8" /> },
  ];

  const processSteps = [
    { title: "Discover", subtitle: "We understand your business, audience, and goals", icon: <Search /> },
    { title: "Strategize", subtitle: "We develop a tailored execution plan", icon: <LayoutDashboard /> },
    { title: "Design & Develop", subtitle: "We create and build your solution", icon: <Code /> },
    { title: "Review & Refine", subtitle: "We improve based on feedback", icon: <CheckCircle2 /> },
    { title: "Deliver & Deploy", subtitle: "We launch your solution", icon: <Rocket /> },
    { title: "Support & Grow", subtitle: "We provide ongoing support and improvements", icon: <Wrench /> },
  ];

  return (
    <div className="flex flex-col min-h-screen pt-20">
      <Helmet>
        <title>About Us | DiscoveryTech Hub</title>
        <meta name="description" content="Learn about DiscoveryTech Hub — a premier ICT solutions company in Nigeria and beyond, driving digital transformation through web design, ICT training, branding & consultancy." />
        <link rel="canonical" href="https://discoverytechhub.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://discoverytechhub.com/about" />
        <meta property="og:title" content="About Us | DiscoveryTech Hub" />
        <meta property="og:description" content="Learn about DiscoveryTech Hub — a premier ICT solutions company in Nigeria and beyond, driving digital transformation through web design, ICT training, branding & consultancy." />
        <meta property="og:image" content="https://discoverytechhub.com/og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="About DiscoveryTech Hub - ICT Solutions in Nigeria" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://discoverytechhub.com/about" />
        <meta name="twitter:title" content="About Us | DiscoveryTech Hub" />
        <meta name="twitter:description" content="Learn about DiscoveryTech Hub — a premier ICT solutions company in Nigeria and beyond, driving digital transformation through web design, ICT training, branding & consultancy." />
        <meta name="twitter:image" content="https://discoverytechhub.com/og.png" />
        <meta name="twitter:image:alt" content="About DiscoveryTech Hub - ICT Solutions in Nigeria" />
      </Helmet>

      {/* Page Header */}
      <section className="bg-primary dark:bg-gray-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-bold font-jakarta mb-6">About Us</h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              We combine creativity, technical expertise, and strategic thinking to deliver measurable impact.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Who We Are & Why We Matter */}
      <section className="py-24 pt-32 relative bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          {/* Who We Are */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center mb-32">
            <AnimatedSection className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-2xl group border border-slate-200 dark:border-gray-700">
                <img src="/about-1.jpg" alt="Who We Are" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
            </AnimatedSection>

            <AnimatedSection className="w-full lg:w-1/2 order-1 lg:order-2">
              <h2 className="text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase text-sm mb-2">Who We Are</h2>
              <h3 className="text-3xl lg:text-4xl font-bold font-jakarta text-primary dark:text-white mb-6 leading-tight">
                Driving digital transformation for the modern age
              </h3>
              <div className="space-y-4 text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                <p>DiscoveryTech Hub is a premier ICT solutions company operating at the intersection of technology, creativity, and education, dedicated to driving digital transformation for businesses, organizations, and individuals.</p>
                <p>Our team of passionate professionals brings deep expertise across multiple digital disciplines, including software development, IT consulting, digital marketing, and tech education.</p>
              </div>
            </AnimatedSection>
          </div>

          {/* Why We Matter */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <AnimatedSection delay={0.2} className="w-full lg:w-1/2">
              <h2 className="text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase text-sm mb-2">Why We Matter</h2>
              <h3 className="text-3xl lg:text-4xl font-bold font-jakarta text-primary dark:text-white mb-6">
                Bridging the gap between technology and reality
              </h3>
              <div className="space-y-4 text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                <p>In today's fast-evolving digital landscape, having the right technology partner is essential to achieving sustainable growth and competitive advantage.</p>
                <p>At DiscoveryTech Hub, we go beyond service delivery to design and implement tailored solutions that drive innovation, enhance operational efficiency, and position our clients for long-term success.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4} className="w-full lg:w-1/2">
              <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-2xl group border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800">
                <img src="/about-2.jpg" alt="Why We Matter" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500"></div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full blur-[50px] opacity-70 pointer-events-none"></div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-primary dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatedSection className="bg-white dark:bg-gray-800 p-12 lg:p-16 rounded-3xl text-center shadow-xl border border-slate-100 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300">
              <div className="w-24 h-24 mx-auto bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center rounded-2xl mb-8 transform rotate-3 hover:rotate-0 transition-transform">
                <Target className="w-12 h-12 text-blue-600 dark:text-blue-400 -rotate-3 hover:rotate-0 transition-transform" />
              </div>
              <h3 className="text-3xl font-bold font-jakarta text-primary dark:text-white mb-6">Our Mission</h3>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                To deliver innovative, affordable, and high-quality digital solutions that empower our clients to grow, compete, and succeed.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-lg mt-4 leading-relaxed">
                We are committed to excellence in every project, combining creativity, technical expertise, and strategic thinking to achieve outstanding results.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="bg-white dark:bg-gray-800 p-12 lg:p-16 rounded-3xl text-center shadow-xl border border-slate-100 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300">
              <div className="w-24 h-24 mx-auto bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center rounded-2xl mb-8 transform -rotate-3 hover:rotate-0 transition-transform">
                <Eye className="w-12 h-12 text-indigo-600 dark:text-indigo-400 rotate-3 hover:rotate-0 transition-transform" />
              </div>
              <h3 className="text-3xl font-bold font-jakarta text-primary dark:text-white mb-6">Our Vision</h3>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                To be the leading ICT solutions provider in Africa, recognized for transforming how businesses, governments, and individuals leverage technology to create value, solve problems, and build a sustainable digital future.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* How We Work Timeline */}
      <section className="py-32 bg-slate-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 max-w-5xl">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase text-sm mb-2">How We Work</h2>
            <h3 className="text-4xl font-bold font-jakarta text-primary dark:text-white">A structured, client-centered process</h3>
          </AnimatedSection>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-blue-100 dark:bg-gray-700 transform -translate-x-1/2"></div>

            {processSteps.map((step, index) => (
              <AnimatedSection
                key={index}
                delay={index * 0.1}
                className={`relative flex items-center mb-12 md:mb-24 ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
              >
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                  <div className="glassmorphism p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-gray-700 bg-white dark:bg-gray-800 group hover:-translate-y-2 transition-transform">
                    <div className={`w-12 h-12 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-4 ${index % 2 === 0 ? "md:ml-auto" : ""}`}>
                      {step.icon}
                    </div>
                    <h4 className="text-xl font-bold font-jakarta text-primary dark:text-white mb-2">
                      <span className="text-blue-600 dark:text-blue-400 md:hidden mr-2">{index + 1}.</span>
                      {step.title}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300">{step.subtitle}</p>
                  </div>
                </div>
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-primary dark:bg-blue-700 text-white rounded-full items-center justify-center font-bold text-xl font-jakarta border-4 border-slate-50 dark:border-gray-900 shadow-md">
                  {index + 1}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase text-sm mb-2">Core Values</h2>
            <h3 className="text-4xl font-bold font-jakarta text-primary dark:text-white">What principles drive us</h3>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <AnimatedSection
                key={i}
                delay={i * 0.1}
                className="p-8 border border-slate-100 dark:border-gray-700 shadow-sm dark:bg-gray-800 rounded-3xl hover:shadow-xl transition-all group flex flex-col items-center text-center"
              >
                <div className="text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                  {v.icon}
                </div>
                <h4 className="text-xl font-bold font-jakarta text-primary dark:text-white mb-3">{v.title}</h4>
                <p className="text-slate-600 dark:text-slate-300">{v.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-20 bg-blue-50 dark:bg-gray-900 border-t border-blue-100 dark:border-gray-700 text-center">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-3xl font-bold font-jakarta text-primary dark:text-white mb-6">Ready to transform your business?</h2>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary dark:bg-blue-700 text-white rounded-full font-bold hover:bg-blue-900 dark:hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl"
            >
              Let's Talk <ChevronRight className="w-5 h-5" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}