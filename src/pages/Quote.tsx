import AnimatedSection from "@/components/AnimatedSection";
import ContactForm from "@/components/ContactForm";
import { Mail, MapPin, Globe, Clock, Phone } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function Quote() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      <Helmet>
        <title>Get a Quote | DiscoveryTech Hub</title>
        <meta name="description" content="Request a free quote from DiscoveryTech Hub. We offer web design, ICT training, graphic design, branding & consultancy services in Nigeria and beyond." />
        <link rel="canonical" href="https://discoverytechhub.com/quote" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://discoverytechhub.com/quote" />
        <meta property="og:title" content="Get a Quote | DiscoveryTech Hub" />
        <meta property="og:description" content="Request a free quote from DiscoveryTech Hub. We offer web design, ICT training, graphic design, branding & consultancy services in Nigeria and beyond." />
        <meta property="og:image" content="https://discoverytechhub.com/og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Get a Free Quote - DiscoveryTech Hub" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://discoverytechhub.com/quote" />
        <meta name="twitter:title" content="Get a Quote | DiscoveryTech Hub" />
        <meta name="twitter:description" content="Request a free quote from DiscoveryTech Hub. We offer web design, ICT training, graphic design, branding & consultancy services in Nigeria and beyond." />
        <meta name="twitter:image" content="https://discoverytechhub.com/og.png" />
        <meta name="twitter:image:alt" content="Get a Free Quote - DiscoveryTech Hub" />
      </Helmet>

      {/* Page Header */}
      <section className="bg-primary dark:bg-gray-900 text-white py-24 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero1.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-bold font-jakarta mb-6">Get a Quote</h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
              Have a project in mind or need a service? Let's help you bring your ideas to life.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-slate-50 dark:bg-gray-950 relative -mt-16 z-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-gray-700">

            {/* Contact Info Sidebar */}
            <div className="bg-blue-900 dark:bg-gray-900 text-white p-12 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-800 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/3 opacity-30"></div>

              <h3 className="text-2xl font-bold font-jakarta mb-2 relative z-10">Contact Information</h3>
              <p className="text-blue-200 dark:text-blue-300 mb-12 relative z-10">Fill out the form and our team will get back to you promptly.</p>

              <div className="space-y-8 flex-grow relative z-10">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-blue-300 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1">Email</h4>
                    <p className="text-blue-100">info@discoverytechhub.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-blue-300 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1">Phone</h4>
                    <p className="text-blue-100">+234 904 746 5802</p>
                    <p className="text-blue-100">+234 807 685 4730</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Globe className="w-6 h-6 text-blue-300 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1">Website</h4>
                    <p className="text-blue-100">www.discoverytechhub.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-blue-300 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1">Location</h4>
                    <p className="text-blue-100">Abuja, Nigeria</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-blue-300 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1">Working Hours</h4>
                    <p className="text-blue-100">Mon – Fri: 8:00 AM – 6:00 PM</p>
                    <p className="text-blue-100">Saturday: 9:00 AM – 3:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="p-12 lg:col-span-2">
              <h3 className="text-2xl font-bold font-jakarta text-primary dark:text-white mb-8">Send us a message</h3>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}