const multer = require("multer");

const commonError = (res) => {
  return res.status(500).json({
    message: "Something wen't wrong!",
  });
};

const fileLImmitUpload = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Tangani kesalahan dari Multer
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "File size is too large! Maximum upload 1MB.",
      });
    }
  } else if (err) {
    // Tangani kesalahan lainnya
    return res.status(500).json({
      message: "An error occurred while uploading the file.",
    });
  }
  next();
};

module.exports = {
  commonError,
  fileLImmitUpload,
};
