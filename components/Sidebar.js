import React from 'react';
import { categories } from '../utils/categories';
import Discover from './Discover';

const Sidebar = ({ users }) => {
  return (
    <div className="sidebar mt-1">
      <div className="categories d-flex flex-lg-wrap flex-nowrap flex-column flex-lg-row">
        {categories.map((category) => (
          <div
            key={category.name}
            className="category d-flex my-1 mx-auto m-lg-2"
          >
            <p>{category.icon}</p>
            <p className="ms-2 d-none d-lg-block text-capitalize">
              {category.name}
            </p>
          </div>
        ))}
      </div>
      <Discover users={users} />
    </div>
  );
};

export default Sidebar;
