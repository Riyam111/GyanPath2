import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AllStudents from './pages/AllStudent';

import Navbar from './components/Navbar';
import Register from './pages/Register';
import { useAuth } from "./context/AuthContext";
import PaymentSuccess from './pages/PaymentSuccess';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
function App() {
  const { token } = useAuth();
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/all-students" element={token ? <AllStudents /> : <Navigate to="/" />} />
       
        <Route path="/PaymentSuccess" element={<PaymentSuccess/>} />
      </Routes>
       <ToastContainer position="top-center" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
