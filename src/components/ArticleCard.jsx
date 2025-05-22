import { useEffect, useState } from "react";
import { getArticleById } from "../api";
import { useParams } from "react-router";
import icon from "../assets/Thumb-up.png"

export const ArticleCard = () => {
  const [article, setArticle] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const article_id = useParams().article_id;

  useEffect(() => {
    setLoading(true);
    getArticleById(article_id)
      .then((article) => {
        setArticle(article);
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Sorry, something went wrong!</p>;

  const date = new Date(article.created_at).toDateString();

  return (
    <section>
      <h2>{article.title}</h2>
      <p>Author: {article.author}</p>
      <div className="info-line">
        <span>{date}</span>|<span>{article.topic}</span>|
        <span>Comments: ??</span>
      </div>
      <p>
        {
          <img
            className="big-image"
            alt="Article image"
            src={article.article_img_url}
          />
        }
      </p>
      <p>
        {article.body}
      </p>
      <div className="info-line">
        <img
            className="icon"
            alt="Thumb-up icon"
            src={icon}
          />
        <span className="votes">Votes: {article.votes}</span>
      </div>
    </section>
  );
};
