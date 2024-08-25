import orderModel from "../Models/OrdrSchema.js";

import userModel from "../Models/UserModel.js";

import Stripe from "stripe";

const stripe = new Stripe(process.env.stripe_secret);

const placeOrder = async (req, res) => {
  let userI = req.userId;

  const frontend_url = "http://localhost:5173";

  try {
    const newOrder = new orderModel({
      userId: userI,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    console.log("NEWORDER", newOrder);

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },

        unit_amount: Math.round(item.price * 100),
      },

      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },

        unit_amount: Math.round(2 * 100 * 80),
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Specify the payment method types you accept
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });

      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);

      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, verifyOrder };
