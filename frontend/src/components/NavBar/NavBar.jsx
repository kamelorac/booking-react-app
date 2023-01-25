import React from "react";
import { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () =>{
    console.log('===');
    logoutUser();
  }

  return (
    <div className="navbar">
      <span class="color_11">WOLFMAN ENTERTAINMENT</span>
      <div>
        <font face="Open Sans">
          <span class="color_11">And Karaoke</span>
        </font>
      </div>
      <ul>
        <NavLink to="/">HOME</NavLink>
        <NavLink to="/events">EVENTS</NavLink>
        <NavLink to="/contact">CONTACT</NavLink>
        <NavLink to="/inquiry">INQUIRY</NavLink>
        <NavLink to="/payments">PAYMENTS</NavLink>
      </ul>
      <div className="logo">
        <img
          src="https://www.katiejoyce.com/x/cdn/?https://storage.googleapis.com/wzukusers/user-500000/images/jJrmUzl1NUG8Jpm-g26wQQ.jpg"
          alt=""
        />
      </div>
      {!user&&<button style={{position:"absolute", top:10,right:15}} onClick={logout}>Log out !</button>}
    </div>
  );
};

export default Navbar;
