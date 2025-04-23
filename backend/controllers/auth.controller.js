import User from "../models/User.model.js";

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // create a user

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'student', // default role is student
    });
    sendTokenResponse(user, 201, res);
  } catch (error) {
    next(error);
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists',
      });
    }
    // Handle other errors
    return res.status(500).json({
      success: false,
      message: 'Server error in register user',
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email and password',
      });
    }
    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
    // check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
    res.status(500).json({
      success: false,
      message: 'Server error in login user',
    });
  }
};

// @desc    get current logged in user
// @route   GET /api/auth/me
// @access  Private

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Logout user/clear cookie
// @route   GET /api/auth/logout
// @access  public
export const logout = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

//  Helper function to send get toke from model, create cookie and send response

const sendTokenResponse = (user, statusCode, res) => {
  // create token

  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true; // Set the cookie to be secure in production
  }

  // remove password from response
  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    token,
    user,
    data: user
  });

};