'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';
import AIChatWidget from './AIChatWidget';
import LoadingScreen from './LoadingScreen';

export default function SiteChrome() {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith('/studio');

  if (isStudio) return null;

  return (
    <>
      <LoadingScreen />
      <Footer />
      <AIChatWidget />
    </>
  );
}
