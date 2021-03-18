import React, {useContext , useState} from 'react'
import "../index.css";
import { firebaseAuth } from '../provider/AuthProvider'
import logo from "../Instagrill.png";
import { database } from '../firebase/firebase';
import Navbar from './Navbar'
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import firebase from 'firebase'
import "../index.css"

const Profile = ( {username} ) => {  
    var user = firebase.auth().currentUser;

    const [followButton, setFollowButton] = useState("Follow"); 

    const changeText = (text) => setFollowButton(text);

    // const handleLikeClick = ( {username} ) => {
    //     /*var post = database.collection("posts").doc(id);*/
        
    // };

    // var ExampleComponent = React.createClass({
    //     getInitialState : function(){
    //       return ({isClicked : false})    
    //     },
    //     handleClick : function(){
    //       this.setState({isClicked : !this.state.isClicked});
    //     },
    //     render: function() {
    //       var someElementClass = this.state.isClicked ? 'clicked' : '';
    //       return(<div className="container">
    //                  <div id="someElement" className={someElementClass}>
    //                     I'm an element
    //                  </div>
    //                  <button id="someButton" onClick={this.handleClick}>
    //                     Click me!
    //                  </button>  
    //                </div> );
    //     } 
    //   });
    //   ReactDOM.render(<ExampleComponent />,document.getElementById('content'));
    
    return(
   <>
   <Navbar />
   
   {/* <div className="content">
       <div class="profile">
        <AccountCircleOutlined />
        {<h3>{ user.displayName }</h3>}
        <h3> { username } </h3>
        <button class="follow" id="followUnfollow" onClick={handleFollow}>{"Follow"}</button>
       </div>
    </div> */}



{(followButton === "Follow") ? <button style={{backgroundColor: 'lightBlue'}} onClick={() => changeText("Unfollow")}>{followButton}</button> : <button style={{backgroundColor: 'red'}} onClick={() => changeText("Follow")}>{followButton}</button>
}


    </>



    )
}
export default Profile;