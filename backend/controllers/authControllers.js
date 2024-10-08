const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../utils/token");

exports.home = async(req,res)=>{
  try {
    res.status(400).json({ msg: "This email is already registered" });
  } catch (error) {
    console.log(err);
  }
}
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;


    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "This email is already registered" });
    }

    
    const userdata= await User.create({ name, email, password });

    res.status(201).json({ 
      msg: "Congratulations!! Account has been created for you..",
      // token:await userdata.generateToken(),
      userID:userdata.toString()
   });
  }
  catch (err) {
    console.error(err);
    return res.status(501).json({ msg: "Internal Server Error" });
  }
}



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: false, msg: "Please enter all details!!" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ status: false, msg: "This email is not registered!!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ status: false, msg: "Password incorrect!!" });

    // const token = createAccessToken({ id: user._id });
    delete user.password;
    res.status(200).json({ 
      token:await user.generateToken(),
      user, 
      status: true,
      msg: "Login successful.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}
