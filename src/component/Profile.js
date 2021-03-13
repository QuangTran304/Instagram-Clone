import React, {useContext} from 'react'
import "../index.css";
import { firebaseAuth } from '../provider/AuthProvider'
import logo from "../Instagrill.png";
import { database } from '../firebase/firebase';
import Navbar from './Navbar'

const Profile = () => {
    return(
   <>
   {<h3>PROFILE PAGE</h3>}
   </>
    )
}
export default Profile;