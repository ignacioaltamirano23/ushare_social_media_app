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
import Navbar from '../components/Navbar';
import ThemeButton from '../components/ThemeButton';
import { useMainContext } from '../context/mainContext';

const UploadPage = () => {
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(categories[0].name);
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);
  const { data: session } = useSession();
  const { push } = useRouter();
  const { darkTheme } = useMainContext();

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
    <section className={darkTheme ? 'dark' : 'light'}>
      <Navbar />
      <div
        className={
          loading
            ? 'opacity upload-container row mt-5 mx-auto container'
            : 'upload-container row mt-5 mx-auto container'
        }
      >
        <div
          className="col-md-5 d-flex justify-content-center align-items-center text-center p-5"
          role={'button'}
          onClick={() => filePickerRef.current.click()}
        >
          {selectedFile ? (
            <>
              <Image
                src={selectedFile}
                width={400}
                height={400}
                alt={'Selected File'}
              />
              <input
                type="file"
                hidden
                onChange={addImageToPost}
                ref={filePickerRef}
              />
            </>
          ) : (
            <div className="d-flex flex-column">
              <p>Upload a photo</p>
              <p className="cloud-icon">
                <AiOutlineCloudUpload />
              </p>
              <button>Select File</button>
              <input
                type="file"
                hidden
                onChange={addImageToPost}
                ref={filePickerRef}
              />
            </div>
          )}
        </div>
        <div className="col-md-7 d-flex flex-column justify-content-between p-4">
          <div className="d-flex flex-column mb-md-0 mb-3">
            <label className="mb-2">Caption</label>
            <input
              type="text"
              onChange={(e) => setCaption(e.target.value)}
              value={caption}
            />
          </div>
          <div className="d-flex flex-column mb-md-0 mb-3">
            <label className="mb-2">Choose a category</label>
            <select
              className="text-capitalize w-50"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option value={category.name} key={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="d-flex justify-content-evenly mt-2 mt-md-0">
            <button onClick={discardPost}>Discard</button>
            <button onClick={sendPost}>
              {loading ? 'Loading...' : 'Post image'}
            </button>
          </div>
        </div>
      </div>
      <ThemeButton />
    </section>
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
