import React from "react";
import { useState, useEffect } from "react";
import firebase from "firebase";
import { database } from "../firebase/firebase";
import "../index.css";

const Comment = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (postId) {
      database
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .orderBy("timestamp", "asc")
        .onSnapshot(snapshot => {
          setComments(snapshot.docs.map(doc => ({
            username: doc.data().username,
            comment: doc.data().comment
          })));
        });
    }
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();
    database.collection("posts").doc(postId).collection("comments").add({
      comment: comment,
      username: firebase.auth().currentUser.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };


  return (
    <div>
      {comments.map(({ username, comment }) => (
        <div className="post">
          <div class="comment">
            <p> {username}  {comment} </p>
          </div>
        </div>
      ))
      }

      <form className="post_commentBox">
        <input
          className="post_input"
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="post_button"
          disabled={!comment}
          type="submit"
          onClick={postComment}
        >
          Post
          </button>
      </form>
    </div>
  )
};

export default Comment;