// import React from "react";
// import "../index.css";
// import { useState } from "react";
// import firebase from "firebase";
// import { database } from "../firebase/firebase";
// import { Button, TextField } from "@material-ui/core";

// const CreatePost = (postId) => {
//   const [username, setUsername] = useState("");
//   const [comment, setComment] = useState("");

//   const handleSubmit = () => {
//     database.collection("posts").doc(postId).collection("comments").add({
//       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//       username: username,
//       comment: comment,
//     });
//   };

//   return comments.map(({ postId }) => (
//     <div className="comments" postId={id}>
//       <form>
//         <input
//           className="input"
//           type="text"
//           placeholder="Add comment"
//           value={comment}
//           onChange={(e) => setComments(e.target.value)}
//         ></input>
//       </form>
//     </div>
//   ));
// };


