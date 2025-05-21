//import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getArticleById } from "../api";

export const ArticleCard = (article_id) => {
  const [article, setArticle] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const art_id = article_id.article_id;
  console.log(art_id, "<---article_id");

  useEffect(() => {
    setLoading(true);
    getArticleById(art_id)
      .then((article) => {
        console.log(article, "<---article");
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
    <article>
      <p>
        {<img alt="Article image" src={article.article_img_url} />}{article.title} &#8594;{article.topic}
      </p>
    </article>
  );
};
