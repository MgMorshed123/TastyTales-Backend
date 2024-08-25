import express from "express";

import authMiddleware from "../MiddleWares/authMiddleware.js";

import { placeOrder, verifyOrder } from "../Controllers/OrderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", verifyOrder);

orderRouter.post("/verofy", authMiddleware, placeOrder);

export default orderRouter;
