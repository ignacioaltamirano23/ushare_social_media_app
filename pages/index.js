import { useSession } from 'next-auth/react';
import Login from '../components/Login';
import { getProviders, getSession } from 'next-auth/react';
import { useMainContext } from '../context/mainContext';
import Feed from '../components/Feed';
import Sidebar from '../components/Sidebar';

export default function Home({ providers }) {
  const { posts, users } = useMainContext();
  const { data: session } = useSession();

  if (!session) return <Login providers={providers} />;
  return (
    <main>
      <Sidebar users={users} />
      <Feed posts={posts} />
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
