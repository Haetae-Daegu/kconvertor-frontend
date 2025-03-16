import type { AppProps } from 'next/app';
import '../styles/global.css';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps}: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster position="top-right" />
      <Analytics />
    </>
  );
}

export default MyApp;
