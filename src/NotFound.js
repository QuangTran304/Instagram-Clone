import { Link } from "react-router-dom";

const NotFound = () => {
  return (  
    <div className="not-found">
      <h1>404</h1>
      <p>The page your're looking for is not found.</p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
}
 
export default NotFound;