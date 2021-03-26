import React, { useEffect, useState } from 'react'
import "../index.css";
import { database } from '../firebase/firebase';
import firebase from 'firebase'
import "../index.css"
import Button from '@material-ui/core/Button';



const Profile = () => {  
  const  user = firebase.auth().currentUser;
  const [allUsers, setAllUsers] = useState();
  const [posts , setPosts] = useState();

  // useEffect(() => {
  //   database
  //     .collection("users")
  //     .onSnapshot((snapshot) => {
  //       setAllUsers(
  //         snapshot.docs.map((doc) => ({
  //           allUsers: doc.data()
  //         }))
  //       );
  //     });
  // }, []); 


  useEffect(() => {
    database
      .collection("users")
      .doc(user.displayName)
      .onSnapshot((snapshot) => {
        console.log("id = " + snapshot.id);
        console.log("username = " + snapshot.data().username);
        // setAllUsers(
        //   snapshot.docs.map((doc) => ({
        //     allUsers: doc.data()
        //   }))
        // );
      });
  }, []); 

  // return posts.map( (allUsers) => (
  return (
  <>
    <div className="profile-userInfo">
      <div className="profile-avatar">
          <img src="https://source.unsplash.com/random/250x250" alt="Profile Avatar"/>
      </div>

      <div className="profile-userMeta">
        <div className="profile-userName">
          <h2>{user.displayName}'s Profile</h2>
          {!user.displayName && <Button variant="contained" style={{marginLeft: '20px'}}>Follow</Button>}
        </div>
      
        <div className="profile-stats-box">
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
  );
};

export default Profile;