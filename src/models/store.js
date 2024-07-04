'use strict';
const { v4: uuidv4 } = require("uuid");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Store.init(
    {
      toko_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        field: "toko_id", // Nama kolom sebenarnya di database
        defaultValue: uuidv4(),
      },
      user_id: DataTypes.UUID,
      nama_toko: DataTypes.STRING,
      no_telp_toko: DataTypes.STRING,
      email: DataTypes.STRING,
      bio: DataTypes.STRING,
      alamat: DataTypes.STRING,
      logo: DataTypes.STRING,
      rating: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Store",
    }
  );
  return Store;
};