import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Get the token after "Bearer"
  // console.log("first", token);

  if (!token) return res.sendStatus(401); // If no token is found

  jwt.verify(token, process.env.jwt_secret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log(req.user);
    next();
  });
};

export default authMiddleware;
