const express = require("express");
const Users = require("./users-model.js");
const Posts = require("../posts/posts-model.js");

const {
  validateUser,
  validateUserId,
  validatePost,
} = require("../middleware/middleware.js");

const router = express.Router();

router.post("/", validateUser, (req, res, next) => {
  Users.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/", (req, res, next) => {
  Users.get()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.delete("/:id", validateUserId, (req, res, next) => {
  Users.remove(req.params.id)
    .then(() => {
      res
        .status(200)
        .json({ message: "The User has been deleted for eternity!" });
    })
    .catch(next);
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  Users.update(req.params.id, req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error Updating the User",
      });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const userInfo = { ...req.body, user_id: req.params.id };
  Posts.insert(userInfo)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error adding message to the hub",
      });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error getting the messages for this user",
      });
    });
});

router.use((error, req, res, next) => {
  res.status(500).json({
    info: "something horrible happened inside the users router",
    message: error.message,
    stack: error.stack,
  });
});

module.exports = router;
