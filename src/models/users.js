'use strict';
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    //   // define association here
      Users.hasMany(models.Alamat, { foreignKey: "user_id" });
    //   Users.hasMany(models.Order, { foreignKey: "user_id" });
    }
  }
  Users.init(
    {
      user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        field: "user_id", // Nama kolom sebenarnya di database
        defaultValue: uuidv4(),
      },
      username: DataTypes.STRING,
      nama_lengkap: DataTypes.STRING,
      nomor_ktp: DataTypes.STRING,
      tempat_lahir: DataTypes.STRING,
      tanggal_lahir: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      no_telp: DataTypes.STRING,
      haveStore: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      role_id: {
        type: DataTypes.INTEGER,
        defaultValue: 2,
      },
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(user.password, saltRounds);
            user.password = hashedPassword;
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(user.password, saltRounds);
            user.password = hashedPassword;
          }
        },
      },
    }
  );
  return Users;
};