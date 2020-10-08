const express = require("express");
const router = express.Router();

const textQueryController = require("../controllers/textQuery");

router.post("/textQuery", textQueryController.text_query_post);

module.exports = router;
