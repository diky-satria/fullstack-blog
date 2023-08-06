const beranda = require("../../controllers/user/BerandaController.js");
let router = require("express").Router();

router.get("/api/beranda", beranda.getLatestPosts);
router.get("/api/topik", beranda.getAllTopic);
router.get("/api/topik_select", beranda.getAllTopicForSelect);
router.get("/api/topik/:id", beranda.getPostById);

module.exports = router;
