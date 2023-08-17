const express = require("express");
const app = express();
const { getApi } = require("./controllers/api-controllers");
const { getTopics } = require("./controllers/topic-controllers");
const {
  getArticle,
  getAllArticles,
  getArticleComments,
  updateArticle,
} = require("./controllers/article-controllers");
const {
  postComment,
  removeComment,
} = require("./controllers/comment-controllers");

const { getUsers } = require("./controllers/users-controllers");

app.use(express.json());
app.get("/api/", getApi);
app.get("/api/topics", getTopics);
app.get("/api/articles", getAllArticles);
app.get("/api/articles/:article_id", getArticle);
app.get("/api/articles/:article_id/comments", getArticleComments);
app.get("/api/users", getUsers);
app.post("/api/articles/:article_id/comments", postComment);
app.delete("/api/comments/:comment_id", removeComment);
app.patch("/api/articles/:article_id", updateArticle);

app.use((request, response, next) => {
  response.status(404).send({ msg: "No path found" });
  next();
});

app.use((err, request, response, next) => {
  if (err.status === 404) {
    response.status(404).send(err);
  } else {
    next(err);
  }
});

app.use((err, request, response, next) => {
  if (err.code === "22P02") {
    response.status(400).send({ msg: "bad request" });
  } else {
    next(err);
  }
});

app.use((err, request, response, next) => {
  response.status(500).send({ err });
  next(err);
});
module.exports = app;
