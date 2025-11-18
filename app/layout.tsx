import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ipocketbrasil.com"),
  title: "iPocket Brasil – Seu iPhone, seu bolso de design.",
  description:
    "Bolso em tecido 3D inspirado no iPhone Pocket, feito no Brasil, compatível com qualquer iPhone. Encomende o seu com pagamento via PIX.",
  openGraph: {
    title: "iPocket Brasil – Seu iPhone, seu bolso de design.",
    description:
      "Bolso em tecido 3D inspirado no iPhone Pocket, feito no Brasil, compatível com qualquer iPhone. Encomende o seu com pagamento via PIX.",
    url: "https://www.ipocketbrasil.com/",
    siteName: "iPocket Brasil",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "iPocket Brasil",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    site: "@ipocketbrasil",
    title: "iPocket Brasil – Seu iPhone, seu bolso de design.",
    description:
      "Bolso em tecido 3D inspirado no iPhone Pocket, feito no Brasil, compatível com qualquer iPhone. Encomende o seu com pagamento via PIX.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var s=localStorage.getItem('theme');var root=document.documentElement;var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; if(s==='dark'){root.classList.add('dark');root.classList.remove('light');} else if(s==='light'){root.classList.add('light');root.classList.remove('dark');} else { if(prefersDark){root.classList.add('dark');root.classList.remove('light');} else {root.classList.add('light');root.classList.remove('dark');} } }catch(e){}})();",
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Analytics />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
