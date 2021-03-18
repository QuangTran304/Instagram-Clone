import React from "react";
import "../index.css";
import { useState } from "react";
import firebase from "firebase";
import { database, storage } from '../firebase/firebase';
import { Button, TextField } from "@material-ui/core";



const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");


  const handleImage = (e) => {
    if(e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  const handleSubmit = () => {
    const uploadedContent = storage.ref(`${firebase.auth().currentUser.displayName}/${image.name}`).put(image);

    uploadedContent.on(
      "state_changed",

      (snapshot) => {
        // uploading progress bar
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },

      (error) => {
        alert(error.message);
      },

      () => {
        storage
          .ref(`${firebase.auth().currentUser.displayName}`)
          .child(image.name)
          .getDownloadURL()
          .then( url => {
            database.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              username: firebase.auth().currentUser.displayName,
              image: url,     // This is just the image URL reference from the storage
              description: description,
              location: location
            });

            // // Reset the form to blank
            // setProgress(0);
            // setDescription("");
            // setLocation("");
            // setImage(null);
          });
      }
    )
  };


  return (

    <div className="post-upload-container">
      <form className="post-upload-form" noValidate autoComplete="off">
        <h1 className="post-form-title">New Post</h1>
        <TextField
          type="text"
          label="Location"
          placeholder="Montreal, QC"
          variant="outlined"
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          label="What's on your mind?"
          placeholder="Post Description"
          multiline
          rows={4}
          variant="outlined"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input 
          type="file" 
          className="post-upload-image" 
          onChange={handleImage} 
        />

        <Button color="secondary" onClick={handleSubmit}>Post</Button>
        
        <progress value={progress} max="100"> hello</progress>
      </form>
    </div>

  );
};

export default CreatePost;