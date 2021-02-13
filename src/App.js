import logo from './Instagrill.svg';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import { useEffect, useState } from 'react';
import { database } from './firebase';


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
          <input type="text" name="search" placeholder="Search..."/>
        </div>

        <div className="menu">
          <HomeRoundedIcon className="icon-item" />
          <ExploreOutlinedIcon className="icon-item" />
          <FavoriteBorderRoundedIcon className="icon-item" />
          <FaceRoundedIcon className="icon-item" />
        </div>
        </div>
      </div>

      <div className="post">
        <div className="post-head">
          <h1>Post head: Username & profile picture</h1>
        </div>

        <div className="post-image">
          <img src="https://images.pexels.com/photos/4041098/pexels-photo-4041098.jpeg" alt=""/>
        </div>

        <div className="post-description">
          <p>
            This is a dummy post description, feel free to edit/ delete it. This is a dummy post description, feel free to edit/ delete it.
          </p>
        </div>
      </div>


    </div>
  );
}

export default App;
