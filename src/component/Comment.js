import React from "react";
import { useState, useEffect } from "react";
import firebase from "firebase";
import { database } from "../firebase/firebase";
import "../index.css";

const Comment = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");


  useEffect(() => {
    if ( postId ) {
      database
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .orderBy("timestamp", "asc")
        .onSnapshot( snapshot => {
          setComments(snapshot.docs.map( doc => ({
            username: firebase.auth().currentUser.displayName,
            comment: doc.data()
          }) ));
        });
    }
  }, [postId]);

  // const postComment = (e) => {
  //   e.preventDefault();
  //   database
  //     .collection("posts")
  //     .doc(postId)
  //     .collection("comments")
  //     .add({
  //       comment: comment,
  //       timestamp: firebase.firestore.FieldValue.serverTimestamp.orderBy(
  //         "timestamp",
  //         "desc"
  //       ),
  //     });
  // };

  return (
// comments.map( ( { username, comment } ) => (
      <div className="post"> 
        <div className="post-comment">
        <strong> {firebase.auth().currentUser.displayName} </strong> { comment }
        </div>
        {/* <div className="add_comments">
         <form>
           <input
            className="input"
            type="text"            
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></input>
        </form>
      </div> */}
    </div>

    // )) 
  );
};

export default Comment;