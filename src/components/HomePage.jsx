import { useEffect, useState } from "react";
import { getArticles } from "../api";
import { useParams } from "react-router";
import { Link } from "react-router";

export const HomePage = () => {
  const [articles, setArticles] = useState([]); //List of articles
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const topic = useParams().topic;

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
    }, []);

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
                <Link to={`/article/${article.article_id}`}>
                  <p>
                    {
                      <img
                        className="small-image"
                        alt="Article image"
                        src={article.article_img_url}
                      />
                    }
                    <span className="black-text">
                      {article.title} / {article.topic.toUpperCase()}
                    </span>
                  </p>
                </Link>
              </article>
            );
          } else if (topic === article.topic) {
            return (
              <article key={article.article_id}>
                <Link to={`/article/${article.article_id}`}>
                  <p>
                    {
                      <img
                        className="small-image"
                        alt="Article image"
                        src={article.article_img_url}
                      />
                    }
                    <span className="black-text">{article.title}</span>
                  </p>
                </Link>
              </article>
            );
          } else return;
        }
      })}
    </section>
  );
};
