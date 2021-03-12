import React from "react";
import { useState, useEffect } from "react";
import firebase from "firebase";
import { database } from "../firebase/firebase";
import "../index.css";
import CreatePost from "./CreatePost";

const Comment = ({ postId, username }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (postId) {
      database
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();
    database
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({
        text: comment,
        username: username,
        timestamp: firebase.firestore.FieldValue.serverTimestamp.orderBy(
          "timestamp",
          "desc"
        ),
      });
  };
  return (
    <div className="post_comments">
      {comments.map((comment) => (
        <p>
          <strong>{comment.username}</strong> {comment.text}
        </p>
      ))}
    </div>
  );
};
export default Comment;
