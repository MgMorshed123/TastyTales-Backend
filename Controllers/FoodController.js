import foodModel from "../Models/FoodSchema.js";

import fs from "fs";

// add Food

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();

    res.json({ success: true, message: "Food added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "something went wrong " });
  }
};

// list Food ;
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: true, message: "Something went wrong " });
  }
};

// remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food item deleted" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "something went wrong " });
  }
};

export { addFood, listFood, removeFood };
