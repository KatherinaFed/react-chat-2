import './Message.scss'
import { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { MessageI } from '../Messages/Messages';
import DefaultAvatar from '../../assets/defaultAvatar.png';

const Message = (props: { message: MessageI }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [props.message]);

  return (
    <div
      ref={ref}
      className={`message ${
        props.message?.senderID === currentUser?.uid && 'owner'
      }`}
    >
      <div className="message_info">
        <img
          src={
            props.message.senderID === currentUser?.uid
              ? currentUser.photoURL || DefaultAvatar
              : data.user.photoURL || DefaultAvatar
          }
          alt="photo profile"
        />
        <span>Just now</span>
      </div>
      <div className="message_content">
        <p>{props.message.text}</p>
        {props.message.img && (
          <img src={props.message.img} alt="message content" />
        )}
      </div>
    </div>
  );
};

export default Message;
