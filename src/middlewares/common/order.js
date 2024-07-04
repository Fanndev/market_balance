const { Sequelize, where } = require("sequelize");
const { Cart } = require("../../models");

// Check toko
const checkProductStore = async (req, res, next) => {
  let { product_carts } = req.body;

  try {
    let products = [];
    for (let cart of product_carts) {
      let product = (
        await Cart.sequelize.query(
          `SELECT c.*, p.harga, p.toko_id FROM "Carts" c 
      INNER JOIN "Produks" p ON c.produk_id = p.produk_id 
      WHERE c.cart_id = ${cart} LIMIT 1`,
          {
            type: Sequelize.QueryTypes.SELECT,
          }
        )
      )[0];
      products.push(product);
    }

    if (products.length > 1) {
      if (products[0].toko_id !== products[1].toko_id) {
        return res.status(400).json({
          message: "Product must be from the same store",
        });
      }
    }

    next();
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  checkProductStore,
};
