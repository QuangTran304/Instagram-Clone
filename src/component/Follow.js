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

const Follow = () => {
    const [users, setUsers] = useState([]);
    let btnRef = useRef()

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
        </div>
    )
}

export default Follow;