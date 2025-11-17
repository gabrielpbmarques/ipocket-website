import type { Metadata } from "next";
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
              "(function(){try{var s=localStorage.getItem('theme');var d = s? s==='dark' : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;var root=document.documentElement;d?root.classList.add('dark'):root.classList.remove('dark');}catch(e){}})();",
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
