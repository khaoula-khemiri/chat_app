import {React,useContext} from 'react';
import camera from "../image/camera.png"
import addFriend from "../image/addFriend.png"
import plus from "../image/plus.png"
import Messages from './Messages';
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";


const Chat = () => {

  const { data} = useContext(ChatContext);
  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>{data.user?.displayName}</span>
        <div className='chatIcons'>
          <img src={camera} />
          <img src={addFriend} />
          <img src={plus} />
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
}

export default Chat;
