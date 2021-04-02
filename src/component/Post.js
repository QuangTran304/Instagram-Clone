import React, { useState, useEffect } from "react";
import "../index.css";
import Avatar from "@material-ui/core/Avatar";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import { database } from "../firebase/firebase";
import Comment from "./Comment";
import Like from "./Like";
import PopUpLike from "./PopUpLike"

const Post = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    database
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data()
          }))
        )
      });
    // eslint-disable-next-line
  }, []);

  return posts.map(({ id, post }) => (
    <div className="post" key={id}>
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
          <ChatBubbleOutlineOutlinedIcon
            style={{ marginRight: 8, width: 20, cursor: "pointer" }}
          />
          {post.comments}
        </div>
        
        <p className="post-like-number"> Liked by {post.likes} 
          <PopUpLike id = {id} />
        </p>


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