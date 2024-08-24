import express from "express";

import authMiddleware from "../MiddleWares/authMiddleware.js";

import { placeOrder } from "../Controllers/OrderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);

export default orderRouter;
