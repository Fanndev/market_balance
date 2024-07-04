"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("admin", 10);

    return queryInterface.bulkInsert("Users", [
      {
        user_id: "5fe964e7-72d9-467d-9377-b331f75ecdce",
        username: "admin",
        nama_lengkap: "",
        nomor_ktp: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        email: "admin@gmail.com",
        no_telp: "08123456789",
        password: hashedPassword,
        role_id: 1,
        haveStore: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: "688b119f-ff08-4eb2-a70d-f6f9a891f538",
        username: "user-penjual",
        nama_lengkap: "user-penjual",
        nomor_ktp: "98376871",
        tempat_lahir: "Jakarta",
        tanggal_lahir: "2001-01-16",
        email: "user-penjual@gmail.com",
        no_telp: "08123456222",
        password: hashedPassword,
        role_id: 2,
        haveStore: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: "e7a6a4d6-5889-4f05-b4c5-8ab79ac308be",
        username: "user-pembeli",
        nama_lengkap: "",
        nomor_ktp: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        email: "user-pembeli@gmail.com",
        no_telp: "0812345459",
        password: hashedPassword,
        role_id: 2,
        haveStore: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
