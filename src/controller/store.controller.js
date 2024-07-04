const { StatusCode, ResponseMessage } = require("../helpers/httpStatus");
const {
  Store,
  Produk,
  ProductImages,
  Order,
  OrderDetail,
  Kategori,
  StatusOrder,
} = require("../models");
const sequelize = require("../config/database/db");
const { Sequelize, where } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const { response } = require("express");

// register Toko
const registerStore = async (req, res) => {
  let {
    nama_toko,
    no_telp_toko,
    bio,
    alamat,
    email,
  } = req.body;
  const userId = req.userId;
  const transaction = await sequelize.transaction();
  let tokoFileUpload = Object.values(req.files); // mengambil nilai object dari file yang diupload
  let file_upload = [];
  for (let i of tokoFileUpload) {
    let file = {};
    file["filename"] = i[0].destination + i[0].filename;
    file_upload.push(file);
  }
  // Konstruksi path lengkap dari file yang diunggah
  const file_path = file_upload[0].filename;
  const logo = file_upload[1]
    ? file_upload[1].filename
    : "uploads/store/logo/default.jpg";
  const banner = file_upload[1]
    ? file_upload[2].filename
    : "uploads/store/banner/default.jpg";
  const store = await Store.findOne({
    where: {
      user_id: userId,
    },
  });
  if (store) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: "Toko sudah terdaftar",
    });
  } else {
    try {
      await Store.create(
        {
          user_id: userId,
          nama_toko,
          no_telp_toko,
          email,
          bio,
          alamat,
          logo,
        },
        { transaction }
      );
      await transaction.commit();
      return res.status(StatusCode.CREATED).json({
        message: "Toko Berhasil Dibuat",
      });
    } catch (error) {
      await transaction.rollback();
      console.log(error);
      return res.status(StatusCode.BAD_REQUEST).json({
        message: "Something wen't wrong",
      });
    }
  }
};

// get toko
const getStore = async (req, res) => {
  const userId = req.userId;
  const file_url = "http://localhost:3000";

  try {
    const store = await Toko.findOne({
      where: {
        user_id: userId,
      },
    });

    // formatted store
    const formattedStore = {
      nama_toko: store.nama_toko,
      no_telp_toko: store.no_telp_toko,
      email: store.email,
      file_path: file_url + store.file_path,
      bio: store.bio,
      alamat: store.alamat,
      banner: file_url + store.banner,
      logo: file_url + store.logo,
      rating: store.rating,
      isAprove: store.rating,
      latitude: store.latitude,
      longitude: store.longitude,
      createdAt: store.createdAt,
    };

    return res.status(StatusCode.OK).json({
      message: ResponseMessage.Loaded,
      data: formattedStore,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailLoaded,
    });
  }
};

// update Toko
const updateStore = async (req, res) => {
  const toko = await Store.findOne({ where: { user_id: req.userId } });
  let { nama_toko, no_telp_toko, bio, alamat, email } =
    req.body;

  try {
    const updateStore = await Store.update(
      {
        nama_toko,
        bio,
        no_telp_toko,
        alamat,
        email,
      },
      {
        where: {
          toko_id: toko.toko_id,
        },
      }
    );

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

// get product by toko
const getProductByStore = async (req, res) => {
  const userId = req.userId;
  const toko = await Store.findOne({ where: { user_id: userId } });

  try {
    const productsByStore = await sequelize.query(
      `SELECT p.produk_id, t.nama_toko, k.nama_kategori, p.nama_produk, p.harga, p.deskripsi, p.image, p.stock
    FROM "Produks" p
    INNER JOIN "Stores" t ON p.toko_id = t.toko_id
    INNER JOIN "Kategoris" k ON p.kategori_id = k.kategori_id
    `,
      {
        replacements: { tokoId: toko.toko_id },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    return res.status(StatusCode.OK).json({
      message: ResponseMessage.Loaded,
      data: productsByStore,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailLoaded,
    });
  }
};

// add produk
const addStoreProduct = async (req, res) => {
  let { kategori_id, nama_produk, harga, deskripsi, stock, harga_perKG, berat_P, expired } = req.body;
  const toko_id = (await Store.findOne({ where: { user_id: req.userId } }))
    .toko_id;
  const t = await sequelize.transaction();
  const image = req.files.image1[0].destination + req.files.image1[0].filename;

  try {
    const createProduct = await Produk.create(
      {
        produk_id: uuidv4(),
        toko_id,
        kategori_id,
        nama_produk,
        harga,
        deskripsi,
        image,
        stock,
        expired,
        harga_perKG,
        berat_P,
      },
      {
        transaction: t,
      }
    );

    // upload image
    if (createProduct) {
      if (req.files) {
        let productImageUpload = Object.values(req.files); // mengambil nilai object dari file yang diupload
        let images = [];
        for (let i of productImageUpload) {
          let newImage = {};
          newImage["product_id"] = createProduct.produk_id;
          newImage["filename"] = i[0].destination + i[0].filename;
          images.push(newImage);
        }
        const saveImage = await ProductImages.bulkCreate(images, {
          transaction: t,
        }); // menyimpan gambar yang dikirim ke database
        console.log(saveImage);
      }

      await t.commit(); // menyimpan data ke database ketika tidak ada error
      return res.status(StatusCode.OK).json({
        message: ResponseMessage.Added,
        data: createProduct,
      });
    }
  } catch (error) {
    await t.rollback(); // mengembalikan semuanya ketika ada error
    console.log(error);
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailAdded,
    });
  }
};

// update produk
const updateStoreProduct = async (req, res) => {
  let {
    kategori_id,
    nama_produk,
    harga,
    deskripsi,
    stock,
    harga_perKG,
    berat_P,
    expired,
  } = req.body;
  const productId = req.params.id;
  const toko_id = (await Toko.findOne({ where: { user_id: req.userId } }))
    .toko_id;
  const t = await sequelize.transaction();

  try {
    const createProduct = await Produk.update(
      {
        toko_id,
        kategori_id,
        nama_produk,
        harga,
        deskripsi,
        stock,
        harga_perKG,
        berat_P,
        expired
      },
      {
        where: {
          produk_id: productId,
        },
        transaction: t,
      }
    );

    // upload image
    if (createProduct) {
      if (req.files) {
        let productImageUpload = Object.values(req.files); // mengambil nilai object dari file yang diupload
        let images = [];
        for (let i of productImageUpload) {
          let newImage = {};
          newImage["product_id"] = productId;
          newImage["filename"] = i[0].destination + i[0].filename;
          images.push(newImage);
        }
        const saveImage = await ProductImages.bulkCreate(images, {
          updateOnDuplicate: ["product_id"],
          returning: true, // Jika ingin mendapatkan data yang sudah diupdate
          transaction: t,
        }); // menyimpan gambar yang dikirim ke database
        console.log(saveImage);
        if (images.length > 0) {
          const updateThumnail = await Produk.update(
            {
              image: images[0].filename,
            },
            {
              where: {
                produk_id: productId,
              },
              transaction: t,
            }
          );
        }
      }

      await t.commit(); // menyimpan data ke database ketika tidak ada error
      return res.status(StatusCode.OK).json({
        message: ResponseMessage.Updated,
      });
    }
  } catch (error) {
    await t.rollback(); // mengembalikan semuanya ketika ada error
    console.log(error);
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailAdded,
    });
  }
};

