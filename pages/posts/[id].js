/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { db } from '../../config/firebase.config';
import { BiHeart } from 'react-icons/bi';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { GoVerified } from 'react-icons/go';
import Comment from '../../components/Comment';
import Link from 'next/link';
import { getSession } from 'next-auth/react';

const PostPage = () => {
  const [post, setPost] = useState();
  const [comments, setComments] = useState('');
  const [comment, setComment] = useState('');
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const { data: session } = useSession();
  const ref = useRef();
  const router = useRouter();
  const postId = router.query.id;

  useEffect(() => {
    if (!router.isReady) return;
    onSnapshot(collection(db, 'posts', postId, 'likes'), (snapshot) => {
      setLikes(snapshot.docs);
      router.isReady = null;
    });
  }, [postId]);

  useEffect(() => {
    setLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1);
  }, [likes]);

  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, 'posts', postId, 'likes', session?.user.uid));
    } else {
      await setDoc(doc(db, 'posts', postId, 'likes', session?.user.uid), {
        username: session?.user.name,
      });
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    onSnapshot(doc(db, 'posts', postId), (snapshot) => {
      setPost(snapshot.data());
      router.isReady = null;
    });
  }),
    [];

  useEffect(() => {
    if (!router.isReady) return;
    onSnapshot(
      query(
        collection(db, 'posts', postId, 'comments'),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => {
        setComments(snapshot.docs);
        router.isReady = null;
      }
    );
  }, [comments, postId]);

  const sendComment = async (e) => {
    e.preventDefault();
    const commentRef = doc(collection(db, 'posts', postId, 'comments'));
    await setDoc(commentRef, {
      comment,
      id: commentRef.id,
      username: session.user.name,
      userId: session.user.uid,
      tag: session.user.tag,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
    });
    setComment('');
  };

  useEffect(() => {
    ref.current.focus();
  }, []);

  const handleGoBack = (e) => {
    if (e.key === 'Escape') return router.back();
  };

  return (
    <div
      ref={ref}
      className="row post-page vh-100"
      onKeyDown={handleGoBack}
      tabIndex={-1}
    >
      <div className="post-page img col-md-7 d-flex justify-content-center align-items-center position-relative">
        <p
          className="position-absolute close-icon"
          onClick={() => router.back()}
        >
          <AiOutlineCloseCircle />
        </p>
        <div className="image-container">
          <Image
            width={500}
            height={500}
            src={post?.image}
            alt={post?.caption}
          />
        </div>
      </div>

      {/* USER */}
      <div className="col-md-5">
        <div className="row my-3 post-page user">
          <div className="d-flex align-items-center ms-3">
            <Link href={`/users/${post?.tag}`}>
              <Image
                role={'button'}
                className="rounded-circle"
                src={post?.profileImg}
                width={40}
                height={40}
                alt={post?.username}
              />
            </Link>
            <div className="ms-2">
              <Link href={`/users/${post?.tag}`}>
                <p role={'button'}>
                  <b>
                    {post?.username} <GoVerified />
                  </b>
                </p>
              </Link>
              <span className="mb-0">{post?.tag}</span>
            </div>
          </div>
          <span className="ms-4 mt-4">{post?.caption}</span>
          <div className="d-flex align-items-center m-4">
            <span>{likes.length > 0 && likes.length}&nbsp;</span>
            {liked ? (
              <p className="icon heart-icon fill" onClick={likePost}>
                <AiFillHeart />
              </p>
            ) : (
              <p className="icon heart-icon" onClick={likePost}>
                <BiHeart />
              </p>
            )}
          </div>
        </div>
        {/* COMMENTS */}
        <div className="comment-container row">
          <>
            {comments.length > 0 &&
              comments.map((comment) => (
                <Comment
                  key={comment.id}
                  id={comment.id}
                  postId={postId}
                  comment={comment.data()}
                />
              ))}
          </>
          <div className="col d-flex align-self-end py-4 ps-4">
            <input
              className="w-50"
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment"
            />
            <button className="ms-4" type="submit" onClick={sendComment}>
              Send Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;

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
