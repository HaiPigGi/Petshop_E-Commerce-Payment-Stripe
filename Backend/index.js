import express from 'express';
import dotenv from "dotenv";
import db from "../Backend/src/config/database.js";
import FileUpload from "express-fileupload";
import Users from './src/models/usersModel.js';
import ruter from './src/routes/index.js';
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from 'body-parser';
import router from './src/routes/index.js';
import RoutesUser from './src/routes/users.js';
dotenv.config();
import Product from './src/models/product.js';
import SequelizeStore from "connect-session-sequelize";
import session from 'express-session';
import Transaksi from './src/models/Payment.js';
import Order from './src/models/Order.js';
const app = express();

// Inisialisasi Sequelize
const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
  expiration: 300000, // Set session expiration time to 5 minutes (in milliseconds)
});


try {
    await db.authenticate();
    console.log("Database Connected");
    Product.sync();
} catch (err) {
    console.log(err);
}

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  

  app.use(
    session({
      secret: 'secret-key',
      resave: false,
      saveUninitialized: false,
      store: store,
      cookie: {
        maxAge: 300000,  // Durasi sesi 5 menit
        secure: 'auto', // Sesuaikan dengan pengaturan HTTPS Anda
      },
    })
    );



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ruter);

app.use(express.static("public"));
app.use(FileUpload());
// Menyajikan folder public/images sebagai file statis
app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(RoutesUser);
store.sync();
Order.sync();
app.listen(5000, () => console.log('Server berjalan di http://localhost:5000'));
