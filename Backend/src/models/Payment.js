import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./usersModel.js";
import Product from "./product.js";

const { DataTypes } = Sequelize;

const Transaksi = db.define(
  "transaksi",
  {
    id_Produk: {
      type: DataTypes.STRING,
    },
    id_Pelanggan: {
      type: DataTypes.STRING,
    },
    id_Pegawai: {
      type: DataTypes.STRING,
    },
    total_harga: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Transaksi;
