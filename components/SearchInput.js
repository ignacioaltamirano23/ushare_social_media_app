import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const { push } = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    push(`/search/${search}`);
  };
  return (
    <form onSubmit={handleSubmit} className="mx-auto">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="me-auto" type="submit" hidden></button>
    </form>
  );
};

export default SearchInput;
