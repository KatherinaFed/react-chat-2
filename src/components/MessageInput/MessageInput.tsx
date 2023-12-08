import { useContext, useState } from 'react';
import './MessageInput.scss';

import Attache from '../../assets/attachment.png';
import AddPicture from '../../assets/addAvatar.png';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const MessageInput = () => {
  const [text, setText] = useState('');

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSendMessage = () => {
    
  }

  return (
    <div className="message_input">
      <input type="text" placeholder="Type something..." />
      <div className="message_send">
        <img src={Attache} alt="" />
        <input type="file" id="file" style={{ display: 'none' }} />
        <label htmlFor="file">
          <img src={AddPicture} alt="" />
        </label>
        <button>Send</button>
      </div>
    </div>
  );
};

export default MessageInput;
