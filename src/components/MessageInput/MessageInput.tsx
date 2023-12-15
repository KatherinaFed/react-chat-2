import { ChangeEvent, useContext, useState } from 'react';
import './MessageInput.scss';

import Attache from '../../assets/attachment.png';
import AddPicture from '../../assets/addAvatar.png';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { db, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const MessageInput = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();

    if (e.target.files) {
      const file = e.target.files[0];
      formData.append('file', file);
      setImage(file);
    }
  };

  const handleSendMessage = async () => {
    if (image) {
      const storageRef = ref(storage, uuid());

      await uploadBytesResumable(storageRef, image).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, 'chats', data.chatID), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser?.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
        });
      });
    } else {
      await updateDoc(doc(db, 'chats', data.chatID), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderID: currentUser?.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, 'userChats', currentUser?.uid as string), {
      [data.chatID + '.lastMessage']: {
        text,
      },
      [data.chatID + '.date']: serverTimestamp(),
    });

    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [data.chatID + '.lastMessage']: {
        text,
      },
      [data.chatID + '.date']: serverTimestamp(),
    });

    setText('');
    setImage(null);
  };

  return (
    <div className="message_input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="message_send">
        <img src={Attache} alt="" />
        <input
          type="file"
          id="file"
          style={{ display: 'none' }}
          onChange={(e) => handleChangeImage(e)}
        />
        <label htmlFor="file">
          <img src={AddPicture} alt="" />
        </label>
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default MessageInput;
