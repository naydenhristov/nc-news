import { Link } from "react-router";
import image from "../images/open-newspaper.png";

export const Header = () => {
  return (
    <header>
      <span>
        <Link to="/articles">
          <img src={image} alt="Newspaper Image" />
        </Link>
        <h1>NC News</h1>
      </span>
      <span>
        <h3>Sign In / Sign Up</h3>
        <form action="submit">
          <input type="text" />
          <button value="search">Search</button>
        </form>
      </span>
    </header>
  );
};
