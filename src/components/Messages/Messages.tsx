import { useContext, useEffect, useState } from 'react';
import './Messages.scss';

import Message from '../Message/Message';
import { ChatContext } from '../../context/ChatContext';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

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

  return (
    <div className="messages">
      {messages?.map((msg: string) => (
        <Message message={msg} />
      ))}
    </div>
  );
};

export default Messages;
