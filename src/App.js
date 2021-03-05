import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import React, {useContext} from 'react';
import CreatePost from "./CreatePost";
import Post from "./Post";
import Navbar from './Navbar'
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import {firebaseAuth} from "./provider/AuthProvider";
import PopUp from "./PopUp";

function App() {
  const {token} = useContext(firebaseAuth)
  console.log(token)

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={rProps => token === null ? <SignIn /> : [<Navbar />, <PopUp/>, <Post /> ]} />
        <Route exact path="/signin" component={SignIn}>
          {rProps => token === null ? <Redirect to='/' /> : [<Navbar />, <PopUp/>, <Post />]}
        </Route>
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
