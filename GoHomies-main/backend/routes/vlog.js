const express = require("express");
const { createVlog, getAllVlogs, likeVlog, unlikeVlog, addCommentToVlog } = require("../controllers/vlog");

const router = express.Router();

router.post("/create", createVlog);
router.get("/fetch", getAllVlogs);
router.post("/like/:vlogId", likeVlog);
router.post("/unlike/:vlogId", unlikeVlog);
router.post("/comment/:vlogId", addCommentToVlog);

module.exports = router;
