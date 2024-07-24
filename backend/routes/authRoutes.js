const express = require("express");
const router = express.Router();
const { signup, login,home } = require("../controllers/authControllers");


// Routes beginning with /api/auth

router.get("/",home);
router.post("/signup",signup);
router.post("/login", login);

module.exports = router;
