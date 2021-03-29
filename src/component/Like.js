import React, { useState, useEffect } from "react";
import firebase from 'firebase'
import { database } from "../firebase/firebase";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from '@material-ui/icons/Favorite';

const Like = ({ id }) => {
    const increment = firebase.firestore.FieldValue.increment(1);
    const decrement = firebase.firestore.FieldValue.increment(-1);
    const [likes, setLikes] = useState([]);
    const [liked, setLiked] = useState(false);

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // eslint-disable-next-line
            likes.map(({ username }) => {
                if (username === firebase.auth().currentUser.displayName) {
                    setLiked(true)
                }
            })
        }
    })

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                if (id) {
                    database
                        .collection('posts')
                        .doc(id)
                        .collection('likes')
                        .orderBy("timestamp", "asc")
                        .onSnapshot((snapshot) => {
                            setLikes(snapshot.docs.map(doc => ({
                                username: doc.data().username,
                                timestamp: doc.data().timestamp,
                            })));
                        })
                }
            } else {
            }
        });
        // eslint-disable-next-line
    }, [])

    const handleLikeClick = (id) => {
        const post = database.collection("posts").doc(id);
        if (liked) {
            database.collection("posts").doc(id).collection('likes').doc(firebase.auth().currentUser.displayName).delete().then(() => {
                post.update({ likes: decrement })
                setLiked(false)
            }).catch((error) => {
                console.error("Error removing user: ", error);
            })
        }
        else {
            database.collection('posts').doc(id).collection('likes').doc(firebase.auth().currentUser.displayName).set({
                username: firebase.auth().currentUser.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            post.update({ likes: increment })
            setLiked(true)
        }
    };

    return (
        <div>
            {liked ? <FavoriteIcon
                onClick={() => handleLikeClick(id)}
                color="secondary"
                style={{ marginRight: 8, width: 20 }}
            />
                :
                <FavoriteBorder
                    onClick={() => handleLikeClick(id)}
                    style={{ marginRight: 8, width: 20}}
                />
            }
        </div>
    )
}

export default Like;