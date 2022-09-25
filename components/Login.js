import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

const Login = ({ providers }) => {
  return (
    <div className="sign-in">
      {Object.values(providers).map((provider) => (
        <div className="d-flex" key={provider.name}>
          <button onClick={() => signIn(provider.id, { callback: '/' })}>
            <FcGoogle />
            &nbsp; Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Login;
