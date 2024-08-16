import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  // Extract the token from the headers (assuming it's in the 'Authorization' header)
  const { token } = req.headers;

  console.log(token);

  if (!token) {
    return res.json({ success: false, message: "Not authorized" });
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user ID to the request object
    req.body.userId = decodedToken.id;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Invalid or expired token" });
  }
};

export default authMiddleware;
