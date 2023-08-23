const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const User=require("../models/users.model")
const dotenv = require("dotenv");
dotenv.config()
 
const Register = async(req, res) => {
    const {username, email, password} = req.body

    try {
        const usernameExists = await User.findOne({username});
        if(usernameExists) return res
            .status(400)
            .json("Invalid username");

        const existingUser = await User.findOne({email});
        if(existingUser) return res
            .status(400)
            .json("User already exists! Login Instead");

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = new User({username, email, password: hashedPassword});
        await user.save();

        res
            .status(201)
            .json({message: "user created successfully"});
    } catch (error) {
        res
            .status(500)
            .json(error)
    }
};

const Login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    return next(new Error("Please provide email and password"));
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    return next(new Error("User does not exists"));
  }
  try {
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(400);
      return next(new Error("User password does not match"));
    }
    generateToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

const generateToken = (user, statusCode, res) => {
  const {_id,username,email,password}=user
  const token = jwt.sign({username,email,password, _id}, process.env.JWT_SECRET)
  const {password: hashedPassword,...userInfo} = user.toJSON();
  return res.status(statusCode).json({
    user:userInfo,
    success: true,
    token,
  });
};


module.exports={Login,Register}