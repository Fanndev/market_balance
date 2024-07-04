const { Op, where } = require("sequelize");
const { Kategori } = require("../models");
const { StatusCode, ResponseMessage } = require("../helpers/httpStatus");

// Module CRUD category
const getallCategory = (req, res) => {
    Kategori.findAll()
        .then((result) => {
            res.status(StatusCode.OK).json({
                message: ResponseMessage.Loaded,
                data: result,
            });
        })
        .catch((err) => {
            res.status(StatusCode.BAD_REQUEST).json({
                message: ResponseMessage.FailLoaded,
                err,
            });
        });
}

const addCategory = (req, res) => {
  const { nama_kategori, keterangan } = req.body;

  Kategori.create({
    nama_kategori,
    keterangan,
  })
    .then((result) => {
      console.log(result);
      res.status(StatusCode.OK).json({
        message: ResponseMessage.Added
      })
    })
    .catch((err) => {
        res.status(StatusCode.BAD_REQUEST).json({
            message: ResponseMessage.FailAdded
        })
    });
};

const updateCategory = async (req, res) => {
  const { kategori_id, nama_kategori, keterangan } = req.body;

  Kategori.update(
    {
      kategori_id,
      nama_kategori,
      keterangan,
    },
    {
      where: {
        kategori_id,
      },
    }
  )
    .then((result) => {
      console.log(result);
      res.status(StatusCode.OK).json({
        message: ResponseMessage.Updated
      })
    })
    .catch((err) => {
      console.log(err);
      res.status(StatusCode.BAD_REQUEST).json({
        message: ResponseMessage.FailUpdated
      })
    });
};

const deleteCategory = async (req, res) => {
  const kategori_id = req.params.id;

  try {
    const deleteCategory = await Kategori.destroy({
      where: {
        kategori_id,
      },
    });

    if (deleteCategory === 0) {
        res.status(StatusCode.NOT_FOUND).json({
            message: ResponseMessage.NotFound
        })
    } else {
        res.status(StatusCode.OK).json({
            message: ResponseMessage.Success
        })
    }
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({
        message: ResponseMessage.FailRemoved
    })
  }
};

module.exports = {
    getallCategory,
    addCategory,
    updateCategory,
    deleteCategory
}