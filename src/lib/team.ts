export type Person = {
  name: string;
  role: string;
  photo?: string; // file goes in public/team/, e.g. "/team/jane-doe.jpg"
  bio?: string; // one or two sentences
  linkedin?: string; // full profile URL
};

// PLACEHOLDERS: edit the role, bio and LinkedIn for each person before deploying.
// The "Meet the team" section stays hidden while both lists are empty.
export const founders: Person[] = [
  {
  name: "Patrick Amaibi",
  role: "Co-founder",
  photo: "/team/dthpatrick.jpg",
  bio: "Patrick Amaibi is a technology builder working at the intersection of AI, blockchain, and digital infrastructure. At DiscoveryTech Hub, he designs and delivers websites, digital platforms, and emerging-tech solutions that help organizations operate smarter and reach more people. He brings a hands-on, results-focused approach to every project and is committed to empowering the next generation of African innovators through technology education.",
  linkedin: "https://ng.linkedin.com/in/patrickamaibi",
},
  {
    name: "Gift Afambu",
    role: "Co-founder & Creative Director",
    photo: "/team/dthgift.jpeg",
    bio: "Gift Afambu is a brand strategist and designer who helps businesses turn ideas into identities people remember. As co-founder of DiscoveryTech Hub, she shapes brand identity design, digital marketing strategy, and content production, building logos, visual frameworks, and market positioning that connect technology with the people it serves. She believes strong branding and smart execution belong together, and she helps clients define who they are and drive the actions that grow their business.",
    linkedin: "https://ng.linkedin.com/in/giftafambu",
  },
  {
  name: "Innocent Josiah Patrick",
  role: "Lead Software Developer",
  photo: "/team/dthjosiah.png",
  bio: "Innocent Josiah Patrick is a Software Developer, Data Scientist, and researcher with a multidisciplinary background spanning technology and the social sciences. He holds a First-Class Bachelor’s degree in Sociology from the University of Port Harcourt and has over four years of experience in software development.",
  linkedin: "https://ng.linkedin.com/in/inocentjosiah57",
},
];

export const team: Person[] = [
  // {
  //   name: "Full Name",
  //   role: "Role",
  //   photo: "/team/full-name.jpg",
  // },
];

const SITE = "https://discoverytechhub.com";

export function peopleSchema() {
  const people = [...founders, ...team];
  if (people.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@graph": people.map((p) => ({
      "@type": "Person",
      name: p.name,
      jobTitle: p.role,
      ...(p.photo ? { image: SITE + p.photo } : {}),
      ...(p.linkedin ? { sameAs: [p.linkedin] } : {}),
      worksFor: { "@type": "Organization", name: "DiscoveryTech Hub", url: SITE },
    })),
  };
}
