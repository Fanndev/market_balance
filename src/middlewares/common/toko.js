const { Users, Store, Produk } = require("../../models");

// check whether the user already has a shop
const checkStore = async (req, res, next) => {
  const userId = req.userId;

  try {
    const toko = await Store.findOne({ where: { user_id: userId } });
    const user = await Users.findOne({ where: { user_id: userId } });

    if (toko) {
      if (toko.isAprove === true) {
        return res.status(200).json({
          message: "You already have a store",
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

const haveStore = async (req, res, next) => {
  const userId = req.userId;

  try {
    const toko = await Store.findOne({ where: { user_id: userId } });

    if (!toko) {
      return res.status(400).json({
        message: "You don't have a store",
      });
    } else if (toko.isAprove === false) {
      return res.status(401).json({
        message:
          "Your store has been suspended, please contact admin for information detail",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Something wen't wrong",
    });
  }
};

const storeProduk = async (req, res, next) => {
  const toko = await Store.findOne({ where: { user_id: userId } });
};

module.exports = {
  checkStore,
  haveStore,
};
