'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Produks", {
      produk_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultvalue: Sequelize.UUIDV4,
      },
      toko_id: {
        type: Sequelize.UUID,
      },
      kategori_id: {
        type: Sequelize.INTEGER,
      },
      harga_perKG: {
        type: Sequelize.DOUBLE,
      },
      berat_P: {
        type: Sequelize.DOUBLE,
      },
      expired: {
        type: Sequelize.STRING,
      },
      nama_produk: {
        type: Sequelize.STRING,
      },
      harga: {
        type: Sequelize.DOUBLE,
      },
      deskripsi: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      stock: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Produks');
  }
};