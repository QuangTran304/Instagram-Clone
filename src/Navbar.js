import React from "react";
import logo from "./Instagrill.png";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <div className="nav-bar">
      <div className="nav-container">
        <div className="nav-logo-and-search">
          <div>
            <Link to="/"><img src={logo} className="app-logo" alt="logo" /></Link>
          </div>
          <div className="search-box">
            <input type="text" className="search" placeholder="Search..." />
          </div>
        </div>
        <div className="menu">
          <Link to="/"><HomeRoundedIcon className="icon-item" /></Link>
          <Link to="#Explore"><ExploreOutlinedIcon className="icon-item" /></Link>
          <Link to="#LikedPost"><FavoriteBorderRoundedIcon className="icon-item" /></Link>
          <Link to="/signin"><AccountCircleIcon className="icon-item" /></Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
