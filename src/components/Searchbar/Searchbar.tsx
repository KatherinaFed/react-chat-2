import { KeyboardEvent, useState } from 'react';
import './Searchbar.scss';
import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase';

const Searchbar = () => {
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

  return (
    <div className="searchbar">
      <div className="searchbar_input">
        <input
          type="text"
          placeholder="Find a user"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="user_chat">
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
