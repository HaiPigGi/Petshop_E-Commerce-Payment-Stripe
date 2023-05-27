import Product from "../models/product.js";
import stripeAPI from "stripe";
import Transaksi from "../models/Payment.js";
import Order from "../models/Order.js";
import Users from "../models/usersModel.js";
import { v4 as uuidv4 } from "uuid";

export const stripe = stripeAPI(
  "sk_test_51N5V5GK1ezlSiaycWDcfoNb0UmqRyTjkr6XbqnoHdo3ipueWbutszvEkCovvzPMqsMoDPlujLuvjTHXQcqhNtxXR00oDRquGuT"
);

export const getPayment = async (req, res) => {
  try {
    const response = await Transaksi.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

export const processPayment = async (req, res) => {
  try {
    const { productId, cardToken } = req.body;
    if (!cardToken) {
      return res.status(400).json({ msg: "Card token is required" });
    }

    // Find the product by id
    const product = await Product.findOne({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const { name, harga } = product;

    // Find the user by email
    const user = await Users.findOne({
      where: {
        email: "Adminzoepy@gmail.com",
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const { id: id_Pegawai } = user;

    // Create a PaymentMethod object
    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number: cardToken.number,
        cvc: cardToken.cvc,
        exp_month: cardToken.exp_month,
        exp_year: cardToken.exp_year,
      },
    });

    // Process payment using Stripe with the provided PaymentMethod ID
    const paymentIntent = await stripe.paymentIntents.create({
      amount: harga * 100,
      currency: "idr",
      description: name,
      payment_method: paymentMethod.id,
    });

    // Generate UUID using the uuid package
    const uuid = uuidv4();

    // Create a transaction
    const transaksi = await Transaksi.create({
      id_Produk: productId,
      id_Pelanggan: uuid,
      id_Pegawai: id_Pegawai,
      total_harga: harga,
    });

    // Create an order
    const order = await Order.create({
      productId,
      userId: uuid,
      total: harga,
      cardNumber: cardToken.number,
      cardCVC: cardToken.cvc,
      cardExpMonth: cardToken.exp_month,
      cardExpYear: cardToken.exp_year,
    });

    // Return success message, product details, and transaction
    return res.status(200).json({
      msg: "Payment processed successfully",
      product: {
        name,
        harga,
      },
      transaksi,
      order,
      clientSecret: paymentIntent.client_secret,
      userId: uuid, // Include the user ID in the responses
      id_Produk: productId,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};
