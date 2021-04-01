import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import React, {useContext} from 'react';
import Post from "./component/Post";
import Navbar from './component/Navbar'
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import Profile from "./component/Profile";
import Follow from "./component/Follow";
import PopUp from "./component/PopUpPostButton";
import {firebaseAuth} from "./provider/AuthProvider"



function App() {
  const {token} = useContext(firebaseAuth)

  return (
    <Router>
      <Switch>

        <Route exact path="/" 
          render={ rProps => token === null ? 
          <SignIn key={6}/> : 
          [<Navbar key={1}/>, <PopUp key={2}/>,<Follow key={3}/>, <Post key={4}/>]}
        />
        
        <Route exact path="/signin"
          render={rProps => token === null ? 
          <Redirect to='/' /> : 
          [<Navbar key={1}/>, <PopUp key={2}/>, <Post key={4}/>]}
        />
        
        <Route exact path="/signup" component={SignUp} />

        <Route exact path="/profile/:username" 
          component={Profile}
        />
        
      </Switch>
    </Router>
  );
}

export default App;