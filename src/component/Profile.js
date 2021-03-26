import React, { useEffect, useState } from 'react'
import "../index.css";
import { database } from '../firebase/firebase';
import firebase from 'firebase'
import "../index.css"
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';


const Profile = () => {  
  const [follower, setFollower] = useState();
  const [following, setFollowing] = useState();
  const [postCount, setPostCount] = useState();
  const [userPosts, setUserPosts] = useState([]);
  const [open, setOpen] = useState(false);

  const [currentPost, setCurrentPost] = useState([]);

  const handleOpen = (post) => {
    setOpen(true);
    // setCurrentPost(post);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // function rand() {
  //   return Math.round(Math.random() * 20) - 10;
  // }

  // function getModalStyle() {
  //   const top = 50 + rand();
  //   const left = 50 + rand();
  
  //   return {
  //     top: `${top}%`,
  //     left: `${left}%`,
  //     transform: `translate(-${top}%, -${left}%)`,
  //   };
  // }
  // const [modalStyle] = useState(getModalStyle);

  useEffect(() => {
    database
      .collection("posts")
      .where("username", "==", firebase.auth().currentUser.displayName)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPostCount(
          snapshot.docs.length
        );
        setUserPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []); 

  useEffect(() => {
    database
      .collection("users")
      .doc(firebase.auth().currentUser.displayName)
      .collection("follower")
      .onSnapshot((snapshot) => {
        setFollower(
          snapshot.docs.length
        );
      });
  }, []); 

  useEffect(() => {
    database
      .collection("users")
      .doc(firebase.auth().currentUser.displayName)
      .collection("following")
      .onSnapshot((snapshot) => {
        setFollowing(
          snapshot.docs.length
        );
      });
  }, []); 



  return (
  <>
    <div className="profile-userInfo">
      <div className="profile-avatar">
          <img src="https://source.unsplash.com/random/250x250" alt="Profile Avatar"/>
      </div>

      <div className="profile-userMeta">
        <div className="profile-userName">
          <h2>{firebase.auth().currentUser.displayName}'s Profile</h2>
          <Button variant="contained" color="secondary" style={{marginLeft: '20px'}}>Follow</Button>
        </div>
      
        <div className="profile-stats-box">
          <div className="profile-stats">
            <h4>{postCount} <br /> Posts</h4>
          </div>
          <div className="profile-stats">
            <h4>{follower} <br /> Followers</h4>
          </div>
          <div className="profile-stats">
            <h4>{following} <br /> Following</h4>
          </div>
        </div>
      </div>
    </div>



    <div className="profile-userPosts">
    {
      userPosts.map( ({id, post}) => (
        <img src={post.image} alt={id} onClick={ () => handleOpen(post) }/>
      ))
    }

      <Modal open={open} onClose={handleClose} >
        {/* <img src={currentPost.image} alt="" /> */}
        <img src="https://source.unsplash.com/random/" style={{width: '80%'}} alt="" />
      </Modal>
    </div>

  </>
  );
};

export default Profile;