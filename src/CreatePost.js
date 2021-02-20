import React from "react";
import "./index.css";
import { useState } from "react";


const CreatePost = () => {

    var Nickname = "pseudo";
    const [description, setDescription] = useState("");
    return (
        <div className="create">
        <h4 class="title"> Create a new Post ! </h4>
        <form>
        <label> Write your description: </label><br />
        <textarea class="caca" type="text" name="description" onfocus="this.value=''" value = { description } required onChange = { (e) => setDescription(e.target.value) }/>
        <br/>
        <label for = "file"> Select the image you want to share: </label>
        <input type="file" id = "image" name="create-image" accept="image/png, image/jpeg, image/jpg" required />
        <br /> < br />
        <button type="submit" > Post </button> 
        </form>
        <p><br/> { description } </p>
        <p> </p>
        </div>
    );
};

export default CreatePost;