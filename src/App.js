import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, {useContext} from 'react';
import CreatePost from "./CreatePost";
import Post from "./Post";
import Navbar from './Navbar'
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import {firebaseAuth} from "./provider/AuthProvider"

function App() {
  const {token} = useContext(firebaseAuth)
  console.log(token)

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={rProps => token === null ? <SignIn /> : [<Navbar />, <CreatePost />, <Post />]} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;