const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET;

  if (token) {
    jwt.verify(token, secret, (err) => {
      if (err) {
        return res.status(403).json({ message: "Token Not Valid" });
      }
      next();
    });
  } else {
    return res.status(402).json({ message: "No token Found" });
  }
};

// This will console the https method and route, which will help in development process
const routeLogger = (req, res, next) => {
  console.log(req?.method, req?.originalUrl);
  next();
};

module.exports = { verifyToken, routeLogger };
