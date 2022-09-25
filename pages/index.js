import { useSession } from 'next-auth/react';
import Login from '../components/Login';
import { getProviders, getSession } from 'next-auth/react';

export default function Home({ providers }) {
  const { data: session } = useSession();

  if (!session) return <Login providers={providers} />;
  return (
    <main className="container">
      <h2>Welcome</h2>
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
