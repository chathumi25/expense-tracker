const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  try {
    let token;

    //  Safely check for "Bearer" header before splitting
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    //  If no token, send 401 response
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token provided" });
    }

    //  Verify token using secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //  Find the user from decoded ID
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    //  Attach user to request for later use
    req.user = user;

    //  Always call next()
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired, please log in again" });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
