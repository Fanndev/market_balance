const multer = require("multer");
const path = require("path");

// multer
const storageProduct = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/produk/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "_" + file.originalname);
  },
});

const uploads = multer({ storage: storageProduct }).fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "image4", maxCount: 1 },
]);

// banner upload
const bannerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/banner/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const bannerUpload = multer({ storage: bannerStorage }).fields([
  { name: "banner", maxCount: 5 },
]);

// toko file path
const storeFile = multer.diskStorage({
  destination: function (req, file, cb) {
    // Tentukan direktori penyimpanan untuk masing-masing jenis file
    if (file.fieldname === "file") {
      cb(null, "uploads/store/permits/");
    } else if (file.fieldname === "logo") {
      cb(null, "uploads/store/logo/");
    } else if (file.fieldname === "banner") {
      cb(null, "uploads/store/banner/");
    } else {
      cb(new Error("Invalid field name"));
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "_" + file.originalname);
  },
});

// Buat filter untuk jenis file yang diizinkan
const fileFilter = (req, file, cb) => {
  // Cek jenis file yang diizinkan untuk setiap field
  if (file.fieldname === "file" && file.mimetype !== "application/pdf") {
    cb(new Error('Hanya file PDF yang diizinkan untuk field "file"!'), false); // Tolak file
  } else if (
    (file.fieldname === "logo" || file.fieldname === "banner") &&
    file.mimetype !== "image/jpg" &&
    file.mimetype !== "image/jpeg" &&
    file.mimetype !== "image/png"
  ) {
    cb(new Error("Hanya gambar yang diizinkan untuk logo dan banner!"), false); // Tolak file
  } else {
    cb(null, true); // Terima file
  }
};

const storeUpload = multer({
  storage: storeFile,
  limits: {
    fileSize: 1000000, // Batasan ukuran file (contoh: 1MB)
  },
}).fields([
  { name: "file", maxCount: 5 },
  { name: "logo", maxCount: 1 },
  { name: "banner", maxCount: 1 },
]);

// category image
// banner upload
const categoryFile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/category/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "_" + file.originalname);
  },
});

const categoryUpload = multer({ storage: categoryFile }).single(
  "category_image"
);

// photo profile upload
const photoProfile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/user_photo/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "_" + file.originalname);
  },
});

const userProfile = multer({ storage: photoProfile }).single("photo");

// bukti pengiriman upload
const fotoBuktiPengiriman = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/bukti_pengiriman/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "_" + file.originalname);
  },
});

const buktiPengiriman = multer({ storage: fotoBuktiPengiriman }).single(
  "bukti_pengiriman"
);

module.exports = {
  uploads,
  bannerUpload,
  storeUpload,
  categoryUpload,
  userProfile,
  buktiPengiriman,
};
