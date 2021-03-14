import React, {useContext} from 'react'
import "../index.css";
import { firebaseAuth } from '../provider/AuthProvider'
import logo from "../Instagrill.png";
import { database } from '../firebase/firebase';
import Navbar from './Navbar'
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import firebase from 'firebase'

const Profile = () => {  
    var user = firebase.auth().currentUser;
    return(
   <>
   <Navbar />
   
   <div className="content">
       <div>
      <AccountCircleOutlined/>
      {<h3>{user.email}</h3>}   
       </div>

   </div>
   </>
    )
}
export default Profile;