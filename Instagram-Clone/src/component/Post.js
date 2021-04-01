import React, { useState, useEffect } from "react";
import "../index.css";
import Avatar from "@material-ui/core/Avatar";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import { database } from "../firebase/firebase";
import Comment from "./Comment";
import firebase from 'firebase'
import { Link } from "react-router-dom";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const increment = firebase.firestore.FieldValue.increment(1);

  const handleLikeClick = ( id ) => {
    var post = database.collection("posts").doc(id);
    post.update({ likes: increment });
  };

  useEffect(() => {
    database
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
            
          }))
        );
      });
  }, []); 

  console.log(posts, "posts");
  return posts.map(({ id, post }) => (
    <div className="post" key={ id }>
      <div className="post-header">
        <Link >
        <Avatar
          className="post-avatar"
          alt={post.username}
          src="/static/images/avatar/1.jpg"
          style={{ width: 35, height: 35 }}
        ></Avatar>
        </Link>
        <div className="post-meta">
          <h3 className="post-username">{post.username}</h3>
          <p className="post-location">{post.location}</p>
        </div>
      </div>
      <img className="post-image" src={post.image} alt="" />

      <div className="post-body">
        <div className="post-icons">
          <FavoriteBorder
            onClick={() => handleLikeClick( id )}
            style={{ marginRight: 8, width: 20 }}
          />
          <ChatBubbleOutlineOutlinedIcon
            style={{ marginRight: 8, width: 20 }}
          />
        </div>

        <p className="post-like-number"> Liked by { post.likes } people</p>

        <h4 className="post-description">
          <Link  to={{ pathname: `/profile/${post.username}`, state: {username: post.username } }} style={{ textDecoration: 'none' }}><strong>{post.username}</strong> {post.description}</Link>
        </h4>

        <h3 className="post-comment">Comments</h3>

        <Comment postId={id} />
      </div>
    </div>
  ));
};

export default Post;