import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Post from '../../components/Post';
import { useMainContext } from '../../context/mainContext';
import { getSession } from 'next-auth/react';
import NoResults from '../../components/NoResults';

const SearchPage = () => {
  const { posts } = useMainContext();
  const { query } = useRouter();
  const searchTerm = query.searchTerm;

  const filteredPosts = posts.filter(
    (post) =>
      post.data().tag.toLowerCase().includes(searchTerm) ||
      post.data().caption.toLowerCase().includes(searchTerm)
  );
  return (
    <>
      <Navbar />
      {filteredPosts.length < 1 ? (
        <NoResults text={'No results found for the search term.'} />
      ) : (
        <div className="posts-grid container mx-auto my-4">
          {filteredPosts.map((post) => (
            <Post id={post.id} key={post.id} post={post.data()} />
          ))}
        </div>
      )}
    </>
  );
};

export default SearchPage;

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
    props: { session },
  };
}
