import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Get the token after "Bearer"

  if (!token) return res.sendStatus(401); // If no token is found

  jwt.verify(token, process.env.jwt_secret, (err, user) => {
    if (err) return res.sendStatus(403);

    // Log the decoded user object to verify the contents
    console.log("Decoded user from token:", user);

    // Assuming the token contains the user ID
    req.userId = user.id; // Or however the user ID is stored in the token payload

    // Log the userId to check if it's correctly set
    console.log("req.userId after setting:", req.userId);

    next();
  });
};

export default authMiddleware;
