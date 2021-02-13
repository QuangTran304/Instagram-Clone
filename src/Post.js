import React from "react";
import "./index.css";
import Avatar from "@material-ui/core/Avatar";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";

const Post = ({ username, caption, imageURL }) => {
  return (
    <div className="post">
      <div className="post-header">
        <Avatar
          className="post-avatar"
          alt={username}
          src="/static/images/avatar/1.jpg"
        ></Avatar>
        <h3>{username}</h3>
      </div>
      <img className="post-image" src={imageURL} alt="" />
      <div className="post-icons">
        <FavoriteBorder className="post-heart" />
        <ChatBubbleOutlineOutlinedIcon />
      </div>
      <p className="post-like-number"> Liked by 10, 000, 000 people</p>

      <h4 className="post-text">
        <strong>{username}</strong> {caption}
      </h4>

      <h3 className="post-comment">View all comments.</h3>
    </div>
  );
};

export default Post;
