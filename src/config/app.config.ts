export default () => ({
  appSecret: process.env.APP_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtRefreshExpire: process.env.JWT_REFRESH_EXPIRE,
  jwtSecret: process.env.JWT_TOKEN_SECRET,
  jwtExpire: process.env.JWT_TOKEN_EXPIRE,
});
