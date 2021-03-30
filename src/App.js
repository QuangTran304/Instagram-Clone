import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import React, {useContext} from 'react';
import CreatePost from "./component/CreatePost";
import Post from "./component/Post";
import Navbar from './component/Navbar'
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import Profile from "./component/Profile";
import {firebaseAuth} from "./provider/AuthProvider"

function App() {
  const {token} = useContext(firebaseAuth)
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => token === null ? <SignIn /> : [<Navbar />, <CreatePost />, <Post />]}/>
        <Route exact path="/signin">
          {() => token === null ? <Redirect to='/' /> : [<Navbar />, <CreatePost />, <Post />]}
        </Route>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/profile" render={() => token === null ? <Redirect to='/' /> : [<Navbar />, <Profile />]}/>
        
        
      </Switch>
    </Router>
  );
}

export default App;