import React, {useContext} from "react";
import logo from "../Instagrill.png";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from "react-router-dom";
import {firebaseAuth} from '../provider/AuthProvider';

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

const Navbar = () => {
  const {handleSignout} = useContext(firebaseAuth)
  const {handleProfile} = useContext(firebaseAuth)

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
          <Link onClick={handleProfile} to="/profile"><AccountCircleIcon className="icon-item" /></Link>
          <Link to="#LikedPost"><FavoriteBorderRoundedIcon className="icon-item" /></Link>
          <Link onClick={handleSignout} to="#"><ExitToAppIcon className="icon-item" /></Link>
        
          <Popover>Logout</Popover>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
