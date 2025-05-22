import { useEffect, useState } from "react";
import { getArticleById, getCommentsByArticleId } from "../api";
import { useParams } from "react-router";
import icon from "../assets/Thumb-up.png";

export const ArticleCard = () => {
  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const article_id = useParams().article_id;

  useEffect(() => {
    setLoading(true);
    getArticleById(article_id)
      .then((article) => {
        setArticle(article);
        getCommentsByArticleId(article_id)
          .then((commentsList) => {
            setComments(commentsList);
          })
          .catch((err) => {
            setError(true);
          });
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Sorry, something went wrong!</p>;

  const date = new Date(article.created_at).toDateString();
  const commentsCount = comments.length;

  return (
    <section>
      <h2>{article.title}</h2>
      <p>Author: {article.author}</p>
      <div className="info-line">
        <span>{date}</span>|<span>{article.topic}</span>|
        <span>Comments: {commentsCount}</span>
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
      <p>{article.body}</p>
      <div className="info-line">
        <img className="icon" alt="Thumb-up icon" src={icon} />
        <span className="votes">Votes: {article.votes}</span>
      </div>
      <div className="comments">
        <span className="comment-span">Comments: {commentsCount}</span>
        <button className="button">Add Comment</button>
      </div>
      <div>
        {comments.map((comment) => {
          const commentDate = new Date(comment.created_at).toDateString();
          return <div key={comment.comment_id} className="comment-card">
            <p className="comment-body">{comment.body}</p>
          <div className="comment-line">
            <span className="comment-span">{commentDate}</span>
            <span className="comment-span">Author: {comment.author}</span>
            <button className="button">Delete Comment</button>
            </div>
          </div>;
        })}
      </div>
    </section>
  );
};
