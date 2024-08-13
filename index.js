import express from "express";
import cors from "cors";
import connectToDb from "./Db/Db.js";
import dotenv from "dotenv";
import FoodRouter from "./Routes/Foodroutes.js";
import { listFood, removeFood } from "./Controllers/FoodController.js";

const app = express();
const port = 4000;
dotenv.config();
// middlewares
app.use(express.json());
app.use(cors());

//  DATABASE
connectToDb();

//  route
app.use("/api/food", FoodRouter);
app.use("/api/list", listFood);
app.use("/api/removeFood", removeFood);

app.use("/images", express.static("uploads"));

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
