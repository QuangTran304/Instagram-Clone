import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import React, {useContext} from 'react';
import CreatePost from "./CreatePost";
import Post from "./Post";
import Navbar from './Navbar'
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import {firebaseAuth} from "./provider/AuthProvider"

function App() {
  const {token} = useContext(firebaseAuth)
  console.log(token + "this is token from App.js")

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {rProps => {
            if(token === null){
              return <SignIn />
            }else{
              return [<Navbar />, <CreatePost />, <Post />]
            }
          }}
        </Route>
        <Route exact path="/signin">
          {rProps => token === null ? <Redirect to='/' /> : [<Navbar />, <CreatePost />, <Post />]}
        </Route>
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;

// render={rProps => token === null ? <SignIn /> : [<Navbar />, <CreatePost />, <Post />]}