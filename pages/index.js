import { useSession } from 'next-auth/react';
import Login from '../components/Login';
import { getProviders, getSession } from 'next-auth/react';
import { useMainContext } from '../context/mainContext';
import Feed from '../components/Feed';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { BsMoonFill, BsSunFill } from 'react-icons/bs';

export default function Home({ providers }) {
  const { posts, users, darkTheme, toggleDarkTheme } = useMainContext();
  const { data: session } = useSession();

  if (!session) return <Login providers={providers} />;
  return (
    <main className={darkTheme ? 'dark' : 'light'}>
      <Navbar />
      <div className="container">
        <Sidebar users={users} />
        <Feed posts={posts} />
      </div>
      <button className="theme-btn" onClick={toggleDarkTheme}>
        {darkTheme ? <BsSunFill /> : <BsMoonFill />}
      </button>
    </main>
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
