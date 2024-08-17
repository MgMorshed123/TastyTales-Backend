import userModel from "../Models/UserModel.js";

const addToCart = async (req, res) => {
  try {
    // const { userId, itemId } = req.body;
    // console.log("mm", req.body);
    // Fetch user data from the database
    let userData = await userModel.findById({ _id: req.user.id });

    // console.log("addToCart", userData);
    // Check if userData exists
    console.log("userDat", userData);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Initialize cartData if it doesn't exist
    if (!userData.cartData) {
      userData.cartData = new Map();
    }

    // Check if itemId is provided in the request
    if (!req.body.itemId) {
      return res.json({ success: false, message: "Item ID is required" });
    }

    // Convert cartData from Map to a regular JavaScript object for manipulation
    const cartData = userData.cartData;

    // console.log("cartdata", cartData);
    // console.log("reqid", cartData.get(req.body.itemId));

    // Update the quantity for the item in the cart
    if (!cartData.get(req.body.itemId)) {
      cartData.set(req.body.itemId, 1);
      console.log(cartData.get(req.body.itemId));
    } else {
      cartData.set(req.body.itemId, cartData.get(req.body.itemId) + 1);
      console.log(cartData.get(req.body.itemId));
    }

    // Update the user's cart data in the database
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    // Fetch user data from the database

    let userData = await userModel.findById(req.body.userId);

    // Check if userData exists
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Initialize cartData as a Map
    let cartData = userData.cartData;

    // Check if the item exists in the cart and its quantity is greater than 0
    if (cartData.has(req.body.itemId) && cartData.get(req.body.itemId) > 0) {
      // Reduce the quantity by 1
      cartData.set(req.body.itemId, cartData.get(req.body.itemId) - 1);

      // If the quantity becomes 0, you might want to remove the item from the cart entirely
      if (cartData.get(req.body.itemId) === 0) {
        cartData.delete(req.body.itemId);
      }
    } else {
      return res.json({
        success: false,
        message: "Item not found in cart or quantity is already 0",
      });
    }

    // Update the user's cart data in the database
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("getFromCart", userId);
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const userData = await userModel.findById(userId);
    console.log("userData", userData);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {}; // Ensure cartData is defined
    console.log("cartdata", cartData);
    res.json({ success: true, data: cartData });
  } catch (error) {
    console.error("Error fetching cart data:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { addToCart, getFromCart, removeFromCart };
