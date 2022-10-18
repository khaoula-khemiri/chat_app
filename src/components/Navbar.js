import React from 'react';
import man from "../image/man.jpg"
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const Navbar = () => {
  const {currentUser}=useContext(AuthContext);
 
  return (
    <div className='navbar'>
      <span className='logo'>Chat App</span>
      <div className='user'>
          <img src={currentUser.photoURL} />
          <span>{currentUser.displayName}</span>
          <button onClick={()=>signOut(auth)}>Log out </button>
      </div>
    </div>
  );
}

export default Navbar;
