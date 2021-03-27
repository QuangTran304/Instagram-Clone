import React, { useEffect, useState } from 'react'
import "../index.css";
import { database, auth } from '../firebase/firebase';
import firebase from 'firebase'
import "../index.css"
import Button from '@material-ui/core/Button';
// import Modal from '@material-ui/core/Modal';
// import { Link } from 'react-router-dom';
// import { Avatar } from '@material-ui/core';
// import Comment from './Comment';
// import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
// import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";



const Profile = () => {
  const [user, setUser] = useState(auth.currentUser);  
  const [follower, setFollower] = useState();
  const [following, setFollowing] = useState();
  const [postCount, setPostCount] = useState();
  const [userPosts, setUserPosts] = useState([]);

  // These are for the <Modal />
  const [postObj, setPostObj] = useState([]);
  const [open, setOpen] = useState(false);
  const increment = firebase.firestore.FieldValue.increment(1);

  const handleOpen = (clicked) => {
    setOpen(clicked);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLikeClick = ( id ) => {
    const post = database.collection("posts").doc(id);
    post.update({ likes: increment });
  };

  const handleImageClick = (postObj, clicked) => {
    handleOpen(clicked);
    setPostObj(postObj);

    console.log("\n\n[Post ImageURL]: " + postObj.post.image);  // TESTING ONLY
    console.log("[Post id]: " + postObj.id);                    // TESTING ONLY
    console.log("[Is button clicked]: " + clicked);             // TESTING ONLY
  }

  // Get user posts & id on page load
  useEffect(() => {
    database
      .collection("posts")
      .where("username", "==", user.displayName)
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

  // Get # of follower on page load
  useEffect(() => {
    database
      .collection("users")
      .doc(user.displayName)
      .collection("follower")
      .onSnapshot((snapshot) => {
        setFollower(
          snapshot.docs.length
        );
      });
  }, []); 

  // Get # of following on page load
  useEffect(() => {
    database
      .collection("users")
      .doc(user.displayName)
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
          <h2>{user.displayName}'s Profile</h2>
          {!user  &&  <Button variant="contained" color="secondary" style={{marginLeft: '20px'}}>Follow</Button>}
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
    { // Loop through each image user have posted, onClick == show that post
      userPosts.map( ({id, post}) => (
        <img src={post.image} alt="" onClick={() => handleImageClick( {id, post}, true)}/>
      ))
    }
    </div>



    {/* <Modal open={open} onClose={handleClose}>
      <div className="profile-postModal">
        <div className="post" key={ postObj.id }>
          <div className="post-header">
            <Link to={{ pathname: '/profile' }} style={{ textDecoration: 'none' }}>
            <Avatar
              className="post-avatar"
              alt={postObj.post.username}
              src="/static/images/avatar/1.jpg"
              style={{ width: 35, height: 35 }}
            ></Avatar>
            </Link>
            <div className="post-meta">
              <h3 className="post-username">{postObj.post.username}</h3>
              <p className="post-location">{postObj.post.location}</p>
            </div>
          </div>
          <img className="post-image" src={postObj.post.image} alt="" />

          <div className="post-body">
            <div className="post-icons">
              <FavoriteBorder
                onClick={() => handleLikeClick(postObj.id)}
                style={{ marginRight: 8, width: 20 }}
              />
              <ChatBubbleOutlineOutlinedIcon
                style={{ marginRight: 8, width: 20 }}
              />
            </div>

            <p className="post-like-number"> Liked by { postObj.post.likes } people</p>

            <h4 className="post-description">
              <strong>{ postObj.post.username }</strong> { postObj.post.description }
            </h4>

            <h3 className="post-comment">Comments</h3>

            <Comment postId={ postObj.id } />
          </div>
        </div>

      </div>
    </Modal> */}
  </>
  );
};

export default Profile;