const { Sequelize } = require('sequelize');
const db = require('../config/database.js');

const { DataTypes } = Sequelize;
const Order = db.define(
  'Order',
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    products: {
      type: DataTypes.JSON,
      defaultValue: [],
      get() {
        return JSON.parse(this.getDataValue('products'));
      },
      set(value) {
        this.setDataValue('products', JSON.stringify(value));
      }
    },
    subtotal: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    shipping: {
      type: DataTypes.JSON,
      allowNull: false
    },
    delivery_status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    },
    payment_status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true,
    tableName: 'orders'
  }
);

module.exports = Order;
