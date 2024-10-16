const userService = require('../services/userService');
const asyncHandler = require('express-async-handler');

// Register new user
const registerUser = asyncHandler(async (req, res) => {
  const user = await userService.registerUser(req.body);
  res.status(201).json(user);
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.loginUser(email, password);
  res.status(200).json(user);
});

// Get user profile (Protected)
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await userService.getUserProfile(req.user.id);
  res.status(200).json(user);
});

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
