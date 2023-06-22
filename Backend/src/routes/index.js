import express from 'express';
import { getProduct,createProduct,updateProduct,deleteProduct,getProductById } from '../controller/ProductController.js';
import { processPayment } from '../controller/PaymentController.js';
import stripe from 'stripe';
import { checkLogin,checkLoginStatus} from '../middleware/Auth.js';
const stripeAPI = stripe("sk_test_51N5V5GK1ezlSiaycWDcfoNb0UmqRyTjkr6XbqnoHdo3ipueWbutszvEkCovvzPMqsMoDPlujLuvjTHXQcqhNtxXR00oDRquGuT");
import { isAuthenticated } from '../middleware/Auth.js';
import { getPayment } from '../controller/PaymentController.js';
import { sendEmail } from '../controller/sendEmail.js';
import { checkAuth } from '../middleware/verify.js';
//require("dotenv").config();

const router =express.Router();
router.get("/product",getProduct);
router.get('/product/:id',getProductById);
router.post('/product', createProduct);
router.patch('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);

//Routes Gateway for SendMail
router.post("/sendMail", async (req, res) => {
    const { to, subject, text } = req.body;
  
    try {
      await sendEmail(req, to, subject, text);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to send email" });
    }
  });
//Router Gateway for Stripe API Payment
router.get("/payment/:id",getPayment);
router.get("/payment/",getPayment);
router.post('/payment', processPayment);

export default router;