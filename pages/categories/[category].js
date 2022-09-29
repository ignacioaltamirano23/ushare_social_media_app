import { useRouter } from 'next/router';
import NoResults from '../../components/NoResults';
import Post from '../../components/Post';
import Sidebar from '../../components/Sidebar';
import { useMainContext } from '../../context/mainContext';
import { getSession } from 'next-auth/react';

const Category = () => {
  const { posts, users } = useMainContext();
  const { query } = useRouter();
  const category = query.category;

  const categoryPosts = posts.filter(
    (post) => post.data().category === category
  );
  return (
    <div className="container">
      <Sidebar users={users} />
      <div className="my-4 posts mx-auto">
        {categoryPosts.length < 1 ? (
          <NoResults text={'No posts in this category yet.'} />
        ) : (
          categoryPosts.map((post) => (
            <Post post={post.data()} key={post.id} id={post.id} />
          ))
        )}
      </div>
    </div>
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
