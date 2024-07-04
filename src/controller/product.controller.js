const { default: Sequelize } = require("@sequelize/core");
const { StatusCode, ResponseMessage } = require("../helpers/httpStatus");
const { Op } = require("sequelize");
const {
  sequelize,
  Store,
  Produk,
  ProductImage,
  Kategori,
} = require("../models");

// get all produk
const getAllProducts = async (req, res) => {
  try {
    const products = await sequelize.query(
      `SELECT p.produk_id, p.toko_id, t.nama_toko, k.nama_kategori, p.nama_produk, p.harga, p.deskripsi, p.image, p.expired, p.stock
    FROM "Produks" p
    INNER JOIN "Stores" t ON p.toko_id = t.toko_id
    INNER JOIN "Kategoris" k ON p.kategori_id = k.kategori_id
    `,
      {
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    return res.status(StatusCode.OK).json({
      message: ResponseMessage.Loaded,
      data: products,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailLoaded,
    });
  }
};

const getProductById = async (req, res) => {
  let productId = req.params.id;

  try {
    const productById = await sequelize.query(
      `SELECT p.produk_id, p.toko_id,t.nama_toko, k.nama_kategori, p.nama_produk, p.harga, p.deskripsi, p.image, p.expired, p.stock
        FROM "Produks" p
        INNER JOIN "Stores" t ON p.toko_id = t.toko_id
        INNER JOIN "Kategoris" k ON p.kategori_id = k.kategori_id
        WHERE p.produk_id = :productId
        `,
      {
        replacements: { productId },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const imageQuery = await sequelize.query(
      `SELECT * FROM "ProductImages" WHERE product_id = :productId`,
      {
        replacements: { productId },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    // Mengatur struktur data yang diinginkan
    const formattedData = productById.map((item) => ({
      ...item,
      ProductImages: imageQuery.map((image) => image.filename),
    }));

    console.log(formattedData);

    return res.status(StatusCode.OK).json({
      message: ResponseMessage.Loaded,
      data: formattedData[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailLoaded,
    });
  }
};

// product search
const productSearch = async (req, res) => {
  let { q } = req.query;

  try {
    const productList = await Produk.findAll({
      attributes: [
        "produk_id",
        "nama_produk",
        "harga_perKG",
        "berat_P",
        "harga",
        "deskripsi",
        "image",
        "expired",
        "stock",
      ],
      include: [
        { model: Kategori, attributes: ["nama_kategori"] },
        { model: Store, attributes: ["toko_id", "nama_toko"] },
      ],
      where: {
        [Op.or]: [
          { nama_produk: { [Op.iLike]: `%${q}%` } },
          // Tambahkan kondisi pencarian lain di sini sesuai kebutuhan
        ],
      },
    });

    // formated product list
    const formattedProductList = productList.map((product) => {
      return {
        produk_id: product.produk_id,
        toko_id: product.Store.toko_id,
        nama_toko: product.Store.nama_toko,
        nama_kategori: product.Kategori.nama_kategori,
        nama_produk: product.nama_produk,
        harga: product.harga,
        deskripsi: product.deskripsi,
        image: product.image,
        stock: product.stock,
      };
    });

    return res.status(StatusCode.OK).json({
      message: ResponseMessage.Loaded,
      data: formattedProductList,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.BAD_REQUEST,
    });
  }
};


module.exports = {
  getAllProducts,
  getProductById,
  productSearch,
};
