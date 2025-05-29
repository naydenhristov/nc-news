import { Route, Routes, useParams } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";
import { HomePage } from "./HomePage";
import { ArticleCard } from "./ArticleCard";
import { UserContext, UserProvider } from "../contexts/User";
import { LoginForm } from "./LoginForm";
import { useContext, useState } from "react";

export const App = () => {
  const { loggedInUser, setLoggedInUser } = useState("");
  return (
    <>
      <Header />
      <NavBar />
      <main>
          <Routes>
            <Route path="/articles/:topic?" element={<HomePage />}></Route>
            <Route
              path="/article/:article_id"
              element={<ArticleCard />}
            ></Route>
            <Route path="/login" element={<LoginForm />}></Route>
          </Routes>
      </main>
      <Footer />
    </>
  );
};
