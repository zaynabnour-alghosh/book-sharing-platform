const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controllers");
const authMiddleware = require("../middlewares/auth.middleware");
router.post("/login", authController.Login)
router.post("/register", authController.Register)

module.exports = router;