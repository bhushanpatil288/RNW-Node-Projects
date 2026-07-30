const jwt = require('jsonwebtoken');
const Staff = require('../models/staff.model');
const ApiError = require('../utils/apiError');
const env = require('../config/environment');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/auth.middleware');

/**
 * Authenticate a staff member and return JWT tokens.
 */
const login = async (username, password) => {
  // Find staff by username (must explicitly select password since it has select: false)
  const staff = await Staff.findOne({ username }).select('+password');

  if (!staff) {
    throw ApiError.unauthorized('Invalid username or password.');
  }

  // Check if account is active
  if (!staff.active) {
    throw ApiError.forbidden('Account is deactivated. Contact an administrator.');
  }

  // Verify password using the model method
  const isMatch = await staff.comparePassword(password);

  if (!isMatch) {
    throw ApiError.unauthorized('Invalid username or password.');
  }

  // Generate tokens
  const tokenPayload = {
    staffId: staff._id,
    username: staff.username,
    storeId: staff.store,
    active: staff.active,
  };

  const accessToken = generateAccessToken(tokenPayload);
  const refreshToken = generateRefreshToken(tokenPayload);

  return {
    staff: {
      _id: staff._id,
      first_name: staff.first_name,
      last_name: staff.last_name,
      email: staff.email,
      username: staff.username,
      store: staff.store,
    },
    accessToken,
    refreshToken,
  };
};

/**
 * Refresh an access token using a refresh token.
 */
const refresh = async (refreshTokenStr) => {
  try {
    const decoded = jwt.verify(refreshTokenStr, env.jwt.refreshSecret);

    // Verify staff still exists and is active
    const staff = await Staff.findById(decoded.staffId).select('username store active');

    if (!staff || !staff.active) {
      throw ApiError.unauthorized('Invalid refresh token.');
    }

    const tokenPayload = {
      staffId: staff._id,
      username: staff.username,
      storeId: staff.store,
      active: staff.active,
    };

    const accessToken = generateAccessToken(tokenPayload);

    return { accessToken };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw ApiError.unauthorized('Invalid or expired refresh token.');
  }
};

module.exports = { login, refresh };
