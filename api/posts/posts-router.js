const express = require("express");

const { validatePostId } = require("../middleware/middleware.js");

const Posts = require("./posts-model.js");

const router = express.Router();

router.get("/", (req, res, next) => {
  Posts.get()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:id", validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

router.delete("/:id", validatePostId, (req, res, next) => {
  Posts.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "The post has been deleted!" });
    })
    .catch(next);
});

router.put("/:id", validatePostId, (req, res) => {
  Posts.update(req.params.id, req.body)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Problem updating the post." });
    });
});

router.use((error, req, res) => {
  res.status(500).json({
    info: "something horrible happened inside the posts router",
    message: error.message,
    stack: error.stack,
  });
});

module.exports = router;
