import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import SearchInput from './SearchInput';
import Image from 'next/image';

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <>
      {session && (
        <nav className="p-1 sticky-top">
          <div className="container">
            <div className="header d-flex justify-content-between align-items-center">
              <Link href="/">ushare</Link>
              <SearchInput />
              <div className="d-flex align-items-center">
                <Link href={`/upload`}>
                  <a className="me-md-3 me-0">Upload</a>
                </Link>
                <Link href={`/users/${session.user.tag}`}>
                  <Image
                    className="rounded-circle d-none d-md-block"
                    src={session.user.image}
                    width={35}
                    height={35}
                    alt={'profileImg'}
                  />
                </Link>
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
