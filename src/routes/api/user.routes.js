const { userProfile } = require("../../helpers/multerUploads");
const {
  GetallUser,
  getUserProfile,
  updateProfile,
} = require("../../controller/user.controller");
const authJwt = require("../../middlewares/auth.jwt");
const alamatController = require("../../controller/alamat.controller");

module.exports = (express, app, default_router) => {
  const router = express.Router();

  // get All User
  router.get("/users", GetallUser);

  // user profiles
  router.get("/profile", [authJwt], getUserProfile); // get profile
  router.put("/profile/update", [authJwt, userProfile], updateProfile); // update profile

  // user address
    router.post("/alamat", [authJwt], alamatController.createAlamat); // add address
    router.put("/alamat/update", [authJwt], alamatController.updateAlamat); // update address
    router.get("/alamat", [authJwt], alamatController.getAllAlamat); // get list address
    router.delete("/alamat/:id", [authJwt], alamatController.deleteAlamat); // delete address
    router.get("/alamat/:id", alamatController.GetAlamatById); // get address by id

  app.use(default_router, router);
};
