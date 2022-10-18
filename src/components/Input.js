import { React, useState, useContext } from 'react';
import attach from "../image/attached.png"
import image from "../image/addImageG.png"
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { doc, updateDoc, arrayUnion, Timestamp, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage';

const Input = () => {
  const [text, setText] = useState();
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handelSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on('state_changed',
        (snape) => console.log("received update"),

        (error) => {
          //setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log(downloadURL)
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion(
                {
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL
                })
            });

          })
        }
      )
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion(
          {
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now()
          }
        )
      });
    }
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId + ".date"]: serverTimestamp()
    })

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId + ".date"]: serverTimestamp()
    })


    setImg(null);
    setText("");
  }

  const handlekey = (e) => {
    e.code === "Enter" && handelSend();
  }
 
  return (
    <div className='input'>
      <input type="text" placeholder='Type somthing....'
        onKeyDown={handlekey}
        onChange={(e) => setText(e.target.value)}
        
         />
      <div className='send'>
        <img src={attach} />
        <input type="file" style={{ display: "none" }} id="file"
          onChange={(e) => setImg(e.target.files[0])} />
        <label htmlFor="file">
          <img src={image} />
        </label>
        <button onClick={handelSend}>Send</button>
      </div>

    </div>
  );
}

export default Input;
