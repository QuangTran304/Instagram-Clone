import React from "react";
import { useState, useEffect } from "react";
import firebase from "firebase";
import { database } from "../firebase/firebase";
import Button from "@material-ui/core/Button";
import "../index.css";
import { Link } from "react-router-dom";

const UnFollow = () => {
  const [following, setFollowing] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    database.collection("users").onSnapshot((snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          user: doc.data().username,
        }))
      );
    });
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        database
          .collection("users")
          .doc(firebase.auth().currentUser.displayName)
          .collection("following")
          .onSnapshot((snapshot) => {
            setFollowing(
              snapshot.docs.map((doc) => ({
                username: doc.data().username,
              }))
            );
          });
      } else {
        // No user is signed in.
      }
    });
  }, []);

  const unFollowUser = (username) => {
    database
      .collection("users")
      .doc(firebase.auth().currentUser.displayName)
      .collection("following")
      .doc(username)
      .delete()
      .then(() => {
        console.log("User successfully deleted from the following guy!");
      })
      .catch((error) => {
        console.error("Error removing user: ", error);
      });

    database
      .collection("users")
      .doc(username)
      .collection("follower")
      .doc(firebase.auth().currentUser.displayName)
      .delete()
      .then(() => {
        console.log("User successfully deleted from the follower guy!");
      })
      .catch((error) => {
        console.error("Error removing user: ", error);
      });
  };



  return (
    <div>
      {following.map(({ username }) => (
        <div className="follow-userLine">
          <div className="follow-userName"> 
            <Link to={`/${username}`} style={{ textDecoration: 'none', color: 'gray' }}> {username} </Link>
          </div>
          <Button variant="contained" color="secondary" onClick={() => unFollowUser(username)}> 
            Unfollow 
          </Button>
        </div>
      ))}
    </div>
  );
};

export default UnFollow;
