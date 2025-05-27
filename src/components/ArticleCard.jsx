import { useEffect, useState } from "react";
import {
  getArticleById,
  getCommentsByArticleId,
  updateArticleById,
  addCommentByArticleId
} from "../api";
import { useParams } from "react-router";
import icon from "../assets/Thumb-up.png";

export const ArticleCard = () => {
  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState([]);
  const [votes, setVotes] = useState(0);
  const [votesMessage, setVotesMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [addCommentClicked, setAddCommentClicked] = useState(false);
  const [isCommentListChanged, setIsCommentListChanged] = useState(false);
  const article_id = useParams().article_id;

  function handleClickVote() {
    event.preventDefault();
    if (!hasVoted) {
      setVotes(votes + 1);
      setHasVoted(true);
      updateArticleById(article_id)
        .then((updatedArticle) => {
          console.log(updatedArticle, "<---updatedArticle");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setVotesMessage("You have already voted!");
    }
  }

  function clickAddCommentButton() {
    event.preventDefault();
    let isClicked = addCommentClicked;
    isClicked ? setAddCommentClicked(false) : setAddCommentClicked(true);
  }

  function submitComment() {
    event.preventDefault();
    const inputs = document.getElementById("comment-form").elements;
    const username = inputs["username"].value;
    const comment =  inputs["comment"].value;
    addCommentByArticleId(article_id, username, comment);
    setIsCommentListChanged(true);
  }

  useEffect(() => {
    setLoading(true);
    getArticleById(article_id)
      .then((article) => {
        setArticle(article);
        setVotes(article.votes);
        getCommentsByArticleId(article_id)
          .then((commentsList) => {
            setComments(commentsList);
            setIsCommentListChanged(false);
            setAddCommentClicked(false);
          })
          .catch((err) => {
            setError(true);
          });
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [isCommentListChanged]);

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
        <span className="votes">Votes: {votes}</span>
        <button value="1" onClick={handleClickVote}>
          Vote
        </button>
        <span className="votes">{votesMessage}</span>
      </div>
      <div className="comments">
        <span className="comment-span">Comments: {commentsCount}</span>
         {addCommentClicked ? 
         <button onClick={clickAddCommentButton}>
          Close Add Comment
        </button> : <button onClick={clickAddCommentButton}>
          Add Comment
        </button> }
      </div>
      {addCommentClicked ? (
        <div className="add-comment">
          <form id="comment-form">
             <p className="p">
              <label className="label" htmlFor="username">
                Username:
              </label>
            </p>
            <p className="p">
              <input className="p" name="username" />
            </p>
            <p className="p">
              <label className="label" htmlFor="comment">
                Comment:
              </label>
            </p>
            <p className="p">
              <textarea
                className="p"
                name="comment"
                rows="5"
                cols="30"
              ></textarea>
            </p>
            <button className="submit-button" onClick={submitComment}>
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div></div>
      )}
      <div>
        {comments.map((comment) => {
          const commentDate = new Date(comment.created_at).toDateString();
          return (
            <div key={comment.comment_id} className="comment-card">
              <p className="comment-body">{comment.body}</p>
              <div className="comment-line">
                <span className="comment-span">{commentDate}</span>
                <span className="comment-span">Author: {comment.author}</span>
                <button className="button">Delete Comment</button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
