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

const UnFollow = () => {
    const [following, setFollowing] = useState([]);
    const [follower, setFollower] = useState([]);
    const [users, setUsers] = useState([]);
    var currentId= "";

    useEffect(() => {
        database
            .collection('users')
            .onSnapshot(snapshot => {
                setUsers(
                    snapshot.docs.map(doc => ({
                        user: doc.data().username
                    })));
            })

    }, [])

    useEffect(() => {
            if(currentId){
                database
                .collection('users')
                .doc(currentId)
                .collection('following')
                .onSnapshot(snapshot => {
                    setFollowing(
                        snapshot.docs.map(doc => ({
                            username: doc.data().username
                        })));
                })
            }
            
    }, [currentId])

    // useEffect(() => {
    //         if(currentId){
    //             database
    //             .collection('users')
    //             .doc(currentId)
    //             .collection('following')
    //             .onSnapshot(snapshot => {
    //                 setFollowing(
    //                     snapshot.docs.map(doc => ({
    //                         username: doc.data().username
    //                     })));
    //             })
    //         }
    // }, [currentId])

    function findUser() {
        users.map(({user }) => {
            if (user === firebase.auth().currentUser.displayName) {
                currentId = firebase.auth().currentUser.displayName;
                console.log(user)
            }
        })
     }
    
    const unFollowUser = (username) => {
        database.collection('users').doc(firebase.auth().currentUser.displayName).collection('following').doc(username).delete().then(() => {
            console.log("User successfully deleted from the following guy!");
        }).catch((error) => {
            console.error("Error removing user: ", error);
        });

        database.collection('users').doc(username).collection('follower').doc(firebase.auth().currentUser.displayName).delete().then(() => {
            console.log("User successfully deleted from the follower guy!");
        }).catch((error) => {
            console.error("Error removing user: ", error);
        });
    }
    
    return (
        <div>
            {findUser()}
            {following.map(({ username }) => (
                <div>
                    {console.log(username + " should be username")}
                    {username} <Button onClick={ () => unFollowUser({username}) }>Unfollow</Button>
                </div>
            )
            )}
        </div>
    )
}

export default UnFollow;