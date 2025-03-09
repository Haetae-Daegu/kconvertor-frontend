import type { AppProps } from 'next/app';
import '../styles/global.css';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps}: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </>
  );
}

export default MyApp;
