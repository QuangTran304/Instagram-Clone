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

  return posts.map(({ id, post }) => (
    <div className="post" key={ id }>
      <div className="post-header">
        <Avatar
          className="post-avatar"
          alt={post.username}
          src="/static/images/avatar/1.jpg"
          style={{ width: 35, height: 35 }}
        ></Avatar>
        
        <div className="post-meta">
          <Link to={`/${post.username}`} style={{ textDecoration: 'none', color: 'black' }}>
            <h3 className="post-username">{post.username}</h3>
          </Link>
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
          <strong>{post.username}</strong> {post.description}
        </h4>

        <h3 className="post-comment">Comments</h3>

        <Comment postId={id} />
      </div>
    </div>
  ));
};

export default Post;