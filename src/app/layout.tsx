import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { PageTransition } from '@/components/ui/PageTransition';

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dark Easterner Collections | Luxury Afro-Luxe Couture",
  description:
    "Luxury Afro-Luxe couture curated for individuals who command presence effortlessly.",
  metadataBase: new URL("https://darkeasternercollections.com"),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Dark Easterner Collections",
    description:
      "Luxury Afro-Luxe couture curated for individuals who command presence effortlessly.",
    url: "https://darkeasternercollections.com",
    siteName: "Dark Easterner Collections",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dark Easterner Collections",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dark Easterner Collections",
    description:
      "Luxury Afro-Luxe couture curated for individuals who command presence effortlessly.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-deep-black text-soft-white selection:bg-luxury-gold selection:text-deep-black overflow-x-hidden"
      >
        <Navbar />
        <PageTransition>
          {children}
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
