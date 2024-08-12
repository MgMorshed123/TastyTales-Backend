import express from "express";
import { addFood } from "../Controllers/FoodController.js";

import multer from "multer";

const FoodRouter = express.Router();

FoodRouter.post("/add", addFood);

// IMAGE STORAGE ENGINE

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, res, cb) => {
    return cb(null, `${Date.now()} ${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

export default FoodRouter;
