import logo from "./Instagrill.svg";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FaceRoundedIcon from "@material-ui/icons/FaceRounded";
import Post from "./Post";
import { useState } from 'react';


function App() {
  // Add dummy data here ==> Create an array of fake posts (with username, image url, and post_description)
  const [posts, setPosts] = useState();

  return (
    <div className="app">
      <div className="nav-bar">
        <div className="nav-container">
          <div>
            <img src={logo} className="app-logo" alt="logo" />
          </div>

          <div className="search-box">
            <input type="text" name="search" placeholder="Search..." />
          </div>

          <div className="menu">
            <HomeRoundedIcon className="icon-item" />
            <ExploreOutlinedIcon className="icon-item" />
            <FavoriteBorderRoundedIcon className="icon-item" />
            <FaceRoundedIcon className="icon-item" />
          </div>
        </div>
      </div>
      <Post />
    </div>
  );
}

export default App;