// list image product by produk_id
const productImageListByProductId = async (req, res) => {
  const produkId = req.params.id;

  try {
    const productImageList = await ProductImages.findAll({
      attributes: ["product_id", "id", "filename"],
      where: {
        product_id: produkId,
      },
    });

    return res.status(StatusCode.OK).json({
      message: ResponseMessage.Loaded,
      data: productImageList,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailLoaded,
    });
  }
};

// delete product image
const deleteProductImage = async (req, res) => {
  let { produk_id, image_id } = req.params;
  const prodImage = await ProductImages.findOne({ where: { id: image_id } });
  const t = await sequelize.transaction();

  try {
    const deleteImage = await ProductImages.destroy({
      where: {
        product_id: produk_id,
        id: image_id,
      },
      transaction: t,
    });

    if (deleteImage) {
      fs.unlink(prodImage.filename, (err) => {
        if (err) {
          console.error("Gagal menghapus gambar:", err);
          return;
        }
        console.log("Gambar berhasil dihapus");
      });
    }

    await t.commit(); // menyimpan data ke database ketika tidak ada error
    return res.status(StatusCode.OK).json({
      message: ResponseMessage.Removed,
    });
  } catch (error) {
    await t.rollback(); // mengembalikan semuanya ketika ada error
    console.log(error);
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailRemoved,
    });
  }
};

// add product to trash
const addProductToTrash = async (req, res) => {
  let productId = req.params.id;

  try {
    const productToTrash = await Produk.update(
      {
        isTrash: true,
      },
      {
        where: {
          produk_id: productId,
        },
      }
    );

    return res.status(StatusCode.OK).json({
      message: ResponseMessage.Removed,
    });
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailRemoved,
    });
  }
};


// get all store
const getAllStore = async (req, res) => {
  try {
    const toko = await Store.findAll();

    return res.status(StatusCode.OK).json({
      message: ResponseMessage.Loaded,
      data: toko,
    });
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailLoaded,
    });
  }
};

// get toko by id
const getStoreById = async (req, res) => {
  const tokoId = req.params.id;

  try {
    const toko = await Store.findAll({ where: { toko_id: tokoId } });
    const products = await Produk.findAll({
      include: [
        { model: Store, attributes: ["toko_id", "nama_toko"] },
        { model: Kategori, attributes: ["kategori_id", "nama_kategori"] },
      ],
      where: {
        toko_id: tokoId,
      },
    });

    // formatted data
    const formattedData = toko.map((item) => {
      return {
        profile_toko: {
          nama_toko: item.nama_toko,
          logo: item.logo,
          latitude: item.latitude,
          longitude: item.longitude,
        },
        list_produk: products.map((item) => {
          return {
            produk_id: item.produk_id,
            toko_id: item.toko_id,
            nama_toko: item.Toko.nama_toko,
            kategori_id: item.kategori_id,
            nama_kategori: item.Kategori.nama_kategori,
            nama_produk: item.nama_produk,
            harga: item.harga,
            deskripsi: item.deskripsi,
            image: item.image,
            stock: item.stock,
          };
        }),
      };
    });

    return res.status(StatusCode.OK).json({
      message: ResponseMessage.Loaded,
      data: formattedData[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.FailLoaded,
    });
  }
};

module.exports = {
  registerStore,
  getStore,
  updateStore,
  getProductByStore,
  addStoreProduct,
  updateStoreProduct,
  addProductToTrash,
  getAllStore,
  getStoreById,
  deleteProductImage,
  productImageListByProductId,
};
