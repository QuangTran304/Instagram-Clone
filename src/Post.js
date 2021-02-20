import React from "react";
import "./index.css";
import Avatar from "@material-ui/core/Avatar";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import data from './data/database.json';

const Post = () => {
  return (
    data.posts.map( (post) => (
      <div className="post">
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
            <FavoriteBorder style={{marginRight: 8, width: 20}} />
            <ChatBubbleOutlineOutlinedIcon style={{marginRight: 8, width: 20}} />
          </div>

          <p className="post-like-number"> Liked by {post.likes} people</p>

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
