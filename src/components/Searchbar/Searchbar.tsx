import { KeyboardEvent, useContext, useState } from 'react';
import './Searchbar.scss';
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';

const Searchbar = () => {
  const { currentUser } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [user, setUser] = useState<DocumentData | null>(null);
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setErr(true);
    }
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) =>
    e.code === 'Enter' && handleSearch();

  const handleSelect = async () => {
    const combinedID =
      currentUser?.uid > user?.uid
        ? currentUser?.uid + user?.uid
        : user?.uid + currentUser?.uid;

    try {
      const res = await getDoc(doc(db, 'chats', combinedID));

      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combinedID), { messages: [] });

        await updateDoc(doc(db, 'userChats', currentUser?.uid as string), {
          [combinedID + '.userInfo']: {
            uid: user?.uid,
            displayName: user?.displayName,
            photoURL: user?.photoURL,
          },
          [combinedID + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', user?.uid), {
          [combinedID + '.userInfo']: {
            uid: currentUser?.uid,
            displayName: currentUser?.displayName,
            photoURL: currentUser?.photoURL,
          },
          [combinedID + '.date']: serverTimestamp(),
        });
      }
    } catch (error) {}

    setUser(null);
    setUsername('');
  };

  return (
    <div className="searchbar">
      <div className="searchbar_input">
        <input
          type="text"
          placeholder="Find a user"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="user_chat" onClick={handleSelect}>
          <img src={user?.photoURL} alt="user_avatar" />
          <div className="user_chat_info">
            <span>{user?.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
