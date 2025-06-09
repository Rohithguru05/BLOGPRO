
import { SessionProvider } from 'next-auth/react';
import { useState, useEffect } from 'react';
import '../styles/globals.css';

import TiptapEditor from '@/components/TiptapEditor';
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <SessionProvider session={session}>
      {mounted && <Component {...pageProps} />}
    </SessionProvider>
  );
}