import { Route, Routes, useParams } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
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
      <Footer />
    </>
  );
};
