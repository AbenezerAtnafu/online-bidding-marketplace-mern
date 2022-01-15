const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || "5001",
  jwtSecret: process.env.JWT_SECRET_KEY || "Your_jwt_secret_key",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || 6000000,
  databaseString:
    process.env.DATABASE_STRING ||
    "mongodb://" +
      (process.env.IP || "localhost") +
      ":" +
      (process.env.MONGO_PORT || "27017") +
      "/online-bidding-mern-project",
};

module.exports = config;
