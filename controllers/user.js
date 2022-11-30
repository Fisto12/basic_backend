import Users from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import shortid from "shortid";
const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashed_password = await bcrypt.hash(password, 10);
    const _user = new Users({
      firstName,
      lastName,
      email,
      hash_password: hashed_password,
      userName: shortid.generate(),
    });
    const savedUser = await _user.save();
    let { hash_password, ...others } = savedUser._doc;
    const token = generateJwtToken(_user._id, _user.role);
    res.status(201).json({ ...others, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
