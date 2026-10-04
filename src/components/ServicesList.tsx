import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { Monitor, Code2, Bot, Network, Megaphone, Smartphone, ShoppingCart, GraduationCap, Laptop, X, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const services = [
  {
    id: 1,
    title: "Web Design, Development & Hosting",
    cta: "Get a Website Quote",
    shortDesc: "Fast, mobile-friendly websites that look professional, rank on Google, and stay online.",
    fullDesc: "Your website is often the first thing a customer sees. We design and build fast, mobile-friendly websites that look professional, load quickly, and are easy to find on Google. We also host and maintain them, so you never have to worry about downtime, security updates, or technical headaches.",
    icon: <Monitor className="w-8 h-8" />,
    features: ["Custom business websites, not generic templates", "Mobile responsive design and search engine optimisation", "Reliable hosting, domain setup, and business email", "Ongoing maintenance and support plans"],
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Software Development & IT Consultancy",
    cta: "Talk to Our Team",
    shortDesc: "Custom software and practical IT advice that saves time, reduces errors, and grows with you.",
    fullDesc: "Off-the-shelf tools do not always fit the way you work. We build custom software and give practical IT advice that helps your business save time, reduce errors, and grow with confidence.",
    icon: <Code2 className="w-8 h-8" />,
    features: ["Custom business and management software", "Technology planning and IT strategy", "System reviews and process improvement", "Technical advice before you invest"],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 8,
    title: "AI Solutions & Automation",
    cta: "Explore AI for My Business",
    shortDesc: "Practical AI tools, chatbots, and automation that save time and help your team do more.",
    fullDesc: "AI should make your work easier, not more complicated. We help businesses and organisations use AI in practical ways, from customer chatbots and content tools to automated reports and smarter workflows, and we train your team to use them well.",
    icon: <Bot className="w-8 h-8" />,
    features: ["AI chatbots for websites, WhatsApp, and customer support", "Workflow and document automation with AI", "AI tools for content, reporting, and data analysis", "Staff training on using AI tools safely and effectively"],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "ICT Solutions & Systems Integration",
    cta: "Request a Consultation",
    shortDesc: "Connected systems, automated workflows, and reliable ICT infrastructure for your organisation.",
    fullDesc: "Many organisations run on tools that do not talk to each other. We connect your systems, automate repetitive tasks, and set up the right ICT infrastructure so your people spend less time on admin and more time on real work.",
    icon: <Network className="w-8 h-8" />,
    features: ["Business systems and workflow automation", "Integration of payments, CRM, invoicing, and communication tools", "ICT setup for offices, schools, and organisations", "Secure and reliable network and systems support"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "Digital Marketing & Social Media Management",
    cta: "Grow My Business",
    shortDesc: "Social media, content, and campaigns that bring in enquiries and keep your brand active.",
    fullDesc: "Being online is not enough. You need to be seen by the right people. We manage your social media, create content, and run campaigns that bring in enquiries and keep your brand active and consistent.",
    icon: <Megaphone className="w-8 h-8" />,
    features: ["Social media management and content creation", "Paid advertising campaigns", "Brand awareness and audience growth", "Monthly reporting that is clear and simple"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    title: "Mobile Application Development",
    cta: "Start Your App Project",
    shortDesc: "Easy-to-use Android and iOS apps built around what your users actually need.",
    fullDesc: "Most of your customers are on their phones. We design and build mobile apps that are easy to use, reliable, and built around what your users actually need.",
    icon: <Smartphone className="w-8 h-8" />,
    features: ["Android and iOS app development", "App design focused on ease of use", "Testing, launch, and updates", "Support for startups building a first version"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    title: "E-Commerce Development & Management",
    cta: "Launch My Online Store",
    shortDesc: "Online stores that accept local and international payments and are managed for you.",
    fullDesc: "Selling online should be simple. We build online stores that accept local and international payments, handle orders smoothly, and are managed for you so you can focus on your products and customers.",
    icon: <ShoppingCart className="w-8 h-8" />,
    features: ["Online store setup and customisation", "Payment gateway and delivery integration", "Product uploads and store management", "Performance and sales improvements over time"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 7,
    title: "IT Training & Technical Support",
    cta: "Book Training or Support",
    shortDesc: "Practical digital skills training and responsive technical support when something goes wrong.",
    fullDesc: "Technology only helps when people know how to use it. We train teams, students, and individuals in practical digital skills, and we provide responsive technical support when something goes wrong.",
    icon: <GraduationCap className="w-8 h-8" />,
    features: ["Corporate and group IT training", "Digital skills training for schools and communities", "Technical support and troubleshooting", "Support plans for ongoing needs"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 9,
    title: "Gadgets Supply & Maintenance",
    cta: "Request a Gadget Quote",
    shortDesc: "Reliable laptops, phones, and accessories, plus repairs and regular maintenance to keep them running.",
    fullDesc: "The right device makes work easier, and a well-kept one lasts longer. We help you choose and buy reliable laptops, phones, and accessories, and we repair and maintain them so they keep working when you need them.",
    icon: <Laptop className="w-8 h-8" />,
    features: ["Advice on the right devices for your budget and needs", "Supply of laptops, phones, printers, and accessories", "Repairs, servicing, and software updates", "Maintenance plans for offices, schools, and organisations"],
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=800"
  }
];

export default function ServicesList() {
  const [activeService, setActiveService] = useState<typeof services[0] | null>(null);

  const close = () => setActiveService(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, i) => (
          <AnimatedSection key={service.id} delay={i * 0.1}>
            <div className="glassmorphism p-8 rounded-3xl group shadow-sm hover:shadow-xl transition-all h-full flex flex-col border border-slate-100 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold font-jakarta text-primary dark:text-white mb-4">{service.title}</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-8 flex-grow">{service.shortDesc}</p>
              <button
                onClick={() => setActiveService(service)}
                className="mt-auto self-start flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors py-2 group-hover:gap-3"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Hidden Asset Preloader */}
      <div className="hidden" aria-hidden="true">
        {services.map(service => (
          <img key={`preload-${service.id}`} src={service.image} alt="" decoding="async" />
        ))}
      </div>

      <AnimatePresence>
        {activeService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={close} />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                onClick={close}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-800 dark:text-white hover:bg-white dark:hover:bg-gray-700 shadow-xl hover:scale-110 transition-all border border-slate-200 dark:border-gray-600"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full md:w-2/5 h-64 md:h-auto relative bg-slate-100 dark:bg-gray-700 flex-shrink-0">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${activeService.image})` }}
                />
              </div>

              <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto">
                <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 mb-4">
                  {activeService.icon}
                  <span className="font-bold tracking-wider uppercase text-sm">Service Detail</span>
                </div>
                <h2 className="text-3xl font-bold font-jakarta text-primary dark:text-white mb-6">{activeService.title}</h2>
                <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 leading-relaxed">
                  {activeService.fullDesc}
                </p>

                <h3 className="text-xl font-bold text-primary dark:text-white mb-4 border-b border-slate-100 dark:border-gray-700 pb-2">What You Get</h3>
                <ul className="space-y-4 mb-10">
                  {activeService.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                      <Check className="w-5 h-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/quote?service=${encodeURIComponent(activeService.title)}`}
                  className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-primary dark:bg-blue-700 text-white rounded-full font-bold shadow-lg hover:bg-blue-900 dark:hover:bg-blue-600 transition-colors"
                >
                  {activeService.cta}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}