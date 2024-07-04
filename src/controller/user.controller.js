const { StatusCode, ResponseMessage } = require("../helpers/httpStatus");
const { Users } = require("../models");

const GetallUser = (req, res) => {
  Users.findAll()
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
};

// update profile
const updateProfile = async (req, res) => {
  const userId = req.userId;
  let { nama_lengkap, email, password, no_telp, nomor_ktp, tempat_lahir, tanggal_lahir } = req.body;
  let file_path = "uploads/profile";

  try {
    if (!req.file) {
      const updateProfile = await Users.update(
        {
          nama_lengkap,
          email,
          no_telp,
          nomor_ktp,
          tempat_lahir,
          tanggal_lahir
        },
        {
          where: {
            user_id: userId,
          },
        }
      );
    } else {
      const updateProfile = await Users.update(
        {
          nama_lengkap,
          email,
          no_telp,
          nomor_ktp,
          tempat_lahir,
          tanggal_lahir,
          photo: file_path + req.file.filename,
        },
        {
          where: {
            user_id: userId,
          },
        }
      );
    }

    return res.status(StatusCode.OK).json({
      message: ResponseMessage.Updated,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailUpdated,
    });
  }
};

// get profile information
const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await Users.findByPk(userId);

    if (user) {
      console.log(userId);
      return res.status(StatusCode.OK).json({
        message: ResponseMessage.Loaded,
        data: user,
      });
    }

    return res.status(StatusCode.UNAUTHORIZED).json({
      message: ResponseMessage.Unauthorized,
    });
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailLoaded,
    });
  }
};

module.exports = {
  // user profile
  getUserProfile,
  GetallUser,
  updateProfile,
};
