exports.generateRefreshTokenExpiryTime = () => {
  let daysUntilExpire = "10";
  let secondsUntilExpire = daysUntilExpire * 24 * 60 * 60;
  return Date.now() / 1000 + secondsUntilExpire;
};

exports.saveUserSessionToDatabase = async (user, refreshToken) => {
  let expiresAt = this.generateRefreshTokenExpiryTime();
  user.sessions.push({ token: refreshToken, expiresAt });
  try {
    const savedSession = await user.save();
    return { savedSession };
  } catch (saveSessionError) {
    return { saveSessionError };
  }
};

exports.saveAdminSessionToDatabase = async (admin, refreshToken) => {
  let expiresAt = this.generateRefreshTokenExpiryTime();
  admin.sessions.push({ token: refreshToken, expiresAt });
  try {
    const savedSession = await admin.save();
    return { savedSession };
  } catch (saveSessionError) {
    return { saveSessionError };
  }
};
