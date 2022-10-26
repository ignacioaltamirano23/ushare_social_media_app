import { useSession } from 'next-auth/react';
import Login from '../components/Login';
import { getProviders, getSession } from 'next-auth/react';
import { useMainContext } from '../context/mainContext';
import Feed from '../components/Feed';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ThemeButton from '../components/ThemeButton';

export default function Home({ providers }) {
  const { posts, users, darkTheme } = useMainContext();
  const { data: session } = useSession();

  if (!session) return <Login providers={providers} />;
  return (
    <section className={darkTheme ? 'dark' : 'light'}>
      <Navbar />
      <main className="container">
        <Sidebar users={users} />
        <Feed posts={posts} />
      </main>
      <ThemeButton />
    </section>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      providers,
      session,
    },
  };
}
