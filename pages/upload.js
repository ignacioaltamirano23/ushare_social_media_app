import { getSession } from 'next-auth/react';
import { useRef } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useState } from 'react';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { db, storage } from '../config/firebase.config';
import { useSession } from 'next-auth/react';
import { categories } from '../utils/categories';
import Image from 'next/image';
import { useRouter } from 'next/router';

const UploadPage = () => {
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(categories[0].name);
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);
  const { data: session } = useSession();
  const { push } = useRouter();
  console.log(session);

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, 'posts'), {
      postedBy: session?.user.uid,
      username: session?.user.name,
      profileImg: session?.user.image,
      tag: session?.user.tag,
      createdAt: serverTimestamp(),
      caption,
      category,
    });

    console.log(`doc added with id: ${docRef.id}`);

    const imageRef = ref(storage, `/posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURL,
        });
      });
    }
    setLoading(false);
    setCaption('');
    setSelectedFile(null);
    push('/');
  };

  const discardPost = async () => {
    setCaption('');
    setSelectedFile(null);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <>
      <div
        className={
          loading
            ? 'row upload-wrapper mx-auto opacity'
            : 'row upload-wrapper mx-auto'
        }
      >
        <div
          onClick={() => filePickerRef.current.click()}
          className="col-md-5 align-items-center d-flex justify-content-center flex-column"
        >
          {selectedFile ? (
            <div className="">
              <Image
                src={selectedFile}
                width={400}
                height={400}
                alt={'Selected File'}
              />
              <input
                type="file"
                ref={filePickerRef}
                hidden
                onChange={addImageToPost}
              />
            </div>
          ) : (
            <>
              <h3 className="mt-3">Upload</h3>
              <p className="my-3 cloud-icon">
                <AiOutlineCloudUpload />
              </p>
              <button className="px-3 mb-3">Select File</button>
              <input
                type="file"
                ref={filePickerRef}
                hidden
                onChange={addImageToPost}
              />
            </>
          )}
        </div>
        <div className="col-md-7">
          <div className="upload-details d-flex flex-column justify-content-center align-items-center">
            <div className="w-100 d-flex flex-column">
              <label>Caption</label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
              <label className=" mt-3">Choose a category</label>
              <select
                className="text-capitalize w-sm-50"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((item) => (
                  <option value={item.name} key={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-flex justify-content-between w-100">
              <button className="upload-btn" onClick={discardPost}>
                Discard
              </button>
              <button className="upload-btn" onClick={sendPost}>
                {loading ? 'Loading' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadPage;

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
