import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  cardNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cardCVC: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cardExpMonth: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cardExpYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Order;
