import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const navigate = useNavigate();

 
 return (
    <nav className="bg-green-500 shadow sticky top-0 ">
      hii
    </nav>
  );
};

export default Navbar;
