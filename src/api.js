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