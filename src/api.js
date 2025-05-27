import axios from "axios";

const ncNewsApi = axios.create({
    baseURL: "https://nc-news-project-hofl.onrender.com/api"
});

export const getArticles = (topic) => {
    return ncNewsApi.get("/articles/", {params: {topic: topic}}).then(({data}) => {
       return(data.articles);
    });
};

export const getArticleById = (article_id) => {
    return ncNewsApi.get(`/articles/${article_id}`).then(({data}) => {
       return(data.article);
    });
};

export const getCommentsByArticleId = (article_id) => {
    return ncNewsApi.get(`/articles/${article_id}/comments`).then(({data}) => {
       return(data.comments);
    });
};

export const updateArticleById = (article_id) => { 
    return ncNewsApi.patch(`/articles/${article_id}`, { inc_votes: 1 })
    .then(({data}) => {
       return(data.article);
    })
    .catch((err) => {
        return(err);
    });
};

export const addCommentByArticleId = (article_id, username, comment) => { 
    return ncNewsApi.post(`/articles/${article_id}/comments`, { username: username, body: comment })
    .then(({data}) => {
       return(data.article);
    })
    .catch((err) => {
        return(err);
    });
};