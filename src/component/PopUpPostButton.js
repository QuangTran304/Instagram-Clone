import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CreatePost from "./CreatePost.js";
import "../index.css";


const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        backgroundColor: '#000000',
        border: '0px',
        padding: theme.spacing(0, 0),
        boxShadow: 'theme.shadows[5]',
        textAlign: 'center',
  },
    button:{
        marginLeft: '35%',
        marginRight: '35%',
        width: '30%',
        maxWidth: '500px',
        padding: theme.spacing(2),
        marginTop: theme.spacing(14),
        marginBottom: theme.spacing(5),
        display: "flex",
        justifyContent: "center",
        background: "white",
        border: "1px solid #fdcfde",
        borderRadius: "25px",
        boxShadow: "0 0 12px 0 rgba(0, 0, 0, 0.103)",
        fontWeight: "bold",
        cursor: "pointer",
  },
}));


export default function PopUp() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <button type="button" onClick={handleOpen} className={classes.button}>
        New Post
      </button>

      <Modal open={open} onClose={handleClose} >
        <CreatePost/>
      </Modal>
    </div>
  );
}