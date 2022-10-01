import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Post from '../../components/Post';
import { useMainContext } from '../../context/mainContext';

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

      <div className="posts-grid container mx-auto my-4">
        {filteredPosts.map((post) => (
          <Post id={post.id} key={post.id} post={post.data()} />
        ))}
      </div>
    </>
  );
};

export default SearchPage;
