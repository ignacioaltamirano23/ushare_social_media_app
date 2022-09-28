import { GoVerified } from 'react-icons/go';
import Image from 'next/image';
const Discover = ({ users }) => {
  return (
    <div className="border-top p-1">
      <p>Suggested Accounts</p>
      {users.map((user) => (
        <div className="d-flex align-items-center" key={user.data().name}>
          <Image
            src={user.data().image}
            height={35}
            width={35}
            alt={'Profile image'}
            className="rounded-circle"
          />
          <div>
            <p>{user.data().name.split(' ').join('').toLowerCase()}</p>
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
