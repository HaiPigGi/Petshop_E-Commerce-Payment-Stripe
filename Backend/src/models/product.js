import {Sequelize} from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Product = db.define('product',{
    name: DataTypes.STRING,
    jenis : DataTypes.STRING,
    harga: DataTypes.STRING,
    file : DataTypes.STRING,
    url : DataTypes.STRING,

},{
    freezeTableName:true
});

export default Product;

(async()=>{
    await db.sync();
})();