const { Produks, Orders } = require("../models");
// const { Op } = require("@sequelize/core");
const { StatusCode, ResponseMessage } = require("../helpers/httpStatus");
const { Op } = require("sequelize");

const haveProduct = (req, res, next) => {
  Produks.findOne({
    where: {
      [Op.and]: [{ user_id: req.userId }, { produk_id: req.params.id }],
    },
  }).then((result) => {
    // console.log(result);
    if (result) {
      next();
      return;
    }
    return res.status(StatusCode.UNAUTHORIZED).send({
      message: ResponseMessage.Unauthorized,
    });
  });
};
const haveOrder = (req, res, next) => {
  Orders.findOne({
    where: {
      [Op.and]: [{ user_id: req.userId }, { order_id: req.params.id }],
    },
  }).then((result) => {
    // console.log(result);
    if (result) {
      next();
      return;
    }
    return res.status(StatusCode.NOT_FOUND).send({
      message: ResponseMessage.NotFound,
    });
  });
};

module.exports = {
  haveProduct,
  haveOrder,
};
