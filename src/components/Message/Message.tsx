import './Message.scss';

const Message = (msg: { message: string }) => {
  return (
    <div className="message owner">
      <div className="message_info">
        <img
          src="https://m.media-amazon.com/images/S/pv-target-images/16627900db04b76fae3b64266ca161511422059cd24062fb5d900971003a0b70.jpg"
          alt=""
        />
        <span>Just now</span>
      </div>
      <div className="message_content">
        <p>Hello</p>
        <img
          src="https://m.media-amazon.com/images/S/pv-target-images/16627900db04b76fae3b64266ca161511422059cd24062fb5d900971003a0b70.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Message;
