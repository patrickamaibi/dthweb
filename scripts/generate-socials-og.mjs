// scripts/generate-socials-og.mjs
// Run this AFTER `vite build`, e.g. as part of your build/deploy step.
//
// IMPORTANT: this reads the ACTUAL freshly-built dist/index.html rather than
// a hand-written template, because Vite rewrites the <script> tag to point
// at a hashed bundle filename (e.g. /assets/index-a8f3d92.js) that changes
// on every build. Only the <head> meta block is swapped — everything else
// (the correct hashed script tag, preloader, gtag, etc.) is preserved as-is.
//
// Creates dist/socials/index.html: same JS bundle as the main app,
// but with its own <head> meta tags so link-preview crawlers see the
// correct OG image for /socials specifically.

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");

const baseHtml = readFileSync(join(distDir, "index.html"), "utf-8");

const socialsMeta = `
    <title>Connect With Us | DiscoveryTech Hub</title>
    <meta name="description" content="Follow and connect with DiscoveryTech Hub across Facebook, X, LinkedIn, Instagram, TikTok, and our blog." />
    <meta name="robots" content="noindex, nofollow" />
    <link rel="canonical" href="https://discoverytechhub.com/socials" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="DiscoveryTech Hub" />
    <meta property="og:title" content="Connect With Us | DiscoveryTech Hub" />
    <meta property="og:description" content="Follow and connect with DiscoveryTech Hub across Facebook, X, LinkedIn, Instagram, TikTok, and our blog." />
    <meta property="og:image" content="https://discoverytechhub.com/ogdth1.webp" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="DiscoveryTech Hub - Connect With Us" />
    <meta property="og:url" content="https://discoverytechhub.com/socials" />
    <meta property="og:locale" content="en_NG" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Connect With Us | DiscoveryTech Hub" />
    <meta name="twitter:description" content="Follow and connect with DiscoveryTech Hub across Facebook, X, LinkedIn, Instagram, TikTok, and our blog." />
    <meta name="twitter:image" content="https://discoverytechhub.com/ogdth1.webp" />
    <meta name="twitter:image:alt" content="DiscoveryTech Hub - Connect With Us" />
`;

// Replace everything from <title> to the closing of the Twitter Card block
// in the original index.html with the socials-specific block above.
// Adjust this regex if your index.html's meta section structure differs.
const updatedHtml = baseHtml.replace(
  /<title>[\s\S]*?<meta name="twitter:image:alt"[^>]*\/>/,
  socialsMeta.trim()
);

mkdirSync(join(distDir, "socials"), { recursive: true });
writeFileSync(join(distDir, "socials", "index.html"), updatedHtml, "utf-8");

console.log("✓ Generated dist/socials/index.html with dedicated OG meta tags");