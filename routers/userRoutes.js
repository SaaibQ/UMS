const express = require("express");
const {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getUser,
} = require("./../controllers/userController.js");

const router = express.Router();

router.route("/").get(getUsers).post(addUser);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
