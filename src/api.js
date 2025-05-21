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
    console.log(article_id, "<---article_id in api.js");
    
    return ncNewsApi.get(`/articles/${article_id}`).then(({data}) => {
        console.log(data, "<---data in api.js");
       return(data.article);
    });
};