import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  try {
    let token;

    // ✅ Get token from header
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1]; // Bearer token
    }

    if (!token) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach user to request
    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default protect;