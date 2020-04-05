const express = require("express");
const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");
const postController = require("../controllers/post");
const router = express.Router();

router.post("", checkAuth, extractFile, postController.createPost);

router.get("", postController.fetchAllPosts);

router.get("/:id", postController.fetchPost);

router.put("/:id", checkAuth, extractFile, postController.updatePost);

router.delete("/:id", checkAuth, postController.deletePost);

module.exports = router;
