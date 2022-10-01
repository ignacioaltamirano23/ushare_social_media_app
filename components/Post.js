/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BiHeart } from 'react-icons/bi';
import { FaComments } from 'react-icons/fa';
import {
  AiFillHeart,
  AiOutlineDelete,
  AiOutlineFileAdd,
  AiOutlineFileDone,
} from 'react-icons/ai';
import { GoVerified } from 'react-icons/go';
import Moment from 'react-moment';
import { db } from '../config/firebase.config';
import { motion } from 'framer-motion';

const Post = ({ id, post }) => {
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [saves, setSaves] = useState([]);
  const [saved, setSaved] = useState(false);
  const [comments, setComments] = useState();
  const { data: session } = useSession();

  useEffect(() => {
    onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) =>
      setLikes(snapshot.docs)
    );
  }, []);

  useEffect(() => {
    onSnapshot(collection(db, 'posts', id, 'comments'), (snapshot) =>
      setComments(snapshot.docs)
    );
  }, []);

  useEffect(() => {
    onSnapshot(collection(db, 'posts', id, 'saves'), (snapshot) => {
      setSaves(snapshot.docs);
    });
  }, []);

  useEffect(() => {
    setLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1);
  }, [likes]);

  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session?.user.uid));
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', session?.user.uid), {
        username: session?.user.name,
      });
    }
  };

  useEffect(() => {
    setSaved(saves.findIndex((save) => save.id === session?.user.uid) !== -1);
  }, [saves]);

  const savePost = async () => {
    if (saved) {
      await deleteDoc(doc(db, 'posts', id, 'saves', session?.user.uid));
    } else {
      await setDoc(doc(db, 'posts', id, 'saves', session?.user.uid), {
        username: session?.user.tag,
        post,
        id,
      });
    }
  };

  const deletePost = async () => {
    await deleteDoc(doc(db, 'posts', id));
  };
  return (
    <div className="p-3 mx-auto">
      <div
        className="d-flex align-items-center
       mb-2"
      >
        <Link href={`/users/${post?.tag}`}>
          <div className="image-container">
            <Image
              role={'button'}
              className="rounded-circle"
              src={post?.profileImg}
              width={35}
              height={35}
              alt={post?.username}
            />
          </div>
        </Link>
        <div className="d-flex flex-column  justify-content-cente align-items">
          <Link href={`/users/${post?.tag}`}>
            <div className="d-flex ms-3 d-none d-sm-flex">
              <p role={'button'}>
                <b>{post?.tag}</b>&nbsp;
              </p>
              <p role={'button'} className="d-none d-sm-block">
                <GoVerified />
              </p>
            </div>
          </Link>
          <span className="ms-3 d-none d-sm-block">
            <Moment fromNow>{post?.createdAt?.toDate()}</Moment>
          </span>
        </div>

        <span
          role={'button'}
          className={saved ? 'active ms-auto' : ' ms-auto'}
          onClick={savePost}
        >
          {saved ? (
            <span className="icon active">
              <AiOutlineFileDone />
            </span>
          ) : (
            <span className="icon">
              <AiOutlineFileAdd />
            </span>
          )}
        </span>
      </div>
      <div className="d-flex justify-content-center">
        <Link href={`/posts/${id}`}>
          <motion.a>
            <Image
              role="button"
              width={400}
              height={400}
              src={post?.image}
              alt={post?.caption}
            />
          </motion.a>
        </Link>
      </div>
      <div className="d-flex align-items-center p-1">
        <span className="me-2">{likes.length > 0 && likes.length}</span>
        {liked ? (
          <p className="icon heart-icon me-2 fill" onClick={likePost}>
            <AiFillHeart />
          </p>
        ) : (
          <p className="icon heart-icon me-2" onClick={likePost}>
            <BiHeart />
          </p>
        )}
        <span className="me-2">{comments?.length > 0 && comments.length}</span>
        <Link href={`/posts/${id}`}>
          <p className="icon">
            <FaComments />
          </p>
        </Link>
        {session?.user.uid == post.postedBy && (
          <p className="ms-auto icon" onClick={deletePost}>
            <AiOutlineDelete />
          </p>
        )}
      </div>
      <span className="ms-1">{post?.caption}</span>
    </div>
  );
};

export default Post;
