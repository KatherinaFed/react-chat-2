import { useContext, useEffect, useState } from 'react';
import './Messages.scss';

import Message from '../Message/Message';
import { ChatContext } from '../../context/ChatContext';
import { DocumentData, Timestamp, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

export interface MessageI {
  date: Timestamp;
  id: string;
  senderID: string;
  text: string;
  img?: string | null;
}

const Messages = () => {
  const [messages, setMessages] = useState<DocumentData | undefined>([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatID), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [data.chatID]);

  console.log('Messages: ', messages)

  return (
    <div className="messages">
      {messages?.map((msg: MessageI) => (
        <Message message={msg} />
      ))}
    </div>
  );
};

export default Messages;
