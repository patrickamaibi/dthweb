// scripts/generate-socials-og.mjs
// Run this AFTER `vite build`, e.g. as part of your build/deploy step.
//
// IMPORTANT: this reads the ACTUAL freshly-built dist/index.html rather than
// a hand-written template, because Vite rewrites the <script> tag to point
// at a hashed bundle filename (e.g. /assets/index-a8f3d92.js) that changes
// on every build. Only the block from <title> through the closing og:image
// tag is swapped — everything else (favicon links, theme anti-flash script,
// gtag, schema markup, fonts, the correct hashed script tag) is preserved.
//
// Creates dist/socials/index.html: same JS bundle as the main app,
// but with its own <head> meta tags so link-preview crawlers see the
// correct OG image and title for /socials specifically.

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");

const baseHtml = readFileSync(join(distDir, "index.html"), "utf-8");

const socialsMeta = `<title>Connect With Us | DiscoveryTech Hub</title>
    <meta name="description" content="Follow and connect with DiscoveryTech Hub across Facebook, X, LinkedIn, Instagram, TikTok, and our blog." />
    <meta name="author" content="DiscoveryTech Hub" />
    <meta name="robots" content="noindex, nofollow" />
    <link rel="canonical" href="https://discoverytechhub.com/socials" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@discoverytechhub" />
    <meta name="twitter:title" content="Connect With Us | DiscoveryTech Hub" />
    <meta name="twitter:description" content="Follow and connect with DiscoveryTech Hub across Facebook, X, LinkedIn, Instagram, TikTok, and our blog." />
    <meta name="twitter:image" content="https://discoverytechhub.com/ogdth1.webp" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://discoverytechhub.com/socials" />
    <meta property="og:title" content="Connect With Us | DiscoveryTech Hub" />
    <meta property="og:description" content="Follow and connect with DiscoveryTech Hub across Facebook, X, LinkedIn, Instagram, TikTok, and our blog." />
    <meta property="og:image" content="https://discoverytechhub.com/ogdth1.webp" />`;

// Replace everything from <title> through the closing og:image tag
// (the actual boundary in this project's real index.html structure)
// with the socials-specific block above.
const updatedHtml = baseHtml.replace(
  /<title>[\s\S]*?<meta property="og:image"[^>]*\/>/,
  socialsMeta
);

if (updatedHtml === baseHtml) {
  console.warn("⚠ WARNING: regex did not match — dist/socials/index.html will be identical to the homepage. Check the <title>...og:image boundary in your built index.html.");
}

mkdirSync(join(distDir, "socials"), { recursive: true });
writeFileSync(join(distDir, "socials", "index.html"), updatedHtml, "utf-8");

console.log("✓ Generated dist/socials/index.html with dedicated OG meta tags");