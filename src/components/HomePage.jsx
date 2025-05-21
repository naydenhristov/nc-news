import { useEffect, useState } from "react";
import { getArticles } from "../api";
import { useParams } from "react-router";
// import { Link } from "react-router";
// import { ArticleCard } from "./ArticleCard";

export const HomePage = () => {
  const [articles, setArticles] = useState([]); //List of articles
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const topicName = useParams();
  const topic = topicName.topic;

  useEffect(() => {
    setLoading(true);
    getArticles(topic)
      .then((articles) => {
        setArticles(articles);
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [topic]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Sorry, something went wrong!</p>;

  return (
    <section>
      {topic ? (
        <div className="topic-div">
          <h2>{topic.toUpperCase()}</h2>
        </div>
      ) : (
        ""
      )}
      {articles.map((article) => {
        {
          if (!topic) {
            return (
              <article key={article.article_id}>
                <p>
                  {<img alt="Article image" src={article.article_img_url} />}
                  <span>
                    {article.title} / {article.topic.toUpperCase()}
                  </span>
                </p>
              </article>
            );
          } else if (topic === article.topic) {
            return (
              <article key={article.article_id}>
                <p>
                  {<img alt="Article image" src={article.article_img_url} />}
                  <span>{article.title}</span>
                </p>
              </article>
            );
          } else return;
        }
      })}
    </section>
  );
};
