import { GoVerified } from 'react-icons/go';
import Image from 'next/image';
import Link from 'next/link';

const Discover = ({ users }) => {
  return (
    <div className="discover p-2">
      <p className="d-none d-lg-block my-2">Suggested Accounts</p>
      {users?.map((user) => (
        <div
          className="d-flex justify-content-center align-items-center justify-content-lg-start my-lg-2 my-2"
          key={user.data().name}
        >
          <Link
            href={`/users/${user
              .data()
              .name.split(' ')
              .join('')
              .toLowerCase()}`}
          >
            <Image
              role={'button'}
              src={user.data().image}
              height={35}
              width={35}
              alt={'Profile image'}
              className="rounded-circle"
            />
          </Link>
          <Link
            href={`/users/${user
              .data()
              .name.split(' ')
              .join('')
              .toLowerCase()}`}
          >
            <p className="tag ms-2 me-1 d-none d-lg-block">
              {user.data().name.split(' ').join('').toLowerCase()}
            </p>
          </Link>
          <p className="tag d-none d-lg-block">
            <GoVerified />
          </p>
        </div>
      ))}
    </div>
  );
};

export default Discover;
