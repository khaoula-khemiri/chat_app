import { React, useState } from 'react';
import addImage from "../image/addImage.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      
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
        <span className='title'> Login</span>
        <form onSubmit={handelSubmit}>
          <input type="email" placeholder='email' />
          <input type="password" placeholder='password' />
          <button> Sign in</button>
          {err && <span>Simething went wrong....</span>}
        </form>
        <p>You don't have an account?  <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}

export default Login;
