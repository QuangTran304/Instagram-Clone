import React from "react";
import "./index.css";
import { useState } from "react";
import "./data/database.json";
import firebase from "firebase";
import { database } from './firebase';
import { Button, TextField } from "@material-ui/core";



const CreatePost = () => {
    const [username, setUsername] = useState("");
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");

    const handleSubmit = () => {
        database.collection("posts").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            username: username,
            image: image,
            description: description,
            location: location
        })
    };


    return (

    <div className="postUploadContainer">
        <form className="postUploadForm" noValidate autoComplete="off">
            <h1 className="postFormTitle">New Post</h1>
            <TextField
                type="text"
                label="Username"
                placeholder="Your Username"
                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                type="text"
                label="Location"
                placeholder="Montreal, QC"
                variant="outlined"
                onChange={(e) => setLocation(e.target.value)}
            />
            <TextField
                type="text"
                label="Image"
                placeholder="Image URL"
                variant="outlined"
                onChange={(e) => setImage(e.target.value)}
            />
            <TextField
                label="What's on your mind?"
                placeholder="Post Description"
                multiline
                rows={4}
                variant="outlined"
                onChange={(e) => setDescription(e.target.value)}
            />
            <Button color="secondary" onClick={handleSubmit}>Post</Button>
        </form>
    </div>

    );
};

export default CreatePost;