import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.scss';
import '@fontsource/roboto';
import { SessionProvider } from 'next-auth/react';
import { MainProvider } from '../context/mainContext';
import Router from 'next/router';
import Loader from '../components/Loader';
import { useState } from 'react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [loading, setLoading] = useState(false);

  Router.events.on('routeChangeStart', (url) => {
    setLoading(true);
  });
  Router.events.on('routeChangeComplete', (url) => {
    setLoading(false);
  });
  return (
    <SessionProvider session={session}>
      <MainProvider>
        {loading ? <Loader /> : <Component {...pageProps} />}
      </MainProvider>
    </SessionProvider>
  );
}

export default MyApp;
