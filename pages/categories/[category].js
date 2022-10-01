import { useRouter } from 'next/router';
import NoResults from '../../components/NoResults';
import Post from '../../components/Post';
import Sidebar from '../../components/Sidebar';
import { useMainContext } from '../../context/mainContext';
import { getSession } from 'next-auth/react';
import Navbar from '../../components/Navbar';

const Category = () => {
  const { posts, users } = useMainContext();
  const { query } = useRouter();
  const category = query.category;

  const categoryPosts = posts.filter(
    (post) => post.data().category === category
  );
  return (
    <>
      <Navbar />
      <div className="container">
        <Sidebar users={users} />
        <div className="mx-auto mt-3 posts">
          {categoryPosts.length < 1 ? (
            <div style={{ 'marginLeft': '20vw' }}>
              <NoResults text={'No posts in this category yet.'} />
            </div>
          ) : (
            categoryPosts.map((post) => (
              <div className="my-4 post" key={post.id}>
                <Post post={post.data()} id={post.id} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Category;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
