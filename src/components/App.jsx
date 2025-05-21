import { Route, Routes } from "react-router";
//import { useState } from "react";
import { Header } from "./Header";
import { NavBar } from "./NavBar";
import { HomePage } from "./HomePage";
import { ArticleCard } from "./ArticleCard";

export const App = (article_id) => {
  return (
    <>
      <Header />
      <NavBar />
      <main>
        <Routes>
          <Route path="/articles/:topic?" element={<HomePage />}></Route>
          <Route path="/articles/:article_id" element={<ArticleCard article_id={article_id} />}></Route>
        </Routes>
      </main>
    </>
  );
};
