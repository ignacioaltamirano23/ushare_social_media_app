import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiFillHome } from 'react-icons/ai';
import { categories } from '../utils/categories';
import Discover from './Discover';

const Sidebar = ({ users }) => {
  const router = useRouter();
  const { category } = router.query;

  const activeCategoryStyle = 'category d-flex  mx-auto m-lg-2 active';
  const categoryStyle = 'category d-flex  mx-auto m-lg-2';

  return (
    <div className="sidebar mt-3">
      <div className="home d-flex justify-content-center justify-content-lg-start p-0 p-lg-3">
        <Link href="/">
          <AiFillHome className="icon active" />
        </Link>
      </div>
      <div className="categories my-2 d-flex flex-lg-wrap flex-nowrap flex-column flex-lg-row">
        {categories.map((item) => (
          <Link key={item.name} href={`/categories/${item.name}`}>
            <div
              className={
                category === item.name ? activeCategoryStyle : categoryStyle
              }
            >
              <p>{item.icon}</p>
              <p className="ms-2 d-none d-lg-block text-capitalize">
                {item.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <Discover users={users} />
    </div>
  );
};

export default Sidebar;
