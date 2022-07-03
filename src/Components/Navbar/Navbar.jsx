import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Signin from "../Authentication/Signin";
import Logout from "../Authentication/Logout";
import { useAuth } from "../../context/AuthContext";

function Navbar(props) {
  const [checked, setChecked] = useState(true);
  const { currentUser } = useAuth();

  const handleChange = (e) => {
    props.toggleTheme();
    setChecked(e.target.checked);
  };

  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className="navbar">
        <div className="navlogo">
        <Link className="item-links" to="/" >
        <h1 className="logo">Health Bridge</h1>
            </Link>
        </div>

        <ul className={`${showMenu ? "navlinks active" : "navlinks"}`}>
          
          <li className="navitems">
            <Link className="item-links" to="/home" onClick={() => setShowMenu(!showMenu)}>
              Home
            </Link>
          </li>

          <li className="navitems">
            <Link className="item-links" to="/daily" onClick={() => setShowMenu(!showMenu)}>
              Daily
            </Link>
          </li>

          <li className="navitems">
            <Link className="item-links" to="/fhir" onClick={() => setShowMenu(!showMenu)}>
              FHIR
            </Link>
          </li>


            {currentUser ? (
              <>
               <li className="navitems">
                <Link className="item-links displayname">
                  {currentUser.displayName}
                  <img
                    className="navprofileimg"
                    src={currentUser.photoURL}
                    alt=""
                  ></img>
                </Link>
                </li>
                <li className="navitem">
                <Logout />
                </li>
              </>
            ) : (
              <li className="navitems">
              <Signin />
              </li>
            )}
          
        </ul>
      </div>
    </>
  );
}

export default Navbar;

