import React from "react";
import "./index.css";
import { useState } from "react";
import "./data/database.json";
import firebase from "firebase";
import { database, storage } from './firebase';

const CreatePost = () => {

    var Nickname = "Pseudo";
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    var picture;

    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleSubmit = () => {
        const uploadImage = storage.ref(`images/${image.name}`).put(image);

        uploadImage.on(
            "state_changed",
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then( url => {
                        database.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: description,
                            location: location,
                            imageUrl: url,
                            username: "someone"
                        });
                        setImage = null;
                        setDescription = "";
                        setLocation = "";
                    });
            }
        );
    };

    return (
        <div className="create">
        <h5 class="title"> Create a new Post ! </h5>
        <form>
        <table>
            <td>
                <tr><label> Write your description: </label></tr>
                <tr><textarea type="text" name="description" onfocus="this.value=''" value = { description } required onChange = { (e) => setDescription(e.target.value) }/></tr>
            </td>
            <td>
                <tr><label>Where are you ?</label></tr>
                <tr><input type="text" value={ location } required onChange = { (e) => setLocation(e.target.value)}/></tr>
            </td>
        </table>
        <br/>&nbsp;
        <label for = "file"> Select the image you want to share: </label><br/>&nbsp;
        <input type="file" id = "image" name="create-image" accept="image/png, image/jpeg, image/jpg" value={ image } required onChnage = { handleChange }/>
        <br /> <br />&nbsp;
        <button type="submit" onClick={ handleSubmit }> <h4>Post</h4> </button> 
        </form> <br/>
        <p><b> &nbsp; &nbsp; {Nickname}</b></p>
        <p class="location"> &nbsp; &nbsp; {location} </p> <br/>
        <p>{picture}</p><br/>
        <p> <b> &nbsp; &nbsp; {Nickname}</b> &nbsp; { description } </p>
        </div>
    );
};

export default CreatePost;