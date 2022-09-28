import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.scss';
import '@fontsource/roboto';
import Navbar from '../components/Navbar';
import { SessionProvider } from 'next-auth/react';
import { MainProvider } from '../context/mainContext';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <MainProvider>
        <Navbar />
        <Component {...pageProps} />
      </MainProvider>
    </SessionProvider>
  );
}

export default MyApp;
