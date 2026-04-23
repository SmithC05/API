const bcrypt = require('bcryptjs');

const User = require('../models/user.model');
const generateToken = require('../utils/generateToken');
const createError = require('../utils/createError');

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return next(createError(400, 'Bad input', 'Email already exists'));
    }

    // Hash the password before saving it so the raw password is never stored.
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      role: 'user'
    });

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: newUser._id.toString(),
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        }
      }
    });
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return next(createError(401, 'Invalid credentials', 'Email or password is incorrect'));
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return next(createError(401, 'Invalid credentials', 'Email or password is incorrect'));
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token: token,
        user: {
          id: user._id.toString(),
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  registerUser,
  loginUser
};
