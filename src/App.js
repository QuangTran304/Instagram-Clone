import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreatePost from "./CreatePost";
import Post from "./Post";
import Navbar from "./Navbar";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function App() {

  return (
    <Router>
      <div className="app">
        <Navbar />
      </div>
      <div className="content">
        <Switch>
          <Route exact path="/">
            <CreatePost />
            <Post />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
