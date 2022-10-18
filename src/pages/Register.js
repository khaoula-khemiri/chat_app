import { React, useState } from 'react';
import addImage from "../image/addImage.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate()


  const handelSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    console.log(displayName)

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snape) => console.log("received update"),

        (error) => {
          setErr(true);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL,
          });
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });
          await setDoc(doc(db, "userChats", res.user.uid), {
          });


        });
      navigate("/")

    } catch (err) {
      setErr(true)
      console.log(err);
    }
  }
  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'> Chat App</span>
        <span className='title'> Register</span>
        <form onSubmit={handelSubmit}>
          <input type="text" placeholder='display name' />
          <input type="email" placeholder='email' />
          <input type="password" placeholder='password' />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor='file'>
            <img src={addImage} />
            <span>Add an avatar</span>
          </label>
          <button> Sign up</button>
          {err && <span>Simething went wrong....</span>}
        </form>
        <p>You do have an account?  <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default Register;
