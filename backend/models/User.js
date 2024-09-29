const mongoose = require("mongoose");
const bs=require('bcrypt');
const jwt=require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    : {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  joiningTime: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

userSchema.pre('save', async function(next) {
  const user = this;

  // If the password field has not been modified, skip hashing and continue with the save
  if (!user.isModified("password")) {
      return next();
  }

  // Try hashing the password before saving
  try {
      const hash = await bs.hash(user.password, 10);
      user.password = hash;
      next(); // Proceed to save the user document
  } catch (error) {
      next(error); // Pass any errors to the next middleware
  }
});
userSchema.methods.isPasswordValid=async function(password){
  return bs.compare(password,this.password);
}
userSchema.methods.generateToken =function(){
  try {
      return jwt.sign({
          userId:this._id.toString(),
          email:this.email
      },
      process.env.ACCESS_TOKEN_SECRET
      );
  } catch (error) {
      console.log(error);
  }
};
module.exports= mongoose.model("User", userSchema);
