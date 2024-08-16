import express from "express";
import {
  addToCart,
  getFromCart,
  removeFromCart,
} from "../Controllers/CartController.js";
import authMiddleware from "../MiddleWares/authMiddleware.js";

const cartRouter = express.Router();

cartRouter.post("/addTocart", authMiddleware, addToCart);
cartRouter.post("/removeFromCart", authMiddleware, removeFromCart);
cartRouter.post("/getFromCart", authMiddleware, getFromCart);

export default cartRouter;
