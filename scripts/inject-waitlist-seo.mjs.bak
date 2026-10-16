import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

/* Keep these in sync with src/pages/AcademyWaitlist.tsx */
const SITE_URL = "https://discoverytechhub.com";
const CANONICAL = `${SITE_URL}/academy/waitlist`;
const TITLE = "DiscoveryTech Academy | Join the Waitlist";
const DESCRIPTION =
  "Join the free DiscoveryTech Academy waitlist and get early access to practical, no-code AI skills. Built in Abuja, Nigeria by DiscoveryTech Hub.";
const OG_IMAGE = `${SITE_URL}/ogwaitlist.webp`;
const OG_IMAGE_TYPE = "image/webp";
const OG_IMAGE_ALT =
  "DiscoveryTech Academy waitlist: practical AI skills, opening soon in Nigeria";
const LOGO = `${SITE_URL}/logo.png`;

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      url: CANONICAL,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "en-NG",
      isPartOf: { "@type": "WebSite", name: "DiscoveryTech Hub", url: SITE_URL },
      primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE },
      about: "DiscoveryTech Academy, an online AI skills learning platform opening soon",
      contentLocation: { "@type": "Place", name: "Abuja, Nigeria" },
      publisher: {
        "@type": "Organization",
        name: "DiscoveryTech Hub",
        url: SITE_URL,
        logo: LOGO,
        address: { "@type": "PostalAddress", addressLocality: "Abuja", addressCountry: "NG" },
      },
    },
  ],
};

const src = join("dist", "index.html");
if (!existsSync(src)) {
  console.error("dist/index.html not found. Run the build first.");
  process.exit(1);
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

let html = readFileSync(src, "utf8");

/* 1. Remove the main page's tags so none of them leak into the waitlist page */
const strip = [
  /<title>[\s\S]*?<\/title>\s*/gi,
  /<meta\s[^>]*name=["']description["'][^>]*>\s*/gi,
  /<meta\s[^>]*name=["']robots["'][^>]*>\s*/gi,
  /<meta\s[^>]*property=["']og:[^"']*["'][^>]*>\s*/gi,
  /<meta\s[^>]*name=["']twitter:[^"']*["'][^>]*>\s*/gi,
  /<link\s[^>]*rel=["']canonical["'][^>]*>\s*/gi,
  /<link\s[^>]*rel=["']alternate["'][^>]*hreflang[^>]*>\s*/gi,
];
for (const re of strip) html = html.replace(re, "");

/* 2. Empty the prerendered home content inside <div id="root"> */
function emptyRoot(h) {
  const openRe = /<div[^>]*id=["']root["'][^>]*>/;
  const m = h.match(openRe);
  if (!m) return h;
  const innerStart = m.index + m[0].length;
  const re = /<\/?div\b[^>]*>/g;
  re.lastIndex = innerStart;
  let depth = 1;
  let t;
  while ((t = re.exec(h))) {
    depth += t[0].startsWith("</") ? -1 : 1;
    if (depth === 0) return h.slice(0, innerStart) + h.slice(t.index);
  }
  return h;
}
html = emptyRoot(html);

/* 3. Inject the waitlist tags */
const jsonLd = JSON.stringify(JSON_LD).replace(/</g, "\\u003c");
const tags = `
    <title data-rh="true">${esc(TITLE)}</title>
    <meta name="description" content="${esc(DESCRIPTION)}" data-rh="true" />
    <meta name="robots" content="index, follow, max-image-preview:large" data-rh="true" />
    <link rel="canonical" href="${CANONICAL}" data-rh="true" />
    <link rel="alternate" hreflang="en-NG" href="${CANONICAL}" data-rh="true" />
    <link rel="alternate" hreflang="x-default" href="${CANONICAL}" data-rh="true" />
    <meta property="og:type" content="website" data-rh="true" />
    <meta property="og:site_name" content="DiscoveryTech Hub" data-rh="true" />
    <meta property="og:locale" content="en_NG" data-rh="true" />
    <meta property="og:title" content="${esc(TITLE)}" data-rh="true" />
    <meta property="og:description" content="${esc(DESCRIPTION)}" data-rh="true" />
    <meta property="og:url" content="${CANONICAL}" data-rh="true" />
    <meta property="og:image" content="${OG_IMAGE}" data-rh="true" />
    <meta property="og:image:type" content="${OG_IMAGE_TYPE}" data-rh="true" />
    <meta property="og:image:alt" content="${esc(OG_IMAGE_ALT)}" data-rh="true" />
    <meta name="twitter:card" content="summary_large_image" data-rh="true" />
    <meta name="twitter:title" content="${esc(TITLE)}" data-rh="true" />
    <meta name="twitter:description" content="${esc(DESCRIPTION)}" data-rh="true" />
    <meta name="twitter:image" content="${OG_IMAGE}" data-rh="true" />
    <meta name="twitter:image:alt" content="${esc(OG_IMAGE_ALT)}" data-rh="true" />
    <script type="application/ld+json" data-rh="true">${jsonLd}</script>
`;
html = html.replace("</head>", `${tags}  </head>`);

/* 4. Plain-text fallback for crawlers that do not run JavaScript */
const noscript = `<noscript><h1>${esc(TITLE)}</h1><p>${esc(DESCRIPTION)}</p></noscript>`;
html = html.replace(/<body[^>]*>/, (b) => `${b}\n    ${noscript}`);

const outDir = join("dist", "academy", "waitlist");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "index.html"), html);
console.log("✓ Generated dist/academy/waitlist/index.html with waitlist title and OG tags");
