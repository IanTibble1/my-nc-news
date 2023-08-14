const { fetchArticle } = require("../models/article-models");

const getArticle = (request, response, next) => {
  const { article_id } = request.params;
  console.log(article_id);
  fetchArticle(article_id)
    .then((article) => {
      response.status(200).send({ articles: article });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getArticle };