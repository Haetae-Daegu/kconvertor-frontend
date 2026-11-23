import type { AppProps } from 'next/app';
import '../styles/global.css';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/Header';
import AnnouncementBanner from '@/components/AnnouncementBanner';
import { AuthProvider } from '@/contexts/AuthContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AnnouncementBanner />
      <Header />
      <Component {...pageProps} />
      <Toaster position="top-right" />
      <Analytics />
    </AuthProvider>
  );
}
