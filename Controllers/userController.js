import validator from "validator";
import userModel from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// login user

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User dont exist" });
    }

    const ismATCH = await bcrypt.compare(password, user.password);

    if (!ismATCH) {
      return res.json({
        success: false,
        message: "password did not matched",
      });
    }

    const token = createToken(user._id);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    res.json({
      success: true,
      message: error,
    });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.jwt_secret);
};
// reister
const register = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password (at least 8 characters)",
      });
    }

    // This part should be outside of the password length check
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error occurred during registration" });
  }
};

export { login, register };
