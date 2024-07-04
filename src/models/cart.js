'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       Cart.belongsTo(models.Produk, { foreignKey: "produk_id" });
    }
  }
  Cart.init(
    {
      cart_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "cart_id", // Nama kolom sebenarnya di database
      },
      user_id: DataTypes.UUID,
      produk_id: DataTypes.UUID,
      qty: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};