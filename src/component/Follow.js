import React from "react"
import { useState, useEffect } from "react"
import firebase from "firebase"
import { database } from "../firebase/firebase"
import Button from '@material-ui/core/Button'
import "../index.css"
import UnFollow from "./Unfollow"
import "../index.css";

const Follow = () => {
    const [users, setUsers] = useState([]);

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

    return (
        <div>
            <div className="post">
                <div className="post-body">
                    <p className="user-username"> Users to Follow: </p>
                    <h4 className="user-description">
                        {users.map(({ user }) => (
                            <div>
                                <div>
                                    {user !== firebase.auth().currentUser.displayName &&
                                        <div>
                                            {user} <Button onClick={() => followUser(user)}> Follow </Button>
                                        </div>}
                                </div>
                            </div>
                        )
                        )}
                    </h4>
                    <p className="user-username"> Users you are following: </p>
                    <h4 className="user-description">
                        <UnFollow />
                    </h4>
                </div>
            </div>
        </div>
    )
}

export default Follow;


//TO implement next sprint -> this is for removing users that are already being followed. 
// useEffect(() =>
    //         firebase.auth().onAuthStateChanged(function (user) {
    //             if (user) {
    //                 users.map(({ user }) => (
    //                     database.collection('users').doc(firebase.auth().currentUser.displayName).collection('following').doc(user).get().then((doc) => {
    //                         if (doc.exists) {
    //                             setFollowed(true)
    //                         }
    //                         else {
    //                             setFollowed(false)
    //                         }
    //                     }),
    //                     console.log(user + " " + followed)
    //                 ))   
    //             } else {
    //                 // No user is signed in.
    //             }
    //         }
    //         )
    // )
