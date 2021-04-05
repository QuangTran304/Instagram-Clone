import React from "react"
import { useState, useEffect } from "react"
import firebase from "firebase"
import { database } from "../firebase/firebase"
import Button from '@material-ui/core/Button'
import "../index.css";

const Follow = () => {
    const [users, setUsers] = useState([]);
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        database
            .collection('users')
            .onSnapshot(snapshot => {
                setUsers(
                    snapshot.docs.map(doc => ({
                        user: doc.data().username
                    })));
            })
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                database
                    .collection('users')
                    .doc(firebase.auth().currentUser.displayName)
                    .collection('following')
                    .onSnapshot(snapshot => {
                        setFollowing(
                            snapshot.docs.map(doc => ({
                                username: doc.data().username
                            })));
                    })

            } else {
                // No user is signed in.
            }
        });
        // eslint-disable-next-line
    }, [])

    function isFollowed(user) {
        let follow = false;

        // eslint-disable-next-line
        following.map(({ username }) => {
            if (user === username) {
                follow = true;
            }
        })

        if (follow) {
            return true;
        }
        return false;
    }

    const followUser = (user) => {
        database.collection('users').doc(user).collection('follower').doc(firebase.auth().currentUser.displayName).set({
            username: firebase.auth().currentUser.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        database.collection('users').doc(firebase.auth().currentUser.displayName).collection('following').doc(user).set({
            username: user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
    }

    const unFollowUser = (username) => {
        database.collection('users').doc(firebase.auth().currentUser.displayName).collection('following').doc(username).delete().then(() => {
            console.log("User successfully deleted from the following guy!");
        }).catch((error) => {
            console.error("Error removing user: ", error);
        });

        database.collection('users').doc(username).collection('follower').doc(firebase.auth().currentUser.displayName).delete().then(() => {
        }).catch((error) => {
            console.error("Error removing user: ", error);
        });
    }

    return (
        <div className="follow-users">
                <div className="follow-body">
                    <p className="user-username"> Users: </p>
                    <h4 className="user-description">
                        {users.map(({ user }) => (
                                <div>
                                    {user !== firebase.auth().currentUser.displayName &&
                                        <div>
                                            {user}
                                            {isFollowed(user) ?
                                                <Button className="follow-button" onClick={() => unFollowUser(user)}>Unfollow</Button>
                                                :
                                                <Button onClick={() => followUser(user)} className="follow-button"> Follow </Button>
                                            }
                                        </div>
                                    }
                                </div>
                        )
                        )}
                    </h4>
                </div>
        </div>
    )
}

export default Follow;


//TO implement next sprint -> this is for removing users that are already being followed. 

