import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="p-1">
      <div className="container">
        <div className="header d-flex justify-content-between align-items-center">
          <Link href="/">ushare</Link>
          <div>
            <Link href={`/upload`}>Upload</Link>
            <button className="ms-3" onClick={() => signOut()}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
