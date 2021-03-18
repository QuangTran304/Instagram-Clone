import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import React, {useContext} from 'react';
import CreatePost from "./component/CreatePost";
import Post from "./component/Post";
import Navbar from './component/Navbar'
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import Follow from "./component/Follow"
import {firebaseAuth} from "./provider/AuthProvider"
import firebase from "firebase"
import ScrollToTop from './component/ScrollToTop';

function App() {
  const {token} = useContext(firebaseAuth)
  return (
    <ScrollToTop>
    <Router>
      <ScrollToTop>
      <Switch>
        <Route exact path="/" render={ rProps => token === null ? <SignIn /> : [<Navbar />, <CreatePost />,<Follow />, <Post />]}/>
        <Route exact path="/signin">
          {rProps => token === null ? <Redirect to='/' /> : [<Navbar />, <CreatePost />, <Post />]}
        </Route>
        <Route exact path="/signup" component={SignUp} />
      </Switch>
      </ ScrollToTop>
    </Router>
    </ScrollToTop>
  );
}

export default App;