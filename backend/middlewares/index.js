const jwt = require("jsonwebtoken");
const User = require("../models/User");



exports.verifyAccessToken = async (req, res, next) => {

  const token = req.header("Authorization");

  // console.log("backend:"+ token);
  if (!token) return res.status(400).json({ status: false, msg: "Token not found" });
  let user;
  const jwtToken=token.replace("Bearer","").trim();
  try {
    user = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).json({ status: false, msg: "Invalid token" });
  }
  
  try {
    user = await User.findOne({email:user.email}).
    select({
      password:0,
    });
    if (!user) {
      return res.status(401).json({ status: false, msg: "User not found" });
    }

    req.user = user;
    next();
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}