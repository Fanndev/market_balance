const authJwt = require("../../middlewares/auth.jwt");
const {
  getallCategory,
  addCategory,
  deleteCategory,
  updateCategory,
} = require("../../controller/kategori.controller");
const {
  getAllProducts,
  getProductById,
  productSearch,
} = require("../../controller/product.controller");
const {
  addProductToCart,
  updateUserCart,
  deleteUserCart,
  getProductOnCart,
} = require("../../controller/cart.controller");
const {
  registerStore,
  getStore,
  getProductByStore,
  addStoreProduct,
  updateStoreProduct,
  addProductToTrash,
  getAllStore,
  getStoreById,
  updateStore,
  deleteProductImage,
  productImageListByProductId,
} = require("../../controller/store.controller");
const { checkStockMiddleware } = require("../../middlewares/common/user");
const { checkStore, haveStore } = require("../../middlewares/common/toko");
const { storeUpload, uploads } = require("../../helpers/multerUploads");
const { fileLImmitUpload } = require("../../helpers/common/error");

module.exports = (express, app, default_router) => {
  const router = express.Router();

  // Store
  router.post(
    "/register-store",
    [authJwt, checkStore, storeUpload, fileLImmitUpload],
    registerStore
  ); // Create toko
  router.put("/store/update", [authJwt, haveStore], updateStore); // Update Toko
  router.get("/store", [authJwt, haveStore], getStore); // Get Toko saya
  router.get("/stores", getAllStore); // get all store

  // Product
  router.get("/store/products", [authJwt, haveStore], getProductByStore); // get produk by toko_id
  router.post("/product", [authJwt, haveStore, uploads], addStoreProduct); // tambah produk
  // update store product
  router.put("/product/:id", [authJwt, haveStore, uploads], updateStoreProduct); // edit produk
  router.get(
    "/product/list-image/:id",
    [authJwt, haveStore],
    productImageListByProductId
  );
  router.delete(
    "/product/delete-image/:produk_id/:image_id",
    [authJwt, haveStore],
    deleteProductImage
  ); // delete product image
  router.put("/product/delete/:id", [authJwt, haveStore], addProductToTrash); // add product to trash
  router.get("/stores/:id", getStoreById); // get store by id

  // Cart
  router.post("/cart", [authJwt, checkStockMiddleware], addProductToCart); // add product to cart
  router.get("/cart", [authJwt], getProductOnCart); // get product on cart
  router.patch("/cart/:id", [authJwt], updateUserCart); // update cart qty
  router.delete("/cart/:id", [authJwt], deleteUserCart); // delete cart

  // Produk
  router.get("/products", getAllProducts); // get all products
  router.get("/products/search", productSearch); // search products
  router.get("/product/:id", getProductById); // get product by id

  // category
  router.get("/categorys", [authJwt], getallCategory); // get category page
  router.post("/category/add", [authJwt], addCategory); // create category page
  router.put("/category/update", [authJwt], updateCategory); // update category
  router.get("/category/delete/:id", [authJwt], deleteCategory); // delete category

  app.use(default_router, router);
};
