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
    return queryInterface.bulkInsert("Kategoris", [
      {
        nama_kategori: "Fashion",
        keterangan:
          "Pakaian, sepatu, aksesoris, perhiasan, dan produk fashion lainnya.",
        image: "uploads/produk/kategori/default-kategori.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_kategori: "Elektronik",
        keterangan:
          "Ponsel, laptop, kamera, peralatan elektronik, aksesori gadget, dan lain-lain.",
        image: "uploads/produk/kategori/default-kategori.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_kategori: "Kesehatan dan Kecantikan",
        keterangan:
          "Produk perawatan kulit, kosmetik, vitamin, obat-obatan, dan perlengkapan kesehatan.",
        image: "uploads/produk/kategori/default-kategori.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_kategori: "Otomotif",
        keterangan:
          "Suku cadang kendaraan, peralatan otomotif, ban, dan aksesoris mobil.",
        image: "uploads/produk/kategori/default-kategori.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_kategori: "Rumah Tangga",
        keterangan:
          "Perabotan rumah tangga, perlengkapan dapur, dekorasi rumah, dan alat-alat rumah tangga.",
        image: "uploads/produk/kategori/default-kategori.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_kategori: "Mainan dan Hobi",
        keterangan:
          "Mainan anak-anak, mainan edukatif, peralatan olahraga, alat musik, dan barang-barang hobi.",
        image: "uploads/produk/kategori/default-kategori.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_kategori: "Komputer dan Aksesoris",
        keterangan:
          "Komputer, laptop, printer, aksesoris komputer, perangkat keras, dan perangkat lunak.",
        image: "uploads/produk/kategori/default-kategori.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_kategori: "Olahraga dan Outdoor",
        keterangan:
          "Pakaian olahraga, peralatan outdoor, alat fitness, dan perlengkapan camping.",
        image: "uploads/produk/kategori/default-kategori.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_kategori: "Makanan dan Minuman",
        keterangan:
          "Produk makanan, minuman, makanan kemasan, dan makanan khas daerah.",
        image: "uploads/produk/kategori/default-kategori.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_kategori: "Buku dan Alat Tulis",
        keterangan:
          "Buku, alat tulis, perlengkapan sekolah, dan peralatan kantor.",
        image: "uploads/produk/kategori/default-kategori.jpg",
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
     * await queryInterface.bulkDelete('kategoris', null, {});
     */
    await queryInterface.bulkDelete("Kategoris", null, {});
  },
};
