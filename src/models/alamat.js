'use strict';
const { v4: uuidv4 } = require("uuid");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alamat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Alamat.init(
    {
      alamat_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        field: "alamat_id", // Nama kolom sebenarnya di database
        defaultValue: uuidv4(),
      },
      user_id: DataTypes.UUID,
      provinsi: DataTypes.STRING,
      kota: DataTypes.STRING,
      kecamatan: DataTypes.STRING,
      kelurahan: DataTypes.STRING,
      kodepos: DataTypes.STRING,
      deskripsi_alamat: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Alamat",
    }
  );
  return Alamat;
};