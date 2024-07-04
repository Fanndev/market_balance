"use strict";

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
    return queryInterface.bulkInsert("Produks", [
      {
        produk_id: "0134b364-6056-47e9-989b-2d5243ab65c6",
        toko_id: "03138c85-4fce-4c7d-9ac5-a143f13e6651",
        kategori_id: 1,
        harga_perKG: 10000,
        berat_P: 1,
        nama_produk: "product-a",
        harga: 10000,
        deskripsi: "lorem impusm dolor sit amet",
        image: "uploads/produk/default-produk.jpg",
        expired: "20/mei/2025",
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        produk_id: "748165f7-58c1-4d6b-8393-461b0ac813a2",
        toko_id: "03138c85-4fce-4c7d-9ac5-a143f13e6651",
        kategori_id: 1,
        harga_perKG: 10000,
        berat_P: 1,
        nama_produk: "product-b",
        harga: 20000,
        deskripsi: "lorem impusm dolor sit amet",
        image: "uploads/produk/default-produk.jpg",
        expired: "20/mei/2025",
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        produk_id: "7fab2834-6c55-4e6f-8dd3-f143f9182969",
        toko_id: "03138c85-4fce-4c7d-9ac5-a143f13e6651",
        kategori_id: 1,
        harga_perKG: 10000,
        berat_P: 1,
        nama_produk: "product-c",
        harga: 30000,
        deskripsi: "lorem impusm dolor sit amet",
        image: "uploads/produk/default-produk.jpg",
        expired: "20/mei/2025",
        stock: 10,
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
     * await queryInterface.bulkDelete('produks', null, {});
     */
    await queryInterface.bulkDelete("Produks", null, {});
  },
};
