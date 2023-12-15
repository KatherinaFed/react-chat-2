import { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Message.scss';
import { ChatContext } from '../../context/ChatContext';

const Message = (msg: { message: string | null | undefined }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msg]);

  return (
    <div
      ref={ref}
      className={`message ${msg?.senderId === currentUser?.uid && 'owner'}`}
    >
      <div className="message_info">
        <img
          src={
            msg && msg?.senderId === currentUser?.uid
              ? currentUser?.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>Just now</span>
      </div>
      <div className="message_content">
        <p>{msg.text}</p>
        {msg.img && <img src={msg.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
