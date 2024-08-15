import express from "express";
import {
  addToCart,
  getFromCart,
  removeFromCart,
} from "../Controllers/CartController.js";

const cartRouter = express.Router();

cartRouter.post("/add", addToCart);
cartRouter.post("/remove", removeFromCart);
cartRouter.post("/get", getFromCart);

export default cartRouter;
