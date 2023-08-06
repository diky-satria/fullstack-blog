const post = require("../../controllers/user/PostController.js");
let router = require("express").Router();
const VerifyUser = require("../../middleware/VerifyUser");

const {
  addOneVal,
  addTwoVal,
  editOneVal,
  editTwoVal,
} = require("../../validation");

router.get("/api/post", VerifyUser.VerifyUser, post.getAllPost);
router.get("/api/post/:id", VerifyUser.VerifyUser, post.detailPost);

router.post("/api/post/addOne", VerifyUser.VerifyUser, addOneVal, post.addOne);
router.post("/api/post/addTwo", VerifyUser.VerifyUser, addTwoVal, post.addTwo);
router.post("/api/post/addThree", VerifyUser.VerifyUser, post.addThree);

router.post(
  "/api/post/editOne",
  VerifyUser.VerifyUser,
  editOneVal,
  post.editOne
);
router.post(
  "/api/post/editTwo",
  VerifyUser.VerifyUser,
  editTwoVal,
  post.editTwo
);
router.patch("/api/post/editThree/:id", VerifyUser.VerifyUser, post.editThree);
router.delete("/api/post/delete/:id", VerifyUser.VerifyUser, post.deletePost);
router.patch(
  "/api/post/status/:id/:status",
  VerifyUser.VerifyUser,
  post.editStatus
);

module.exports = router;
