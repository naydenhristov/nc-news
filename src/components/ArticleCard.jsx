import { useEffect, useState } from "react";
import { getArticleById } from "../api";
import { useParams } from "react-router";

export const ArticleCard = () => {
  const [article, setArticle] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const article_id = useParams().article_id;

  useEffect(() => {
    setLoading(true);
    getArticleById(article_id)
      .then((article) => {
        console.log(article, "<---article in ArticleCard");
        setArticle(article);
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Sorry, something went wrong!</p>;

  return (
    <section>
      <h2>{article.title}</h2>
      <div className="info-line"></div>
      <p>
        {<img className="big-image" alt="Article image" src={article.article_img_url} />}
      </p>
    </section>
  );
};
