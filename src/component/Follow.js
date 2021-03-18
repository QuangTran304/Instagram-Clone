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
    const [follow, setFollow] = useState([]);
    const [users, setUsers] = useState([]);
    // const [newUsers, setNewUsers] = useState([]);
    var currentId = ""
    let btnRef = useRef()

    useEffect(() => {
        database
            .collection('users')
            .onSnapshot(snapshot => {
                setUsers(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        user: doc.data().username,
                        following: doc.data().following
                    })));
            })

    }, [])

    function findUser() {
        users.map(({ id, user }) => {
            if (user === firebase.auth().currentUser.displayName) {
                currentId = id;
            }
        })
    }
    console.log(currentId)

    const followUser = (id, user) => {
        if (btnRef.current) {
            btnRef.current.setAttribute("disabled", "disabled");
        }
        database.collection('users').doc(id).update({
            follower: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.displayName)
        })
        database.collection('users').doc(currentId).update({
            following: firebase.firestore.FieldValue.arrayUnion(user)
        })
    }

    return (
        <div>
            {findUser()}
            {users.map(({ id, user }) => (
                <div>
                    <div>
                        {user !== firebase.auth().currentUser.displayName &&
                            <div>
                                {user} <Button ref={btnRef} onClick={() => followUser(id, user)}> Follow </Button>
                            </div>}
                    </div>
                </div>
            )
            )}
            {users.map(({user, following}) => (
                <div>
                {
                    user === firebase.auth().currentUser.displayName &&
                    <div>
                        {following}
                    </div>
                }
            </div>
            )
            )}
        </div>
    )
}

export default Follow;