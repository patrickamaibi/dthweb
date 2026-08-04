import { Helmet } from "react-helmet-async";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Phone,
  Mail,
  Rss,
} from "lucide-react";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 15.68a6.34 6.34 0 0012.67-1.48V8.63a8.31 8.31 0 004.77 1.52v-3.4a4.85 4.85 0 01-2.85-1.06z" />
  </svg>
);

type Tile = {
  label: string;
  handle: string;
  href: string;
  icon: React.ReactNode;
};

const TILES: Tile[] = [
  {
    label: "Facebook",
    handle: "disctechhub",
    href: "https://web.facebook.com/disctechhub",
    icon: <Facebook className="w-5 h-5" />,
  },
  {
    label: "X (Twitter)",
    handle: "@disctechhub",
    href: "https://x.com/disctechhub",
    icon: <Twitter className="w-5 h-5" />,
  },
  {
    label: "LinkedIn",
    handle: "DiscoveryTech Hub",
    href: "https://www.linkedin.com/company/discoverytechhub",
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    label: "Instagram",
    handle: "@discoverytechhub",
    href: "https://www.instagram.com/discoverytechhub",
    icon: <Instagram className="w-5 h-5" />,
  },
  {
    label: "TikTok",
    handle: "@discoverytechhub",
    href: "http://tiktok.com/@discoverytechhub",
    icon: <TikTokIcon className="w-5 h-5" />,
  },
  {
    label: "Blog",
    handle: "blog.discoverytechhub.com",
    href: "https://blog.discoverytechhub.com",
    icon: <Rss className="w-5 h-5" />,
  },
  {
    label: "Email",
    handle: "info@discoverytechhub.com",
    href: "mailto:info@discoverytechhub.com",
    icon: <Mail className="w-5 h-5" />,
  },
  {
    label: "Call Us",
    handle: "+234 904 746 5802",
    href: "tel:+2349047465802",
    icon: <Phone className="w-5 h-5" />,
  },
];

export default function Socials() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Helmet>
        <title>Connect With Us | DiscoveryTech Hub</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <style>{`
        @keyframes dth-float-a { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-9px) rotate(3deg); } }
        @keyframes dth-float-b { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-13px) rotate(-3deg); } }
        @keyframes dth-fadeup { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .dth-tile { transition: transform 0.25s ease, background-color 0.25s ease, border-color 0.25s ease; }
        .dth-tile:hover { transform: translateY(-3px); border-color: rgba(37,99,235,0.55) !important; }
        .dth-tile:hover .dth-icon-badge { background-color: #1A4FD6 !important; }
      `}</style>

      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/ogdth1.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(10px) brightness(0.55) saturate(1.1)",
          transform: "scale(1.1)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,31,68,0.55) 0%, rgba(10,31,68,0.88) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center min-h-screen px-5 pt-32 pb-12">
        <div className="w-full max-w-3xl">
          <div
            className="text-center mb-9"
            style={{ animation: "dth-fadeup 0.6s ease forwards", opacity: 0 }}
          >
            <p
              className="uppercase font-medium mb-2"
              style={{
                fontSize: 11,
                letterSpacing: "0.22em",
                color: "#7FA6F0",
              }}
            >
              Connect With Us
            </p>
            <h1 className="text-white text-2xl font-bold tracking-wide">
              Where Technology Meets Creativity
            </h1>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {TILES.map((tile, i) => (
              <a
                key={tile.label}
                href={tile.href}
                target={tile.href.startsWith("http") ? "_blank" : undefined}
                rel={tile.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="dth-tile glassmorphism flex flex-col items-center text-center gap-2.5 rounded-2xl px-3 py-6 no-underline"
                style={{
                  opacity: 0,
                  animation: `dth-fadeup 0.5s ease ${0.15 + i * 0.06}s forwards`,
                  backgroundColor: "rgba(255,255,255,0.06)",
                  borderColor: "rgba(255,255,255,0.18)",
                }}
              >
                <div
                  className="dth-icon-badge flex items-center justify-center flex-shrink-0 rounded-xl text-white"
                  style={{
                    width: 44,
                    height: 44,
                    backgroundColor: "rgba(37,99,235,0.75)",
                    animation: `${
                      i % 2 === 0 ? "dth-float-a" : "dth-float-b"
                    } ${3.5 + (i % 3) * 0.6}s ease-in-out infinite`,
                    animationDelay: `${i * 0.25}s`,
                    transition: "background-color 0.25s ease",
                  }}
                >
                  {tile.icon}
                </div>
                <div>
                  <p className="text-white font-medium text-[14px] m-0">
                    {tile.label}
                  </p>
                  <p className="text-blue-200/70 text-[11px] m-0 mt-0.5 break-words">
                    {tile.handle}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}