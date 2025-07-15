const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body;

    // Enhanced validation for required fields
    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Name is required and cannot be empty or contain only spaces",
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        message: "Email is required and cannot be empty or contain only spaces",
      });
    }

    if (!password || !password.trim()) {
      return res.status(400).json({
        message:
          "Password is required and cannot be empty or contain only spaces",
      });
    }

    // Trim and validate individual fields
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    // Name validation
    if (trimmedName.length < 2) {
      return res.status(400).json({
        message: "Name must be at least 2 characters long",
      });
    }

    if (trimmedName.length > 50) {
      return res.status(400).json({
        message: "Name must be less than 50 characters",
      });
    }

    if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      return res.status(400).json({
        message: "Name can only contain letters and spaces",
      });
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return res.status(400).json({
        message: "Please enter a valid email address",
      });
    }

    if (trimmedEmail.length > 100) {
      return res.status(400).json({
        message: "Email must be less than 100 characters",
      });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    if (password.length > 128) {
      return res.status(400).json({
        message: "Password must be less than 128 characters",
      });
    }

    // Strong password validation
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      });
    }

    // Role validation
    const validRoles = ["general", "author", "admin"];
    if (role && !validRoles.includes(role.toLowerCase())) {
      return res.status(400).json({
        message: "Invalid role. Must be one of: general, author, admin",
      });
    }

    // Phone validation (if provided)
    if (phone && phone.trim()) {
      const trimmedPhone = phone.trim();
      if (!/^\+?[\d\s\-()]{10,15}$/.test(trimmedPhone)) {
        return res.status(400).json({
          message: "Please enter a valid phone number",
        });
      }
    }

    // Address validation (if provided)
    if (address && address.trim() && address.trim().length > 200) {
      return res.status(400).json({
        message: "Address must be less than 200 characters",
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email: trimmedEmail });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists with this email address",
      });
    }

    // Create user with validated data
    const userData = {
      name: trimmedName,
      email: trimmedEmail,
      password: password, // Don't trim password as it might contain intentional spaces
      role: role ? role.toLowerCase() : "general", // Default to general
    };

    // Add optional fields if provided and valid
    if (phone && phone.trim()) {
      userData.phone = phone.trim();
    }

    if (address && address.trim()) {
      userData.address = address.trim();
    }

    const user = await User.create(userData);

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        emailVerified: user.emailVerified,
        token: generateToken(user._id),
        message: "User registered successfully",
      });
    } else {
      res.status(400).json({
        message: "Failed to create user account",
      });
    }
  } catch (error) {
    console.error("Registration error:", error);

    // Handle specific MongoDB errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        message: `Validation error: ${validationErrors.join(", ")}`,
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        message: "User already exists with this email address",
      });
    }

    res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    // Check for user email
    const user = await User.findOne({ email }).select("+password");

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        emailVerified: user.emailVerified,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
  try {
    res.status(200).json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      address: req.user.address,
      role: req.user.role,
      emailVerified: req.user.emailVerified,
      createdAt: req.user.createdAt,
      updatedAt: req.user.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if email is being changed and if it already exists
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone !== undefined) user.phone = phone;
    if (address !== undefined) user.address = address;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      role: updatedUser.role,
      emailVerified: updatedUser.emailVerified,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Change user password
// @route   PUT /api/users/password
// @access  Private
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Please provide current and new password" });
    }

    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Validate new password
    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "New password must be at least 6 characters" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user role (Admin only)
// @route   PUT /api/users/:id/role
// @access  Private/Admin
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const userId = req.params.id;

    if (!role || !["general", "author", "admin"].includes(role)) {
      // Updated to include admin
      return res
        .status(400)
        .json({
          message: "Please provide a valid role (general, author, or admin)",
        });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify user email
// @route   PUT /api/users/verify-email
// @access  Private
const verifyEmail = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.emailVerified = true;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments();

    res.json({
      users,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  changePassword,
  updateUserRole,
  verifyEmail,
  getAllUsers,
  deleteUser,
};
