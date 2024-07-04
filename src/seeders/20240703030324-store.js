"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Stores", [
      {
        toko_id: "03138c85-4fce-4c7d-9ac5-a143f13e6651",
        user_id: "688b119f-ff08-4eb2-a70d-f6f9a891f538",
        nama_toko: "toko-a",
        no_telp_toko: "081917320977",
        bio: "lorem ipsum dolor sit amet",
        email: "toko@balance.com",
        alamat: "Mataram",
        rating: 0,
        logo: "uploads/store/logo/logo-default.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('store', null, {});
     */
    await queryInterface.bulkDelete("Stores", null, {});
  },
};
