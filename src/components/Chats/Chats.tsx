import { useContext, useEffect, useState } from 'react';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import './Chats.scss';
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext, UserInfo } from '../../context/ChatContext';

const Chats = () => {
  const [chats, setChats] = useState<DocumentData | undefined>({});

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

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

  const chatsIntoArray = Object.entries(chats as DocumentData);

  const handleSelect = (userInfo: UserInfo) => {
    dispatch({
      type: 'CHANGE_USER',
      payload: userInfo,
    });
  };

  return (
    <div className="chats">
      {chatsIntoArray.map((chat) => (
        <div
          className="user_chat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt="user avatar" />
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
