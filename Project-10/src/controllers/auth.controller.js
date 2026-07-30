const catchAsync = require('../utils/catchAsync');
const ApiResponse = require('../utils/apiResponse');
const authService = require('../services/auth.service');

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const result = await authService.login(username, password);
  ApiResponse.success(res, 200, 'Login successful', result);
});

const refresh = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;
  const result = await authService.refresh(refreshToken);
  ApiResponse.success(res, 200, 'Token refreshed successfully', result);
});

module.exports = { login, refresh };
