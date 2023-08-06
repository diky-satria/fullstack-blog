const user = require("../../controllers/admin/UserController.js");
let router = require("express").Router();
const VerifyUser = require("../../middleware/VerifyUser");
const { editUserVal, addUserVal } = require("../../validation");

router.get(
  "/api/user",
  VerifyUser.VerifyUser,
  VerifyUser.VerifyRole,
  user.getAllUser
);
router.post(
  "/api/user",
  VerifyUser.VerifyUser,
  VerifyUser.VerifyRole,
  addUserVal,
  user.addUser
);
router.patch(
  "/api/user/:id",
  VerifyUser.VerifyUser,
  VerifyUser.VerifyRole,
  editUserVal,
  user.editUserById
);
router.patch(
  "/api/user/:id/:status",
  VerifyUser.VerifyUser,
  VerifyUser.VerifyRole,
  user.editUserStatus
);
router.delete(
  "/api/user/:id",
  VerifyUser.VerifyUser,
  VerifyUser.VerifyRole,
  editUserVal,
  user.deleteUserById
);

module.exports = router;
