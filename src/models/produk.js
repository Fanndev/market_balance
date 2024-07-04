'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Produk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Produk.belongsTo(models.Store, { foreignKey: "toko_id" });
      Produk.belongsTo(models.Kategori, { foreignKey: "kategori_id" });
      Produk.hasMany(models.ProductImages, { foreignKey: "product_id" });
    }
  }
  Produk.init(
    {
      produk_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        field: "produk_id", // Nama kolom sebenarnya di database
        defaultValue: uuidv4(),
      },
      toko_id: DataTypes.UUID,
      kategori_id: DataTypes.INTEGER,
      harga_perKG: DataTypes.DOUBLE,
      berat_P: DataTypes.DOUBLE,
      expired: DataTypes.STRING,
      nama_produk: DataTypes.STRING,
      harga: DataTypes.DOUBLE,
      deskripsi: DataTypes.STRING,
      image: DataTypes.STRING,
      stock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Produk",
    }
  );
  return Produk;
};