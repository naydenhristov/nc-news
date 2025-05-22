import { Route, Routes, useParams } from "react-router";
//import { useState } from "react";
import { Header } from "./Header";
import { NavBar } from "./NavBar";
import { HomePage } from "./HomePage";
import { ArticleCard } from "./ArticleCard";

export const App = () => {
  
  return (
    <>
      <Header />
      <NavBar />
      <main>
        <Routes>
          <Route path="/articles/:topic?" element={<HomePage />}></Route>
          <Route path="/article/:article_id" element={<ArticleCard />}></Route>
        </Routes>
      </main>
    </>
  );
};
