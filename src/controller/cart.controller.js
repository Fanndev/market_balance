const { updateQtyCart, deleteCart } = require("../helpers/product");
const { StatusCode, ResponseMessage } = require("../helpers/httpStatus");
const { Cart, Produk, Store } = require("../models");
const { default: Sequelize } = require("@sequelize/core");

// add product to cart
const addProductToCart = async (req, res) => {
  let { produk_id, qty } = req.body;
  // console.log(produk_id);

  Cart.findOne({ where: { produk_id: produk_id, user_id: req.userId } })
    .then(async (cart) => {
      if (cart) {
        // Jika keranjang sudah ada, perbarui qty-nya
        let newQty = parseInt(cart.qty) + parseInt(qty);
        return await cart.update({ qty: newQty });
      } else {
        // Jika keranjang belum ada, buat yang baru
        return await Cart.create({
          produk_id: produk_id,
          user_id: req.userId,
          qty,
        });
      }
    })
    .then((result) => {
      res.status(StatusCode.CREATED).json({
        message: ResponseMessage.Added,
        result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(StatusCode.BAD_REQUEST).json({
        message: ResponseMessage.FailAdded,
      });
    });
};

// update cart
const updateUserCart = async (req, res) => {
  let cart_id = req.params.id;
  let user_id = req.userId;
  let { type } = req.body;

  try {
    let data = await updateQtyCart(type, cart_id, user_id);
    if (data.status === false) {
      return res.status(StatusCode.BAD_REQUEST).json({
        message: data.message,
      });
    } else if (data.status === 404) {
      return res.status(StatusCode.NOT_FOUND).json({
        message: data.message,
      });
    } else {
      return res.status(StatusCode.OK).json({
        message: data.message,
        data: data.data,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(StatusCode.BAD_REQUEST).json({
      message: "Fail to update cart",
    });
  }
};

// delete cart
const deleteUserCart = (req, res) => {
  let cartId = req.params.id;
  const userId = req.userId;

  Cart.destroy({
    where: {
      cart_id: cartId,
      user_id: userId,
    },
  })
    .then((result) => {
      res.status(StatusCode.OK).json({
        message: ResponseMessage.Removed,
        result,
      });
    })
    .catch((err) => {
      res.status(StatusCode.BAD_REQUEST).json({
        message: ResponseMessage.FailRemoved,
      });
    });
};

// get product on cart
const getProductOnCart = async (req, res) => {
  let userId = req.userId;

  try {
    const listCart = await Cart.findAll({
      include: [
        {
          model: Produk,
          attributes: ["nama_produk", "harga", "image", "stock"],
          include: {
            model: Store,
            attributes: ["toko_id", "nama_toko", "logo"],
          },
        },
      ],
      where: {
        user_id: userId,
      },
    });

    // formated list cart
    const cartListFromated = listCart.map((cart) => {
      const subtotal = cart.qty * cart.Produk.harga;

      return {
        cart_id: cart.cart_id,
        toko_id: cart.Produk.Store.toko_id,
        image: cart.Produk.image,
        nama_produk: cart.Produk.nama_produk,
        harga: cart.Produk.harga,
        qty: cart.qty,
        subtotal: subtotal,
        stock: cart.Produk.stock,
        nama_toko: cart.Produk.Store.nama_toko,
        logo: cart.Produk.Store.logo,
        createdAt: cart.createdAt,
      };
    });

    return res.status(StatusCode.OK).json({
      message: ResponseMessage.Loaded,
      data: cartListFromated,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailLoaded,
    });
  }
};

module.exports = {
  addProductToCart,
  updateUserCart,
  deleteUserCart,
  getProductOnCart,
};
