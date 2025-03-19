import type { AppProps } from 'next/app';
import '../styles/global.css';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/Header';
import { AuthProvider } from '@/contexts/AuthContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Header />
      <Component {...pageProps} />
      <Toaster position="top-right" />
      <Analytics />
    </AuthProvider>
  );
}
