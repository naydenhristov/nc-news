import { Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import image from "../images/open-newspaper.png";
import { HomePage } from "./HomePage";

export const Header = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  console.log(loggedInUser, "<---loggedInUser");

  function handleLogout() {
    setLoggedInUser("");
  }

  return (
    <header>
      <span>
        <Link to="/articles">
          <img src={image} alt="Newspaper Image" />
        </Link>
        <h1>NC News</h1>
      </span>
      <span>
        {loggedInUser === "" ? (
          <Link to="/login">
            <button className="h5">Log in</button>
          </Link>
        ) : (
          <h5 className="h5">
            Logged in as {loggedInUser}{" "}
            <Link to="/articles">
              <button onClick={handleLogout}>Log out</button>
            </Link>
          </h5>
        )}

        <form action="submit">
          <input type="text" />
          <button value="search">Search</button>
        </form>
      </span>
    </header>
  );
};
