const { StatusCode } = require("../../helpers/httpStatus");
const { checkStock } = require("../../helpers/product");
const { Alamat, Cart, Produk } = require("../../models");

const haveAddress = async (req, res, next) => {
  const user_id = req.userId;
  const { alamat_id } = req.body;
  try {
    const user = await Alamat.findAll({ where: { user_id, isActive: true } });
    if (user.length == 0) {
      return res.status(404).json({
        message:
          "You don't have active address right now, make sure you have add and activated it.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Something wen't wrong",
    });
  }
};

const isActiveAddress = async (req, res, next) => {
  const user_id = req.userId;
  const alamat_id = req.params.id;

  try {
    const address = await Alamat.findOne({
      where: {
        user_id,
        alamat_id,
      },
    });
    if (address.isActive === true) {
      return res.status(404).json({
        message: "You can't delete active address",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Something wen't wrong",
    });
  }
};

const haveCart = async (req, res, next) => {
  const user_id = req.userId;
  const { product_carts } = req.body;
  try {
    for (const cart_ of product_carts) {
      let cart = await Cart.findOne({ where: { user_id, cart_id: cart_ } });
      if (!cart) {
        return res.status(404).json({
          message: "Product on cart not found",
        });
      }
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something wen't wrong",
    });
  }
};

const checkStockMiddleware = async (req, res, next) => {
  let { produk_id, qty } = req.body;
  let stock = await checkStock(produk_id, qty);
  console.log(stock);
  if (stock < parseInt(qty)) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: "Stock barang tidak mencukupi!",
    });
  }
  next();
};

const isThisTheSameStore = async (req, res, next) => {
  let { produk_id } = req.body;

  try {
    const product = await Produk.findAll({
      where: {
        produk_id,
      },
    });

    if (product.toko_id) {
    }
  } catch (error) {}
};

module.exports = {
  haveAddress,
  haveCart,
  checkStockMiddleware,
  isActiveAddress,
};
