import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";

// register a new user
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registed" });
    }

    // hash password to secure
    const hashedPassword = await bcrypt.hash(password, 12);

    // create user
    const user = await User.create({ name, email, password: hashedPassword });

    // generate token
    const token = generateToken({ id: user._id });

    return res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch {
    res.status(500).json({ error: "Registration failed" });
  }
};

// login existing user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user doesn't exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ error: "User doesn't exists" });
    }

    // comapre password
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Password is incorrect" });
    }

    // generate token
    const token = generateToken({ id: user._id });

    return res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch {
    res.status(500).json({ error: "Login failed" });
  }
};

// Generate JWT token
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });
};
