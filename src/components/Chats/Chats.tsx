import React, { useContext, useEffect, useState } from 'react';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import './Chats.scss';
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';

const Chats = () => {
  const { currentUser } = useContext(AuthContext);
  const [chats, setChats] = useState<DocumentData | {}>([]);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, 'userChats', currentUser?.uid as string),
        (doc) => {
          setChats(doc.data());
        }
      );

      return () => {
        unsub();
      };
    };

    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  const chatsIntoArray = Object.entries(chats);

  return (
    <div className="chats">
      {chatsIntoArray.map((chat) => (
        <div className="user_chat" key={chat[0]}>
          <img
            src={chat[1].userInfo.photoURL}
            alt="user avatar"
          />
          <div className="user_chat_info">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
