const { Cart, Produk } = require("../models");

const checkStock = async (produk_id) => {
  try {
    let { stock } = await Produk.findByPk(produk_id, {
      raw: true,
      attributes: ["stock"],
    });
    return stock;
  } catch (error) {
    throw error;
  }
};

const decreaseStock = async (produk_id, stock) => {
  try {
    let produk = await Produk.findOne({ where: { produk_id } });
    if (!produk) {
      return { status: false, message: "Product not found!" };
    }
    let newStock = parseInt(produk.stock) - parseInt(stock);
    await produk.update({ stock: newStock });
    return { status: true, message: "Succesfully update stock" };
  } catch (error) {
    // throw error
    console.log(error);
    return { status: false, message: "Fail update stock" };
  }
};

const deleteCart = async (cart_id) => {
  try {
    Cart.destroy({ where: { cart_id } });
    return { status: true, message: "Successfully delete product from cart" };
  } catch (error) {
    return { status: false, message: "Fail update stock" };
  }
};

const updateQtyCart = async (type, cart_id, user_id) => {
  let data = {};
  let cart = await Cart.findOne({ where: { cart_id, user_id } });
  if (cart) {
    if (type == "increase") {
      let newQty = cart.qty + 1;
      // cek stock dulu
      let stock = await checkStock(cart.produk_id);
      if (stock < newQty) {
        data = { status: false, message: "Stock tidak mencukupi" };
      } else {
        let cart_ = await cart.update({ qty: newQty });
        if (!cart_) {
          data = { status: false, message: "Cart not found!" };
        } else {
          data = {
            status: true,
            message: "Berhasil update qty di cart",
            data: cart,
          };
        }
      }
    } else {
      let newQty = cart.qty - 1;

      if (newQty < 0) {
        let cart_ = await cart.destroy();
        if (!cart_) {
          data = { status: false, message: "Cart not found!" };
        } else if (cart_) {
          data = { status: 404, message: "Cart not found!" };
        } else {
          data = {
            status: true,
            message: "Berhasil update qty di cart",
            data: cart,
          };
        }
      } else {
        let cart_ = await cart.update({ qty: newQty });
        if (!cart_) {
          data = { status: false, message: "Cart not found!" };
        } else {
          data = {
            status: true,
            message: "Berhasil update qty di cart",
            data: cart,
          };
        }
      }
    }
  } else {
    data = { status: false, message: "Something wen't wrong!" };
  }
  return data;
};

module.exports = {
  checkStock,
  updateQtyCart,
  decreaseStock,
  deleteCart,
};
