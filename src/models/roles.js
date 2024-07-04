'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Roles.init(
    {
      role_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        field: "role_id", // Nama kolom sebenarnya di database
      },
      nama_role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Roles",
    }
  );
  return Roles;
};