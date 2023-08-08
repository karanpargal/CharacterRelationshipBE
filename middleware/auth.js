const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Access denied. Missing token" });

  try {
    const isVerified = jwt.verify(token, process.env.JWT_SECRET);
    if (isVerified) {
      req.user = isVerified;
      next();
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid token" });
  }
};

module.exports = verifyToken;
