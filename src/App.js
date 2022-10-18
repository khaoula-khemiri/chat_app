import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style.scss";
import {
  BrowserRouter as Router, Routes,Route,Navigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
function App() {
  const {currentUser}=useContext(AuthContext);
  const ProtectedRoute =({children})=>{
    if(!currentUser){
      return <Navigate to ="login"/>
    }
  }
  
  return (
    <Router>
    <Routes path="/" >
      <Route index  element={currentUser?<Home />:<Login />} />
      <Route  path="/login" element={<Login />} />
      <Route  path="/register" element={<Register />} />
    </Routes>
  </Router>
  );
}

export default App;
