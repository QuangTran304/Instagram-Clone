import React from "react";
import { useState, useEffect } from "react";
import firebase from "firebase";
import { database } from "../firebase/firebase";
import Button from "@material-ui/core/Button";
import "../index.css";
import { useRef } from "react";
import UnFollow from "./Unfollow";
import "../index.css";
import { Link } from "react-router-dom";



const Follow = () => {
  const [users, setUsers] = useState([]);
  let btnRef = useRef();

  useEffect(() => {
    database.collection("users").onSnapshot((snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          user: doc.data().username,
        }))
      );
    });
  }, []);

  const followUser = (user) => {
    if (btnRef.current) {
      btnRef.current.setAttribute("disabled", "disabled");
    }
    database
      .collection("users")
      .doc(user)
      .collection("follower")
      .doc(firebase.auth().currentUser.displayName)
      .set({
        username: firebase.auth().currentUser.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    database
      .collection("users")
      .doc(firebase.auth().currentUser.displayName)
      .collection("following")
      .doc(user)
      .set({
        username: user,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };



  return (

    <div className="follow-wrapContainer">
        <h4 className="follow-hoverButton">
          Explore
        </h4>

      <div className="follow-container">
        
        <div className="follow-userContainer">
          <h3 className="follow-groupTitle"> People you may know: </h3>
          {users.map(({ user }) => (
            <div>
              {user !== firebase.auth().currentUser.displayName && (
                <div className="follow-userLine">
                  <div className="follow-userName">
                    <Link to={`/${user}`} style={{ textDecoration: 'none', color: 'gray' }}> {user} </Link>
                  </div>
                  <Button  variant="contained" color="primary" ref={btnRef} onClick={() => followUser(user)}>
                    Follow
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      
        <div>
          <h3 className="follow-groupTitle"> Following: </h3>
          <UnFollow />
        </div>
      </div>
    </div>
  );
};

export default Follow;