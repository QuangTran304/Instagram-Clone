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
      }, []);

    return (
    <>
        <span onClick={handleOpen}> people </span>
        <Modal open={open} onClose={handleClose}>
            <div>
                {liked.map(({username}) => (
                    <div>
                        {username}
                    </div>
                ))}
            </div>
        </Modal>
    </>
    )
}

export default PopUpLike;