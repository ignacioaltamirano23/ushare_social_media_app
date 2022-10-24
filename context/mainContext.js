const { createContext, useContext, useEffect, useState } = require('react');
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../config/firebase.config';

const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [darkTheme, setDarkTheme] = useState();

  useEffect(() => {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('createdAt', 'desc'));
    onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs);
    });
  }, []);

  useEffect(() => {
    const usersRef = collection(db, 'users');
    onSnapshot(usersRef, (snapshot) => {
      setUsers(snapshot.docs);
    });
  }, []);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('darkTheme')) === 'ON') {
      setDarkTheme(true);
    }
  }, []);

  useEffect(() => {
    darkTheme
      ? localStorage.setItem('darkTheme', JSON.stringify('ON'))
      : localStorage.setItem('darkTheme', JSON.stringify('OFF'));
  }, [darkTheme]);

  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const data = { posts, users, darkTheme, toggleDarkTheme };
  return <MainContext.Provider value={data}>{children}</MainContext.Provider>;
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  return context;
};
