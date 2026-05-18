const express = require("express");
const router = express.Router();

const articleController = require("../controllers/articleController");
const { isAdmin } = require("../middlewares/roleMiddleware"); //Protect article

const multer = require("multer");
const path = require("path");

//MULTER CONFIG
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

//ROUTES
router.get("/list", articleController.getHome);

router.get("/add-article", isAdmin, articleController.getAddArticle);

router.post(
  "/articles",
  isAdmin,
  upload.single("uploaded-file"),
  articleController.postAddArticle,
);

router.get("/edit/:id", isAdmin, articleController.getEdit);

router.post(
  "/update/:id",
  isAdmin,
  upload.single("uploaded-file"),
  articleController.postUpdate,
);

router.get("/delete/:id", isAdmin, articleController.deleteArticle);

module.exports = router;
