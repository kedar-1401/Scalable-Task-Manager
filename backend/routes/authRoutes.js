const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authControllers");
const signupschema=require('../Validators/authValidations')
const validator=require('../middlewares/validate-middleware')
// Routes beginning with /api/auth
router.post("/signup", validator(signupschema),signup);
router.post("/login", login);

module.exports = router;
