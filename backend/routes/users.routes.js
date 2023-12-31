const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controllers");
const authMiddleware=require("../middlewares/auth.middleware");
router.post("/post-book",  authMiddleware,userController.postBook)
router.post("/search-book", userController.searchBook)
router.post("/follow",authMiddleware, userController.followBookLover)
router.post("/unfollow",authMiddleware, userController.unfollowBookLover)
router.post("/view-following-feed",authMiddleware, userController.viewFollowingFeed)
router.post("/like",authMiddleware, userController.likeBook)
router.post("/unlike", authMiddleware,userController.unlikeBook)

module.exports = router;