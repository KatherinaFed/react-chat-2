import React from 'react';
import './Chat.scss';

import Camera from '../../assets/camera.png';
import Add from '../../assets/addUser.png';
import More from '../../assets/more.png';

const Chat = () => {
  return (
    <div className="chat">
      <div className="chat_info">
        <span>Katja</span>
        <div className="chat_icons">
          <img src={Camera} alt="camera_icon" />
          <img src={Add} alt="add_icon" />
          <img src={More} alt="more_icon" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
