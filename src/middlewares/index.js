const jwt = require("jsonwebtoken");

//SUGGESTION: We will use this from now on
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

module.exports = { verifyToken };
