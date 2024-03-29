import { useContext } from 'react';
import './Chat.scss';

import Camera from '../../assets/camera.png';
import Add from '../../assets/addUser.png';
import More from '../../assets/more.png';
import Messages from '../Messages/Messages';
import MessageInput from '../MessageInput/MessageInput';
import { ChatContext } from '../../context/ChatContext';

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chat_info">
        <span>{data.user?.displayName}</span>
        <div className="chat_icons">
          <img src={Camera} alt="camera_icon" />
          <img src={Add} alt="add_icon" />
          <img src={More} alt="more_icon" />
        </div>
      </div>
      <Messages />
      <MessageInput />
    </div>
  );
};

export default Chat;
