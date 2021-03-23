import React, {useContext , useState} from 'react'
import "../index.css";
import { firebaseAuth } from '../provider/AuthProvider'
import logo from "../Instagrill.png";
import { database } from '../firebase/firebase';
import Navbar from './Navbar'
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import firebase from 'firebase'
import "../index.css"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { spacing } from '@material-ui/system';


const Profile = ( {username} ) => {  
  const  user = firebase.auth().currentUser;
  const [posts, setPosts] = useState([]);

  // const [followButton, setFollowButton] = useState("Follow"); 

  // const changeText = (text) => setFollowButton(text);

  // const handleLikeClick = ( {username} ) => {
  //     /*var post = database.collection("posts").doc(id);*/
      
  // };

  // var ExampleComponent = React.createClass({
  //     getInitialState : function(){
  //       return ({isClicked : false})    
  //     },
  //     handleClick : function(){
  //       this.setState({isClicked : !this.state.isClicked});
  //     },
  //     render: function() {
  //       var someElementClass = this.state.isClicked ? 'clicked' : '';
  //       return(<div className="container">
  //                  <div id="someElement" className={someElementClass}>
  //                     I'm an element
  //                  </div>
  //                  <button id="someButton" onClick={this.handleClick}>
  //                     Click me!
  //                  </button>  
  //                </div> );
  //     } 
  //   });
  //   ReactDOM.render(<ExampleComponent />,document.getElementById('content'));
  
  return (
    <>
    {/* <Navbar /> */}

    {/* <div className="content">
        <div class="profile">
        <AccountCircleOutlined />
        {<h3>{ user.displayName }</h3>}
        <h3> { username } </h3>
        <button class="follow" id="followUnfollow" onClick={handleFollow}>{"Follow"}</button>
        </div>
    </div> */}


    {/* {(followButton === "Follow") ? <button style={{backgroundColor: 'lightBlue'}} onClick={() => changeText("Unfollow")}>{followButton}</button> : <button style={{backgroundColor: 'red'}} onClick={() => changeText("Follow")}>{followButton}</button>
    } */}




    <div className="profile-userInfo">
      <div className="profile-userName" style={{ marginTop: '100px'}}>
        <h2>Nash's Profile</h2>
      </div>

      <div className="profile-userMeta">
        <div className="profile-avatar">
          <img src="https://source.unsplash.com/random/250x250" alt="Profile Avatar"/>
        </div>
        <div className="profile-stats">
          <h4>1,020 <br /> Posts</h4>
        </div>
        <div className="profile-stats">
          <h4>3,000 <br /> Followers</h4>
        </div>
        <div className="profile-stats">
          <h4>900 <br /> Following</h4>
        </div>
      </div>
      
      <div className="profile-followArea">
        <Button variant="contained" style={{marginRight: '20px'}}>Follow</Button>
        <Button variant="contained" color="primary">Message</Button>
      </div>
    </div>


    <div className="profile-userPosts">
      <img src="https://source.unsplash.com/random/" alt=""/>
      <img src="https://source.unsplash.com/random/" alt=""/>
      <img src="https://source.unsplash.com/random/" alt=""/>
      <img src="https://source.unsplash.com/random/" alt=""/>
      <img src="https://source.unsplash.com/random/" alt=""/>
      <img src="https://source.unsplash.com/random/" alt=""/>
    </div>

    </>
    )
}

export default Profile;