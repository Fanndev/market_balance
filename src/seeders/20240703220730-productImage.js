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
    return queryInterface.bulkInsert("ProductImages", [
      {
        product_id: "0134b364-6056-47e9-989b-2d5243ab65c6",
        filename: "uploads/produk/example-product-image1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: "0134b364-6056-47e9-989b-2d5243ab65c6",
        filename: "uploads/produk/example-product-image2.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: "0134b364-6056-47e9-989b-2d5243ab65c6",
        filename: "uploads/produk/example-product-image3.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: "748165f7-58c1-4d6b-8393-461b0ac813a2",
        filename: "uploads/produk/example-product-image1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: "748165f7-58c1-4d6b-8393-461b0ac813a2",
        filename: "uploads/produk/example-product-image2.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: "748165f7-58c1-4d6b-8393-461b0ac813a2",
        filename: "uploads/produk/example-product-image3.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: "7fab2834-6c55-4e6f-8dd3-f143f9182969",
        filename: "uploads/produk/example-product-image1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: "7fab2834-6c55-4e6f-8dd3-f143f9182969",
        filename: "uploads/produk/example-product-image2.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: "7fab2834-6c55-4e6f-8dd3-f143f9182969",
        filename: "uploads/produk/example-product-image3.jpg",
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
     * await queryInterface.bulkDelete('ProductImages', null, {});
     */
    await queryInterface.bulkDelete("ProductImages", null, {});
  },
};
