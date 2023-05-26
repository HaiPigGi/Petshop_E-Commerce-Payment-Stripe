import express from 'express';
import { getProduct,createProduct,updateProduct,deleteProduct,getProductById } from '../controller/ProductController.js';
import { processPayment } from '../controller/PaymentController.js';
import stripe from 'stripe';
import { checkLogin,checkLoginStatus} from '../middleware/Auth.js';
const stripeAPI = stripe("sk_test_51N5V5GK1ezlSiaycWDcfoNb0UmqRyTjkr6XbqnoHdo3ipueWbutszvEkCovvzPMqsMoDPlujLuvjTHXQcqhNtxXR00oDRquGuT");
import { isAuthenticated } from '../middleware/Auth.js';
import { getPayment } from '../controller/PaymentController.js';
//require("dotenv").config();


const router =express.Router();
router.get("/product",getProduct);
router.get('/product/:id',getProductById);
router.post('/product', createProduct);
router.patch('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);


//Router Gateway for Stripe API Payment
router.get("/payment/:id",getPayment);
router.post('/payment', processPayment);

export default router;