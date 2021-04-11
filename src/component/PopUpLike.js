import React, { useState, useEffect } from "react";
import Modal from '@material-ui/core/Modal';
import { database } from "../firebase/firebase";

const PopUpLike = ({id}) => {
    const[open, setOpen] = useState(false);
    const [liked, setLiked] = useState([]);

    
    const handleOpen = () => {
        if (liked.length !== 0) {
            setOpen(true);
        }
    }

    const handleClose = () => {
        setOpen(false);
      };

    useEffect(() => {
        database
          .collection("posts")
          .doc(id)
          .collection('likes')
          .orderBy('timestamp', 'asc')
          .onSnapshot((snapshot) => {
              setLiked(
                snapshot.docs.map((doc) => ({
                  username: doc.data().username,
                }))
              )
          })
          // eslint-disable-next-line
      }, []);

    return (
    <>
        <span className="like-people" onClick={handleOpen}> people </span>
        <Modal open={open} onClose={handleClose}>
            <div className="like-popup">
                {liked.map(({username}) => (
                    <div>
                        <h4 className="popup-like-username">{username}</h4>
                    </div>
                ))}
            </div>
        </Modal>
    </>
    )
}

export default PopUpLike;