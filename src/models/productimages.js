'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductImages.belongsTo(models.Produk, { foreignKey: "product_id" });
    }
  }
  ProductImages.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "id", // Nama kolom sebenarnya di database
      },
      product_id: DataTypes.UUID,
      filename: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ProductImages",
    }
  );
  return ProductImages;
};