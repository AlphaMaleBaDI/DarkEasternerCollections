import React from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { InquiryTray } from '@/components/commerce/InquiryTray';
import { StickyInquiryBar } from '@/components/commerce/StickyInquiryBar';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <InquiryTray />
      <StickyInquiryBar />
      <Footer />
    </>
  );
}
