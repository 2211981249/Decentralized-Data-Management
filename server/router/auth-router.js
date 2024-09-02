const express = require("express");
const router = express.Router();
const {
  home,
  register,
  login,
  user,
  uploadDocument,
  getDocument
} = require("../controllers/auth-controller");
const validate = require("../middlewares/validate-middlewares");
const { signupSchema, loginSchema } = require("../validators/auth-validator");
const authMiddleware = require("../middlewares/auth-middleware");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.route("/").get(home);
router.route("/register").post(validate(signupSchema), register);
router.route("/login").post(validate(loginSchema), login);
router.route("/user").get(authMiddleware, user);
router.route("/upload-document").post(upload.single("file"), uploadDocument);
router.route("/get-document").get(getDocument);
module.exports = router;
