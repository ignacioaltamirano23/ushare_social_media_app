/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { useSession } from 'next-auth/react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase.config';

const Comment = ({ comment, postId }) => {
  const { data: session } = useSession();

  const deleteComment = async () => {
    await deleteDoc(doc(db, 'posts', postId, 'comments', comment.id));
  };

  return (
    <div className="row">
      <div className="col-10 align-self-center">
        <div className="row">
          <div className="col-2 ms-2 d-flex justify-content-center align-items-center">
            <Link href={`/users/${comment.tag}`}>
              <Image
                role={'button'}
                className="rounded-circle"
                src={comment?.userImg}
                width={40}
                height={40}
                alt={comment?.username}
              />
            </Link>
          </div>
          <div className="col-9 py-2 d-flex justify-content-center flex-column">
            <Link href={`/users/${comment.tag}`}>
              <p role={'button'} className="mb-0">
                <b>{comment?.tag}</b>&nbsp;
                <GoVerified />
              </p>
            </Link>
            <span className="mb-0">{comment.comment}</span>
          </div>
        </div>
      </div>
      <div className="col-2 d-flex align-items-end">
        {session?.user.uid == comment.userId && (
          <span role={'button'} className="text-danger" onClick={deleteComment}>
            Delete
          </span>
        )}
      </div>
    </div>
  );
};

export default Comment;
