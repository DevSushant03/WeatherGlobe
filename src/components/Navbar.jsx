import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FaBars, FaCity } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";

const Navbar = () => {
  const [active, setactive] = useState(false);

  return (
    <>
      <nav className="navbar-section f-row">
        <div className="navbar-buttons f-row j-between">
          <img
            className="logo"
            width="40px"
            src="/src/assets/logo.jpg"
            alt="logo"
          />
          <div className=" btn f-column j-evenly">
            <NavLink to="/">
              Home
            </NavLink>
            <NavLink to="/city">
              City
            </NavLink>
            <NavLink to="/map">
               Map
            </NavLink>
          </div>

          <div className="sideBarbtn" onClick={() => setactive(!active)}>
            <FaBars/>
          </div>

          {active && <div className="mob-nav f-column j-evenly">
            <NavLink onClick={() => setactive(!active)} to="/">
              <IoHome />
               Home
            </NavLink>
            <NavLink onClick={() => setactive(!active)} to="/city">
              <FaCity />
               City
            </NavLink>
            <NavLink onClick={() => setactive(!active)} to="/map">
              <FaMapLocationDot /> Map
            </NavLink>
            <div onClick={() => setactive(!active)}>
            <CgClose/>
          </div>
          </div>}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
