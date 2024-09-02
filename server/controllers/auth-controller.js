//*---------------------
//Home page logic

//*---------------------

const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).send("Hello wellcome to my home page");
  } catch (err) {
    console.log("Error : " + err);
  }
};

//*---------------------
//Registration page logic

//*-----------------------

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    console.log(req.body)
    const userExits = await User.findOne({ email });
    if (userExits) {
      return res.status(400).json({ message: "Email already exits" });
    }

    //Hash the password

    const userCreated = await User.create({ username, email, phone, password });
    const token = await userCreated.generateToken();
    console.log(token);
    res.status(201).json({
      msg: userCreated,
      token: token,
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.log("Internal server error error : " + error);
  }
};

//*---------------------
//Login page logic

//*-----------------------

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExits = await User.findOne({ email });
    console.log(userExits);
    if (!userExits) {
      return res.status(400).json({ message: "Invalid Credential" });
    }
    // const isPasswordValid=await bcrypt.compare(password,userExits.password);

    const isPasswordValid = await userExits.comparePassword(password);
    if (isPasswordValid) {
      res.status(200).json({
        msg: "Login Successfull",
        token: await userExits.generateToken(),
        userId: userExits._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid Email or Password" });
    }
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

//*----------------------------
//*To send user data->User Logic
//*----------------------------

const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(`Error from the user routes ${error}`);
  }
};




const uploadDocument = async (req, res) => {
  try {
    const { email,hex } = req.body; // Get email from the request body

    console.log(req.body.hex)
    console.log(email)
    console.log(req.file)
    // Check if email exists in the database
    const emailExist = await User.findOne({ email: email });

    if (!emailExist) {
      return res.status(404).send({
        message: "Email does not exist",
        success: false,
      });
    }

    if (!req.file) {
      return res.status(400).send({
        message: "No file uploaded",
        success: false,
      });
    }

    // Add the uploaded file to userData
    emailExist.userData.push({
      userDocument: req.file.buffer, // Save file as a Buffer
      contentType: req.file.mimetype,
      hex:hex // Save file MIME type
    });

    await emailExist.save();

    return res.status(201).send({
      message: "Document uploaded successfully",
      success: true,
    });
  } catch (error) {
    console.error(`Error from the user routes: ${error}`);
    res.status(500).send({ message: "Server error", success: false });
  }
};

const getDocument = async (req, res) => {
  try {
    const { email } = req.query;
    console.log(email)
    const emailExist = await User.findOne({ email: email });

    if (!emailExist) {
      return res.status(404).send({
        message: "Email does not exist",
        success: false,
      });
    }

    res.status(200).send({
      documents: emailExist.userData,
      success: true,
    });
  } catch (error) {
    console.error(`Error from the user routes: ${error}`);
    res.status(500).send({ message: "Server error", success: false });
  }
};



module.exports = { home, register, login, user,uploadDocument,getDocument };
