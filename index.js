import express from "express";
import cors from "cors";
import connectToDb from "./Db/Db.js";
import dotenv from "dotenv";
import FoodRouter from "./Routes/Foodroutes.js";
import { listFood, removeFood } from "./Controllers/FoodController.js";
import userRouter from "./Routes/AuthRoutes.js";
import "dotenv/config.js";
import cartRouter from "./Routes/CartRoutes.js";
import orderRouter from "./Routes/OrderRoutes.js";

const app = express();
const port = 4000;
dotenv.config();
// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

//  DATABASE
connectToDb();

//  route food
app.use("/api/food", FoodRouter);
app.use("/images", express.static("uploads"));

// route auth
app.use("/api/auth", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
