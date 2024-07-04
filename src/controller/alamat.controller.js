const { StatusCode, ResponseMessage } = require("../helpers/httpStatus");
const { Alamat, Users } = require("../models");
const { v4: uuidv4 } = require("uuid");

exports.getAllAlamat = async (req, res) => {
  const userId = req.userId;

  try {
    const listAddress = await Alamat.findAll({
      where: {
        user_id: userId,
      },
    });

    return res.status(StatusCode.OK).json({
      message: ResponseMessage.Loaded,
      data: listAddress,
    });
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.BAD_REQUEST,
    });
  }
};

exports.GetAlamatById = async (req, res) => {
  const alamat_id = req.params.id;

  try {
    const addressById = await Alamat.findByPk(alamat_id);

    return res.status(StatusCode.OK).json({
      message: ResponseMessage.Loaded,
      data: addressById,
    });
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailLoaded,
    });
  }
};

exports.createAlamat = async (req, res) => {
  const user_id = req.userId;
  let { provinsi,kota,kecamatan,kelurahan,kodepos, deskripsi_alamat } = req.body;

  try {
    Alamat.create({
      alamat_id: uuidv4(),
      user_id,
      provinsi,
      kota,
      kecamatan,
      kelurahan,
      deskripsi_alamat,
      kodepos
    }).then((result) => {
      return res.status(StatusCode.CREATED).json({
        message: ResponseMessage.Added,
        data: result,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailAdded,
    });
  }
};

exports.updateAlamat = async (req, res) => {
  const userId = req.userId;
  let { alamat_id, provinsi, kota, kecamatan, kelurahan, deskripsi_alamat, kodepos } = req.body;

  try {
    const address = await Alamat.update(
      {
        alamat_id,
        provinsi,
        kota,
        kecamatan,
        kelurahan,
        deskripsi_alamat,
        kodepos
      },
      {
        where: {
          user_id: userId,
          alamat_id,
        },
      }
    );

    return res.status(StatusCode.OK).json({
      message: ResponseMessage.Updated,
    });
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.BAD_REQUEST,
    });
  }
};

exports.deleteAlamat = async (req, res) => {
  const user_id = req.userId;
  const alamat_id = req.params.id;

  try {
    const deleteAddress = await Alamat.destroy({
      where: {
        user_id,
        alamat_id,
      },
    });

    return res.status(StatusCode.OK).json({
      message: ResponseMessage.Removed,
      data: deleteAddress,
    });
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailRemoved,
    });
  }
};
