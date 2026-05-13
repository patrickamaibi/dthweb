import AnimatedSection from "@/components/AnimatedSection";
import ServicesList from "@/components/ServicesList";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Services() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      <Helmet>
        <title>Our Services | DiscoveryTech Hub</title>
        <meta name="description" content="Explore DiscoveryTech Hub's services — web design, graphic design, ICT training, branding, printing & consultancy for businesses in Nigeria and beyond." />
        <link rel="canonical" href="https://discoverytechhub.com/services" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://discoverytechhub.com/services" />
        <meta property="og:title" content="Our Services | DiscoveryTech Hub" />
        <meta property="og:description" content="Explore DiscoveryTech Hub's services — web design, graphic design, ICT training, branding, printing & consultancy for businesses in Nigeria and beyond." />
        <meta property="og:image" content="https://discoverytechhub.com/og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="DiscoveryTech Hub Services - Web Design, ICT Training & More" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://discoverytechhub.com/services" />
        <meta name="twitter:title" content="Our Services | DiscoveryTech Hub" />
        <meta name="twitter:description" content="Explore DiscoveryTech Hub's services — web design, graphic design, ICT training, branding, printing & consultancy for businesses in Nigeria and beyond." />
        <meta name="twitter:image" content="https://discoverytechhub.com/og.png" />
        <meta name="twitter:image:alt" content="DiscoveryTech Hub Services - Web Design, ICT Training & More" />
      </Helmet>

      {/* Page Header */}
      <section className="bg-primary dark:bg-gray-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero1.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-bold font-jakarta mb-6">Our Services</h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
              We empower businesses with cutting-edge technology solutions tailored for growth. Learn more about how we can help you succeed.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white dark:bg-gray-950 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 dark:via-blue-900 to-transparent"></div>
        <div className="container mx-auto px-6">
          <ServicesList />
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-20 bg-primary dark:bg-gray-900 text-center">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold font-jakarta text-white mb-6">Didn't find what you're looking for?</h2>
            <p className="text-blue-200 dark:text-blue-300 text-lg max-w-2xl mx-auto mb-8">
              We offer custom solutions tailored to your unique business requirements. Let's discuss your next project.
            </p>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 px-10 py-4 bg-white dark:bg-blue-700 text-primary dark:text-white rounded-full font-bold text-lg hover:bg-slate-100 dark:hover:bg-blue-600 transition-all shadow-xl hover:-translate-y-1"
            >
              Contact Us Now
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}