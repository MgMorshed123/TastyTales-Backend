import express from "express";
import cors from "cors";
import connectToDb from "./Db/Db.js";
import dotenv from "dotenv";

const app = express();
const port = 4000;
dotenv.config();
// middlewares
app.use(express.json());
app.use(cors());

//  DATABASE

connectToDb();
// Basic route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
