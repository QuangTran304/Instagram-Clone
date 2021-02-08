import logo from './Instagrill.svg';

function App() {
  return (
    <div className="app">

      <div className="navBar">
        <li><img src={logo} className="App-logo" alt="logo" /></li>
      </div>

      <div className="post">
        <div className="post-head">
          <h1>Post head: Username & profile picture</h1>
        </div>


        <div className="post-image">
          <img src="https://images.pexels.com/photos/4041098/pexels-photo-4041098.jpeg" alt=""/>
        </div>


        <div className="post-description">
          <p>
            This is a dummy post description, feel free to edit/ delete it. This is a dummy post description, feel free to edit/ delete it.
          </p>
        </div>
      </div>

    </div>
  );
}

export default App;
