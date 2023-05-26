import express from 'express';
import {Login, Logout, Me,getUsers, Register,getUserById} from "../controller/userController.js";
import { verifyUser,adminOnly,checkLoginStatus } from '../middleware/Auth.js';
const router = express.Router();
// Rute yang dapat diakses tanpa otentikasi
router.get('/', (req, res, next) => {
    if (req.session.loggedin === true) {
      return HomeUser(req, res, next);
    } else {
      return Home(req, res, next);
    }
  });
  

  router.get('/users',getUsers);
  //router.patch("/user",updateUser);
  router.get('/users/:email',getUserById);
  router.post('/register', Register);
  
  router.get('/me', Me);
  router.post('/login', Login);
  router.get("/checkLogin",checkLoginStatus);
  router.delete('/logout', Logout);

export default router;