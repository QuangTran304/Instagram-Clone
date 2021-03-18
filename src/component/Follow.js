import React from "react"
import { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles'
import firebase from "firebase"
import { database } from "../firebase/firebase"
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import "../index.css"

const Follow = () => {
    const [follow, setFollow] = useState([]);
    const [users, setUsers] = useState([]);
    // const [newUsers, setNewUsers] = useState([]);
    var currentId = ""

    useEffect(() => {
        database
            .collection('users')
            .onSnapshot(snapshot => {
                setUsers(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        user: doc.data().username
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

    const followUser = ({ id, user }) => {
        database.collection('users').doc(id).update({
            follower: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.displayName)
        })
    }

    return (
        <div>
           {users.map(({id,user}) => (
               <div>
                   {user !== firebase.auth().currentUser.displayName && 
                   <div>
                       {user}
                   </div> }
               </div>
           ) 
           )}
        </div>
    )


}

export default Follow;