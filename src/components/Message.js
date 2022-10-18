import { React, useContext, useRef, useEffect } from 'react';
import man from "../image/man.jpg";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }, [message]);


  console.log(message.date.toString());
  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className='messageInfo'>
        <img src={
          message.senderId === currentUser.uid
            ? currentUser.photoURL
            : data.user.photoURL
        } />
        <span></span>
      </div>

      <div className='messageContent'>
        <p>{message.text}</p>
        {message.img && <img src={message.img} />}
      </div>


    </div>
  );
}

export default Message;
