const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controllers");

router.post("/post-book", userController.postBook)
router.post("/search-book", userController.searchBook)
router.post("/follow", userController.followBookLover)
router.post("/unfollow", userController.unfollowBookLover)
router.post("/view-following-feed", userController.viewFollowingFeed)
router.post("/like", userController.likeBook)
router.post("/unlike", userController.unlikeBook)

module.exports = router;