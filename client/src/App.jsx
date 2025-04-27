import Home from "./pages/home/Home";
import SignIn from "./pages/signin/Signin";
import SignUp from "./pages/signup/SignUp"; 
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from "./context/AuthContext";

export default function App() {
  const { authUser } = useAuthContext()
  return (
    <>
      <Routes>
        <Route path="/" element={authUser ? <Home/> : <Navigate to='/login' /> } />
        <Route path="/login" element={authUser ? <Navigate to='/' /> : <SignIn />} />
        <Route path="/signup" element={authUser ? <Navigate to='/' /> : <SignUp />} /> 
      </Routes>
      <Toaster /> 
    </>
  )
}