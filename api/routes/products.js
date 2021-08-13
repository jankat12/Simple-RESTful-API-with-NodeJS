const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const PorductsController = require("../controllers/products");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.get("/", PorductsController.products_get_all);

router.post(
  "/",
  checkAuth,
  upload.single("productImage"),
  PorductsController.products_create_product
);

router.get("/:productId", PorductsController.products_get_product);

router.patch(
  "/:productId",
  checkAuth,
  PorductsController.products_update_product
);

router.delete("/:productId", checkAuth, PorductsController.products_delete);

module.exports = router;
