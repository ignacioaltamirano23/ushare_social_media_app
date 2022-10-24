import { useRouter } from 'next/router';
import Post from '../../components/Post';
import { useMainContext } from '../../context/mainContext';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { collectionGroup, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import { getSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';

const UserProfile = () => {
  const { posts, users } = useMainContext();
  const [saves, setSaves] = useState([]);
  const [activeBtn, setActiveBtn] = useState('Created');
  const { query } = useRouter();
  const id = query.id;

  useEffect(() => {
    const getPosts = async () => {
      onSnapshot(collectionGroup(db, 'saves'), (snapshot) => {
        setSaves(snapshot.docs.map((doc) => doc));
      });
    };
    getPosts();
  }, []);

  const userSavedPosts = saves.filter((post) =>
    post.data().username.includes(id)
  );
  const userCreatedPosts = posts.filter((post) => post.data().tag === id);

  const user = users?.filter(
    (user) => user?.data().name.split(' ').join('').toLocaleLowerCase() === id
  );

  const activeButtonStyle = 'selected-posts m-2 active ';
  const buttonStyle = 'selected-posts m-2';

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="profile-background position-relative">
          <Image
            src="https://source.unsplash.com/random/1920x600/?nature"
            alt="profile-background"
            width={1920}
            height={600}
          />
          <div className="position-absolute top-100 start-50 translate-middle">
            <Image
              className="rounded-circle "
              src={user[0]?.data().image}
              alt="userImg"
              width={80}
              height={80}
            />
          </div>
        </div>
        <div className="text-center my-5">
          <h2>{user[0]?.data().name}</h2>
          <button
            className={
              activeBtn === 'Created' ? activeButtonStyle : buttonStyle
            }
            onClick={() => {
              setActiveBtn('Created');
            }}
          >
            Created
          </button>
          <button
            className={activeBtn === 'Saved' ? activeButtonStyle : buttonStyle}
            onClick={() => {
              setActiveBtn('Saved');
            }}
          >
            Saved
          </button>
        </div>
        <motion.div
          initial={{ y: '200px', opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="posts-grid mb-3"
        >
          {activeBtn === 'Created' && userCreatedPosts.length >= 1 ? (
            userCreatedPosts.map((post) => (
              <Post key={post.id} id={post.id} post={post.data()} />
            ))
          ) : (
            <h3 className={activeBtn !== 'Created' ? 'd-none' : 'text-center'}>
              No posts created yet.
            </h3>
          )}

          {activeBtn === 'Saved' && userSavedPosts.length >= 1 ? (
            userSavedPosts.map((doc) => (
              <Post
                key={doc.data().id}
                id={doc.data().id}
                post={doc.data().post}
              />
            ))
          ) : (
            <h3 className={activeBtn !== 'Saved' ? 'd-none' : 'text-center'}>
              No posts saved yet.
            </h3>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default UserProfile;

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
