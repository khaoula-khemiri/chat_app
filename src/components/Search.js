import { React, useState, useEffect } from 'react';
import man from "../image/man.jpg";
import { collection, query, where, getDoc, setDoc, updateDoc, serverTimestamp, doc, getDocs } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);


  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setUser(doc.data())

      });

    } catch (err) {
      setErr(true);
      console.log(err);
    }
  };


  const handlekey = (e) => {
    e.code === "Enter" && handleSearch();
  }

  const handelSelect = async () => {
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
    try {
      console.log("in side try");
      const res = await getDoc(doc(db, "chats", combinedId))
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] })

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        })
      }
    } catch (err) { }
    
    setUser(null);
    setUsername("")
  }

  return (
    <div className='search'>
      <div className='searchForm'>
        <input type="text" placeholder='find a user' 
        onKeyDown={handlekey} 
        onChange={e => setUsername(e.target.value)}
        value={username} />
      </div>
      {err && <span>user not found</span>}
      {user && <div className='userChat' onClick={handelSelect}>
        <img src={user.photoURL} />
        <div className='userChatInfo'>
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  );
}

export default Search;
