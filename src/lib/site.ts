export const SITE = {
  url: "https://discoverytechhub.com",
  name: "DiscoveryTech Hub",
  orgId: "https://discoverytechhub.com/#organization",
  address: {
    street: "Plot 740 Aminu Kano Crescent, Wuse 2, FCT Abuja",
    city: "Abuja",
    region: "FCT",
    country: "NG",
  },
};

export type FaqItem = { q: string; a: string };

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: SITE.address.street,
  addressLocality: SITE.address.city,
  addressRegion: SITE.address.region,
  addressCountry: SITE.address.country,
};

export const serviceItems = [
  {
    name: "Web Design & Development",
    description:
      "We design and develop responsive, high-performance websites and web applications tailored to your business needs. From corporate websites to e-commerce platforms and custom portals, our solutions are mobile-first, SEO-optimized, and built with modern technologies.",
  },
  {
    name: "ICT Training",
    description:
      "We offer hands-on ICT training programs for individuals, students, and organizations. Our courses cover programming, Microsoft Office, graphic design, web technologies, and cybersecurity basics.",
  },
  {
    name: "Graphic Design",
    description:
      "We create visually compelling designs that communicate your brand message effectively. From social media graphics to marketing materials, we deliver creative solutions that captivate and convert.",
  },
  {
    name: "Branding & Identity",
    description:
      "We help businesses build strong, memorable brand identities that resonate with their audience. Our branding solutions ensure consistency, professionalism, and impact.",
  },
  {
    name: "Printing Services",
    description:
      "We deliver high-quality printing solutions with fast turnaround times. From business cards to large-format prints, we ensure sharp and vibrant results.",
  },
  {
    name: "Proposal & Report Writing",
    description:
      "We provide professional writing services for business and technical documents. Our goal is to help you communicate effectively and increase your success rate.",
  },
  {
    name: "ICT Consultancy",
    description:
      "We provide strategic guidance to help organizations optimize their technology investments and processes. We bridge the gap between business processes and technical solutions.",
  },
];

export function servicesSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": serviceItems.map((s) => ({
      "@type": "Service",
      name: s.name,
      description: s.description,
      serviceType: s.name,
      url: `${SITE.url}/services`,
      provider: { "@id": SITE.orgId },
      areaServed: { "@type": "Country", name: "Nigeria" },
    })),
  };
}

const feature = (name: string, value = true) => ({
  "@type": "LocationFeatureSpecification",
  name,
  value,
});

export function hubSchema() {
  const venueId = `${SITE.url}/hub#venue`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EventVenue",
        "@id": venueId,
        name: "DiscoveryTech Hub Space",
        description:
          "A professional multipurpose space in Abuja for co-working, training, executive meetings, presentations, team offsites and seminars. Seats up to 22 people.",
        url: `${SITE.url}/hub`,
        image: [`${SITE.url}/hub1.jpg`, `${SITE.url}/hub2.jpg`, `${SITE.url}/hub3.jpg`],
        address: postalAddress,
        maximumAttendeeCapacity: 22,
        amenityFeature: [
          feature("Constant power supply"),
          feature("Air conditioning"),
          feature("Projector and screen"),
          feature("PA system"),
          feature("Restroom facilities"),
          feature("Internet access", false),
        ],
      },
      {
        "@type": "Service",
        name: "Hub space rental",
        serviceType: "Meeting, training and event space rental",
        provider: { "@id": SITE.orgId },
        areaServed: { "@type": "City", name: "Abuja" },
        offers: {
          "@type": "Offer",
          price: "80000",
          priceCurrency: "NGN",
          description: "Full day rate. Negotiable for multi-day bookings.",
          availableAtOrFrom: { "@id": venueId },
          url: `${SITE.url}/hub`,
        },
      },
    ],
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export const homeFaq: FaqItem[] = [
  {
    q: "What does DiscoveryTech Hub do?",
    a: "DiscoveryTech Hub is an ICT solutions company in Abuja, Nigeria, and a vertical of DiscoveryHub. We offer web design and development, ICT training, graphic design, branding and identity, printing, proposal and report writing, and ICT consultancy for businesses, organizations, and individuals across Nigeria and beyond.",
  },
  {
    q: "Where is DiscoveryTech Hub located?",
    a: `We are based at ${SITE.address.street}, Abuja, Nigeria, and we also work with clients remotely.`,
  },
  {
    q: "What are your working hours?",
    a: "We are open Monday to Friday from 8:00 AM to 6:00 PM and on Saturdays from 9:00 AM to 3:00 PM.",
  },
  {
    q: "How do I get a quote?",
    a: "Send your request through the Get a Quote page on this website, or email info@discoverytechhub.com. You can also call +234 904 746 5802 or +234 807 685 4730.",
  },
  {
    q: "Do you offer ICT training for companies and individuals?",
    a: "Yes. Our hands-on ICT training is open to individuals, students, and organizations, with levels from beginner to advanced and corporate training available. Courses cover programming, Microsoft Office, graphic design, web technologies, and cybersecurity basics.",
  },
  {
    q: "How does a project with DiscoveryTech Hub work?",
    a: "Every project follows six steps: Discover, Strategize, Design & Develop, Review & Refine, Deliver & Deploy, and Support & Grow.",
  },
  {
    q: "Can I rent a meeting or training space from you?",
    a: "Yes. The DiscoveryTech Hub space in Abuja seats up to 22 people and costs ₦80,000 for a full day, negotiable for multi-day bookings. See the Hub page for amenities and booking.",
  },
];

export const hubFaq: FaqItem[] = [
  {
    q: "How much does it cost to book the DiscoveryTech Hub space?",
    a: "The full-day rate is ₦80,000, and it is negotiable for multi-day bookings.",
  },
  {
    q: "How many people does the space seat?",
    a: "The space seats up to 22 people.",
  },
  {
    q: "What is included in the booking?",
    a: "Every booking includes constant power supply, air conditioning, a projector and screen, a PA system, and restroom facilities.",
  },
  {
    q: "Is internet included?",
    a: "No. Internet is not included, so please bring a personal hotspot for online sessions.",
  },
  {
    q: "What kinds of events suit the space?",
    a: "Co-working, training and workshops, executive meetings, presentations and pitches, team offsites, and seminars or small conferences of up to 22 people.",
  },
  {
    q: "How do I book, and how quickly will I get a reply?",
    a: "Fill in the booking form on this page. It opens WhatsApp with your details pre-filled and sends a copy to info@discoverytechhub.com. We confirm availability and pricing within 24 hours.",
  },
  {
    q: "Where is the space?",
    a: `The space is at ${SITE.address.street}, Abuja, Nigeria.`,
  },
];
