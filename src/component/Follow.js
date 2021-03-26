import React from "react"
import { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles'
import firebase from "firebase"
import { database } from "../firebase/firebase"
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import "../index.css"
import { useRef } from 'react'
import { Brightness1Rounded } from "@material-ui/icons"
import UnFollow from "./Unfollow"
import "../index.css";
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
}));

const Follow = () => {
    const [users, setUsers] = useState([]);
    // const [followed, setFollowed] = useState(false);
    let btnRef = useRef()
    const classes = useStyles();

    useEffect(() => {
        database
            .collection('users')
            .onSnapshot(snapshot => {
                setUsers(
                    snapshot.docs.map(doc => ({
                        user: doc.data().username
                    })));
            })

    }, [users])

    const followUser = (user) => {
        if (btnRef.current) {
            btnRef.current.setAttribute("disabled", "disabled");
        }
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
                                            {user} <Button ref={btnRef} onClick={() => followUser(user)}> Follow </Button>
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
