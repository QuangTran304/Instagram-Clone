import React, { useState, useEffect } from "react";
import firebase from 'firebase'
import { database } from "../firebase/firebase";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const Like = ({ id }) => {
    const increment = firebase.firestore.FieldValue.increment(1);
    const decrement = firebase.firestore.FieldValue.increment(-1);
    const [likes, setLikes] = useState([]);
    const [liked, setLiked] = useState(false);
    const post = database.collection("posts").doc(id);

    useEffect(() => {
        if (id) {
            database
                .collection('posts')
                .doc(id)
                .collection('likes')
                .orderBy("timestamp", "asc")
                .onSnapshot(snapshot => {
                    setLikes(snapshot.docs.map(doc => ({
                        username: doc.data().username,
                        timestamp: doc.data().timestamp
                    }
                    )))
                })
        }
    }, [id])

    useEffect(() => {
        if (!liked) {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    for (var i = 0; i < likes.length; i++) {
                        if (likes[i].username === firebase.auth().currentUser.displayName) {
                            setLiked(true)
                        }
                    }
                } else {
                    // No user is signed in.
                }
            })
        }
    }, [likes, liked])

    const handleLikeClick = (id) => {
        if (liked) {
            database.collection("posts").doc(id).collection('likes').doc(firebase.auth().currentUser.displayName).delete();
        }
        else {
            database.collection('posts').doc(id).collection('likes').doc(firebase.auth().currentUser.displayName).set({
                username: firebase.auth().currentUser.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        }
        post.update({ likes: likes.length })
    };

    return (
        <div>
            <FavoriteBorder
                onClick={() => handleLikeClick(id)}
                style={{ marginRight: 8, width: 20 }}
            />
        </div>
    )
}

export default Like;