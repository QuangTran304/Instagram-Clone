import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CreatePost from "./CreatePost.js";
import "./index.css";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        padding: theme.spacing(7, 15),
        boxShadow: theme.shadows[5],
        textAlign: 'center',
  },
    button:{
        marginLeft: '30%',
        marginRight: '30%',
        width: '40%',
        padding: theme.spacing(2),
        marginTop: theme.spacing(20),
        display: "flex",
        flexDirection: "column",
        background: "white",
        border: "1px solid #fdcfde",
        borderRadius: "3px",
        boxShadow: "0 0 12px 0 rgba(0, 0, 0, 0.103)",
  },
}));

export default function PopUp() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <p id="simple-modal-description">
      <CreatePost/>
      </p>
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen} className={classes.button}>
        Create a Post !
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}