const setting = require("../../controllers/setting/SettingController.js");
const VerifyUser = require("../../middleware/VerifyUser");
let router = require("express").Router();

const { ubahPasswordVal } = require("../../validation");

router.patch(
  `/api/ubah_password`,
  VerifyUser.VerifyUser,
  ubahPasswordVal,
  setting.ubahPassword
);

module.exports = router;
