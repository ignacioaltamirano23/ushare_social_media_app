import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  // apiKey: 'AIzaSyBcorKIUIPKZSpRFS2C1hIDkALfQzMvQyw',
  // authDomain: 'ushare-4edff.firebaseapp.com',
  // projectId: 'ushare-4edff',
  // storageBucket: 'ushare-4edff.appspot.com',
  // messagingSenderId: '220878634095',
  // appId: '1:220878634095:web:3a49ba672d59bdd94ce19a',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage();

export default app;
export { auth, db, storage };
