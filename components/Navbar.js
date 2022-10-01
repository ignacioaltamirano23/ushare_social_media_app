import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import SearchInput from './SearchInput';

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <>
      {session && (
        <nav className="p-1 sticky-top">
          <div className="container">
            <div className="header d-flex justify-content align-items-center">
              <Link href="/">ushare</Link>
              <SearchInput />
              <div>
                <Link href={`/upload`}>Upload</Link>
                <button className="ms-3" onClick={() => signOut()}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
