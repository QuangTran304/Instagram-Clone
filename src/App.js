import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreatePost from "./CreatePost";
import Post from "./Post";
import Navbar from "./Navbar";
import SignIn from "./SignIn"



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
          <Route exact path="/login">
            <SignIn />
          </Route>
        </Switch>
      </div>

    </Router>

  );
}

export default App;
