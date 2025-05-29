import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { getUsers } from "../api.js";
import { HomePage } from "./HomePage.jsx";

export const LoginForm = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userNameInput, setUserNameInput] = useState("");
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  function handleInput(event) {
    setUserNameInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(false);

    if (userNameInput) {
      getUsers()
        .then((userList) => {
          console.log(userList, "<---userList");

          let loggedUser = "";
          for (let i = 0; i < userList.length; i++) {
            if (userList[i].username === userNameInput) {
              loggedUser = userNameInput;
              break;
            }
          }
          setLoggedInUser(loggedUser);
          setLoading(false);
          setUserNameInput("");
        })
        .catch(() => {
          setLoading(false);
          setError(true);
          setUserNameInput("");
        });
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Sorry, something went wrong in Logging Form!</p>;

  return (
    <div>
      {loggedInUser === "" ? (
        <form onSubmit={(event) => handleSubmit(event)}>
          <p>Enter your username:</p>
          <input
            type="text"
            name="user-input"
            onChange={(e) => handleInput(e)}
          />
          <input type="submit" id="login-input" />
        </form>
      ) : (
        <HomePage />
      )}
    </div>
  );
};
