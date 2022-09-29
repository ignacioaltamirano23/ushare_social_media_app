import { useRouter } from 'next/router';
import React from 'react';

const UserProfile = () => {
  const { query } = useRouter();
  return <div>UserProfile with tag {query.id}</div>;
};

export default UserProfile;
