import logo from "./Instagrill.svg";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FaceRoundedIcon from "@material-ui/icons/FaceRounded";
import Post from "./Post";


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
      <Post
        username="Coco"
        caption="HI peopleeeee!!!"
        imageURL="https://media-exp1.licdn.com/dms/image/C4D03AQHzHDd6Gsaqow/profile-displayphoto-shrink_400_400/0/1588275209970?e=1618444800&v=beta&t=ACxMAOtr6JzysXozvis6A4t9D_-RiYI-AUHEBJ72GKg"
      />
    </div>
  );
}

export default App;
