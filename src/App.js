import logo from "./Instagrill.png";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CreatePost from "./CreatePost";
import Post from "./Post";


function App() {
  
  return (
    <div className="app">

      {/* We should make this Nav bar a Component */}
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
            <AccountCircleIcon className="icon-item" />
          </div>
        </div>
      </div>
      {/* We should make this Nav bar a Component */}


      <CreatePost />

      <Post />

    </div>
  );
}

export default App;
