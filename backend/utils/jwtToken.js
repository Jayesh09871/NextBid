export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  console.log(process.env.COOKIE_EXPIRE);
  const cookieExpiresIn = process.env.COOKIE_EXPIRE || 365;
  res
    .status(statusCode)
    .cookie("token", token, {
      maxAge: new Date(
        Date.now() + cookieExpiresIn * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
