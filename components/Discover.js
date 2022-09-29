import { GoVerified } from 'react-icons/go';
import Image from 'next/image';
import Link from 'next/link';

const Discover = ({ users }) => {
  return (
    <div className="border-top p-1">
      <p>Suggested Accounts</p>
      {users?.map((user) => (
        <div className="d-flex align-items-center" key={user.data().name}>
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
          <div>
            <Link
              href={`/users/${user
                .data()
                .name.split(' ')
                .join('')
                .toLowerCase()}`}
            >
              <p role={'button'}>
                {user.data().name.split(' ').join('').toLowerCase()}
              </p>
            </Link>
            <p>{user.data().name}</p>
          </div>
          <p>
            <GoVerified />
          </p>
        </div>
      ))}
    </div>
  );
};

export default Discover;
