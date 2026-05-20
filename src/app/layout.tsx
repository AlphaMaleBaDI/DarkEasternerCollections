import type { Metadata } from "next";
import "./globals.css";
import { PageTransition } from '@/components/ui/PageTransition';

export const metadata: Metadata = {
  title: "Dark Easterner Collections | Luxury Afro-Luxe Couture",
  description:
    "Luxury Afro-Luxe couture curated for individuals who command presence effortlessly through timeless editorial craftsmanship.",
  metadataBase: new URL("https://darkeasternercollections.com"),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Dark Easterner Collections | Luxury Afro-Luxe Couture",
    description:
      "Luxury Afro-Luxe couture curated for individuals who command presence effortlessly through timeless editorial craftsmanship.",
    url: "https://darkeasternercollections.com",
    siteName: "Dark Easterner Collections",
    images: [
      {
        url: "https://darkeasternercollections.com/og-image-v2.jpg",
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
    title: "Dark Easterner Collections | Luxury Afro-Luxe Couture",
    description:
      "Luxury Afro-Luxe couture curated for individuals who command presence effortlessly through timeless editorial craftsmanship.",
    images: ["https://darkeasternercollections.com/og-image-v2.jpg"],
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
      className="h-full antialiased"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-deep-black text-soft-white selection:bg-luxury-gold selection:text-deep-black overflow-x-hidden"
      >
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
