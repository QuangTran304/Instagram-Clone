import React, { useEffect, useState } from "react";
import "./index.css";
import Avatar from "@material-ui/core/Avatar";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
// import data from './data/database.json';
import { database } from './firebase';

const Post = () => {
  const [likeCounter, setLikeCounter] = useState(0);

  const handleLikeClick = () => {
    setLikeCounter( (likeCounter) => {
      return likeCounter + 1;
    });
  }

  const [posts, setPosts] = useState([]);

  useEffect( () => {
    database.collection('posts').onSnapshot( updatedData => {
      setPosts( updatedData.docs.map( post => post.data() ));
    })
  }, []);

  return (
    // Reverse the posts (latest post first) from the database
    // data.posts.slice(0).reverse().map( (post) => (
    posts.map( post => (

      <div className="post" key={post.id}>
        <div className="post-header">
          <Avatar
            className="post-avatar"
            alt={post.username}
            src="/static/images/avatar/1.jpg"
            style={{width: 35, height: 35}}
          ></Avatar>
          <div className="post-meta">
            <h3 className="post-username" >{post.username}</h3>
            <p className="post-location">{post.location}</p>
          </div>
        </div>

        <img className="post-image" src={post.image} alt="" />


        <div className="post-body">
          <div className="post-icons">
            <FavoriteBorder onClick={ handleLikeClick } style={{marginRight: 8, width: 20}} />
            <ChatBubbleOutlineOutlinedIcon style={{marginRight: 8, width: 20}} />
          </div>

          <p className="post-like-number"> Liked by {post.likes} people</p>
          {/* <p className="post-like-number"> Liked by {likeCounter} people</p> */}

          <h4 className="post-description">
            <strong>{post.username}</strong> {post.description}
          </h4>

          <h3 className="post-comment">View all comments.</h3>
        </div>
      </div>
    
    )) 
  );
};

export default Post;
