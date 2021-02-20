     import React from "react";
     import logo from "./Instagrill.png";
     import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
     import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
     import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
     import AccountCircleIcon from '@material-ui/icons/AccountCircle';

     const Navbar = () => {
         return(
    <div className="nav-bar">
        <div className="nav-container">
            <div>
                   <a href="#Home"><img src={logo} className="app-logo" alt="logo" /></a>  
            </div>
        <div className="search-box">
            <input type="text" name="search" placeholder="Search..." />
        </div>

        <div className="menu">
          <a href="/"><HomeRoundedIcon className="icon-item" /></a>
          <a href="#Explore"><ExploreOutlinedIcon className="icon-item" /></a>
          <a href="#Likes"><FavoriteBorderRoundedIcon className="icon-item" /></a>
          <a href="/signin"><AccountCircleIcon className="icon-item" /></a>
        </div>
      </div>
    </div>
         )
     }

     export default Navbar;
     