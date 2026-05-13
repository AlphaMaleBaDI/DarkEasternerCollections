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
  description: "Confidence, elegance, and African luxury. Curated fashion for men and women who command presence effortlessly.",
  metadataBase: new URL('https://dark-easterner-collections.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Dark Easterner Collections | Luxury Afro-Luxe Couture",
    description: "Confidence, elegance, and African luxury. Curated fashion for men and women who command presence effortlessly.",
    url: 'https://dark-easterner-collections.vercel.app',
    siteName: 'Dark Easterner Collections',
    images: [
      {
        url: '/assets/images/founder/cynthia-hero.png',
        width: 1200,
        height: 1500, // Portrait ratio matches the asset
        alt: 'Dark Easterner Collections - Luxury Afro-Luxe Couture',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Dark Easterner Collections | Luxury Afro-Luxe Couture",
    description: "Confidence, elegance, and African luxury. Curated fashion for men and women who command presence effortlessly.",
    images: ['/assets/images/founder/cynthia-hero.png'],
  },
  icons: {
    icon: "/icon.jpg",
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
