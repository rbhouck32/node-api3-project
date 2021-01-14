const express = require("express");
const { logger } = require("./middleware/middleware.js");

const postsRouter = require("./posts/posts-router.js");
const usersRouter = require("./users/users-router.js");

const server = express();

server.use(express.json());
// global middlewares and routes need to be connected here

server.use("/api/users", usersRouter);
server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;

server.use(logger);
