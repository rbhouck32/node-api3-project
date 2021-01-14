const Users = require("../users/users-model.js");
const Posts = require("../posts/posts-model.js");

function logger(req, res, next) {
  const method = req.method;
  const url = req.url;
  const status = res.statusCode;
  const timestamp = Date.now;
  const log = `${timestamp} ${method}:${url} ${status}`;
  console.log(log);
  next();
}

async function validateUserId(req, res, next) {
  try {
    const user = await Users.getById(req.params.id);
    if (user) {
      req.user = user;
      next();
    } else {
      res
        .status(404)
        .json({ message: `User with id ${req.params.id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: "Bad Request" });
  }
}

function validateUser(req, res, next) {
  const body = req.body;
  const name = req.body.name;
  if (Object.keys(body).length !== 0) {
    if (name) {
      next();
    } else {
      res.status(400).json({ message: `missing required name field` });
    }
  } else {
    res.status(400).json({ message: "missing user data" });
  }
}

async function validatePostId(req, res, next) {
  try {
    const post = await Posts.getById(req.params.id);
    if (post) {
      req.post = post;
      next();
    } else {
      res
        .status(404)
        .json({ message: `post with id ${req.params.id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `Bad Request` });
  }
}

function validatePost(req, res, next) {
  const body = req.body;
  const text = req.body.text;
  if (body) {
    if (text) {
      next();
    } else {
      res.status(400).json({ message: `missing required text field` });
    }
  } else {
    res.status(400).json({ message: "missing user data" });
  }
}

// do not forget to expose these functions to other modules

module.exports = {
  validateUserId,
  logger,
  validateUser,
  validatePostId,
  validatePost,
};
