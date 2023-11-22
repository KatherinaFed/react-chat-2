import React from 'react'
import './Chats.scss'

const Chats = () => {
  return (
    <div className='chats'>
      <div className="user_chat">
        <img
          src="https://m.media-amazon.com/images/S/pv-target-images/16627900db04b76fae3b64266ca161511422059cd24062fb5d900971003a0b70.jpg"
          alt=""
        />
        <div className="user_chat_info">
          <span>Katja</span>
          <p>Hello</p>
        </div>
      </div>
    </div>
  )
}

export default Chats