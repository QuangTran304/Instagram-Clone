import React, { useState, useEffect } from "react";
import "../index.css";
import Avatar from "@material-ui/core/Avatar";
import { database } from "../firebase/firebase";
import Comment from "./Comment";
import Like from "./Like";
import PopUpLike from "./PopUpLike";
import PostPopUp from "./PostPopUp";
import firebase from "firebase";
// import { Link, Redirect, useHistory as browserHistory} from 'react-router-dom'

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  let follow = false;
  let array = [];

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        database
          .collection("users")
          .doc(firebase.auth().currentUser.displayName)
          .collection("following")
          .onSnapshot((snapshot) => {
            setFollowing(
              snapshot.docs.map((doc) => ({
                username: doc.data().username,
              }))
            );
          });

        setFollowing(firebase.auth().currentUser.displayName)

        // array.push(firebase.auth().currentUser.displayName);
        following.map(({ username }) => {
          array.push(username);
          console.log(username);
        });
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {

        database
          .collection("users")
          .doc(firebase.auth().currentUser.displayName)
          .collection("following")
          .onSnapshot((snapshot) => {
            setFollowing(
              snapshot.docs.map((doc) => ({
                username: doc.data().username,
              }))
            );
          });

        setFollowing(firebase.auth().currentUser.displayName)

        // array.push(firebase.auth().currentUser.displayName);
        following.map(({ username }) => {
          array.push(username);
          console.log(username);
        });

        database
          .collection("posts")
          .orderBy("timestamp", "desc")
          .where("username", "in", array)
          .onSnapshot((snapshot) => {
            setPosts(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                post: doc.data(),
                username: doc.data().username
              }))
            );
          });
      }
    });
    // if (array.length !== 0) {
    //   database
    //     .collection("posts")
    //     .orderBy("timestamp", "desc")
    //     .where("username", "in", array)
    //     .onSnapshot((snapshot) => {
    //       setPosts(
    //         snapshot.docs.map((doc) => ({
    //           id: doc.id,
    //           post: doc.data()
    //         }))
    //       )
    //     });
    // } else {

    // }
    // eslint-disable-next-line
  }, []);

  // const handleClick = (postId, data) => {
  //   this.props.history.push({
  //     pathname: "/individualPost",
  //     state:{
  //       id: postId,
  //       post: data
  //     }
  //   })
  // }

  function isFollowed(user) {
    let follow = false;

    // eslint-disable-next-line
    following.map(({ username }) => {
      if (user === username) {
        follow = true;
      }
    })

    if (follow) {
      return true;
    }
    return false;
  }

  return (
    <>
      {posts.map(({ id, post, username }) => (
        <div className="post" key={id}>
          {isFollowed(username) &&
            <div>
              <div className="post-header">
                <Avatar
                  className="post-avatar"
                  alt={post.username}
                  src="/static/images/avatar/1.jpg"
                  style={{ width: 35, height: 35 }}
                ></Avatar>
                <div className="post-meta">
                  <h3 className="post-username">{post.username}</h3>
                  <p className="post-location">{post.location}</p>
                </div>
              </div>

              <img className="post-image" src={post.image} alt="" />

              <div className="post-body">
                <div className="post-icons">
                  <Like id={id} />
                  <PostPopUp id={id} post={post} />
                  <h5> {post.comments} </h5>
                </div>

                <p className="post-like-number">
                  {" "}
                Liked by {post.likes}
                  <PopUpLike id={id} />
                </p>

                <h4 className="post-description">
                  <strong>{post.username}</strong> {post.description}
                </h4>

                <h3 className="post-comment">Comments</h3>

                <Comment postId={id} all={false} />

                {/* <span onClick={() => handleClick({id, post})}> 
                  View all comments </span> */}
              </div>
            </div>
          }
        </div>
      ))}
    </>
  )
};

export default Post;
