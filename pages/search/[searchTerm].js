import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Post from '../../components/Post';
import { useMainContext } from '../../context/mainContext';
import { getSession } from 'next-auth/react';
import NoResults from '../../components/NoResults';
import ThemeButton from '../../components/ThemeButton';

const SearchPage = () => {
  const { posts, darkTheme } = useMainContext();
  const { query } = useRouter();
  const searchTerm = query.searchTerm;

  const filteredPosts = posts.filter(
    (post) =>
      post.data().tag.toLowerCase().includes(searchTerm) ||
      post.data().caption.toLowerCase().includes(searchTerm)
  );
  return (
    <section className={darkTheme ? 'dark' : 'light'}>
      <Navbar />
      {filteredPosts.length < 1 ? (
        <NoResults text={'No results found for the search term.'} />
      ) : (
        <div className="posts-grid container mx-auto my-4">
          {filteredPosts.map((post) => (
            <div className="user-post mx-auto" key={post.id}>
              <Post id={post.id} post={post.data()} />
            </div>
          ))}
        </div>
      )}
      <ThemeButton />
    </section>
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
