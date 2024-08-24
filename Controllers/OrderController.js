import orderModel from "../Models/OrdrSchema.js";

import userModel from "../Models/UserModel.js";

import Stripe from "stripe";

const stripe = new Stripe(process.env.stripe_secret);

const placeOrder = async (req, res) => {};

export { placeOrder };
