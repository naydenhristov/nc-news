import { Link } from "react-router";

export const NavBar = () => {
  return (
    <nav>
      <span>
        <Link to="/articles/coding">Coding</Link>
      </span>
      <span>
        <Link to="/articles/football">Football</Link>
      </span>
      <span>
        <Link to="/articles/cooking">Cooking</Link>
      </span>
    </nav>
  );
};