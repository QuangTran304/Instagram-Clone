import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import React, {useContext} from 'react';
import CreatePost from "./component/CreatePost";
import Post from "./component/Post";
import Navbar from './component/Navbar'
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import Follow from "./component/Follow";
import PopUp from "./component/PopUp";
import {firebaseAuth} from "./provider/AuthProvider"
import firebase from "firebase"

function App() {
  const {token} = useContext(firebaseAuth)

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={ rProps => token === null ? <SignIn /> : [<Navbar />, <PopUp />,<Follow />, <Post />]}/>
        <Route exact path="/signin">
          {rProps => token === null ? <Redirect to='/' /> : [<Navbar />, <PopUp />, <Post />]}
        </Route>
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;