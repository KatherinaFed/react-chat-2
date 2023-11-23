import React from 'react';
import './MessageInput.scss';

import Attache from '../../assets/attachment.png';
import AddPicture from '../../assets/addAvatar.png'

const MessageInput = () => {
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
