const auth = require("../controllers/AuthController.js");
const VerifyUser = require("../middleware/VerifyUser");
let router = require("express").Router();

const {
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} = require("../validation");

router.post("/api/auth/login", loginValidation, auth.login);
router.get("/api/auth/me", VerifyUser.VerifyUser, auth.me);
router.get("/api/auth/remember_me", auth.remember_me_cek);
router.post(
  "/api/auth/forgot_password",
  forgotPasswordValidation,
  auth.forgot_password
);
router.patch(
  "/api/auth/reset_password/:email/:token",
  resetPasswordValidation,
  auth.reset_password
);
router.delete("/api/auth/logout", VerifyUser.VerifyUser, auth.logout);

module.exports = router;
