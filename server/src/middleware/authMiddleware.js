import jwt from "jsonwebtoken";

const authMiddleware = async (
  req,
  res,
  next
) => {
  try {
    const authHeader =
      req.headers.authorization;

    console.log(
      "AUTH HEADER:",
      authHeader
    );

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message:
          "No auth header",
      });
    }

    const token =
      authHeader.split(" ")[1];

    console.log(
      "TOKEN:",
      token
    );

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    console.log(
      "DECODED:",
      decoded
    );

    req.userId =
      decoded.userId;

    next();

  } catch (error) {
    console.log(
      "AUTH ERROR:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message:
        error.message,
    });
  }
};

export default authMiddleware;