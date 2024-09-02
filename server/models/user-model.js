const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  userData: [
    {
      userDocument: {
        type: Buffer, 
        required: true
      },
      contentType: {
        type: String,
        required: true,
      },
      hex:{
        type:String,
        required:true
      }
    },
  ],
});

//? Secure the password
userSchema.pre("save", async function (next) {
  //  console.log("pre method : " +this);

  const user = this;

  if (!user.isModified("password")) {
    next();
  }
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});

//compare password for login

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

//Json web token

userSchema.methods.generateToken = function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRECT_KEY,
      {
        expiresIn: "3d",
      }
    );
  } catch (error) {
    console.error("Error" + error);
  }
};

//define model and collection name
const User = new mongoose.model("User", userSchema);
module.exports = User;
