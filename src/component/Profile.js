import React, {useContext , useEffect, useState} from 'react'
import "../index.css";
import { database } from '../firebase/firebase';
import firebase from 'firebase'
import "../index.css"
import Button from '@material-ui/core/Button';



const Profile = () => {  
  const [allUsers, setAllUsers] = useState([]);
  const  user = firebase.auth().currentUser;
  const [posts, setPosts] = useState([]);


  // useEffect(() => {
  //   database
  //     .collection("users")
  //     .onSnapshot((snapshot) => {
  //       setAllUsers(
  //         snapshot.docs.map((doc) => ({
  //           allUsers: doc.data(),
  //         }))
  //       );
  //     });
  // }, []); 


  return (
    <>

    <div className="profile-userInfo">
      <div className="profile-userName" style={{ marginTop: '100px'}}>
        <h2>{user.displayName}'s Profile</h2>
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