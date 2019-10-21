const express = require("express");
const router = express.Router();
const pageController = require("../controllers/user");


router.get("/",pageController.Index);
router.post("/",pageController.postImage)
router.get("/resim/:imageurl",pageController.showImage);
router.get("/bilgi",pageController.bilgi);
module.exports = router;