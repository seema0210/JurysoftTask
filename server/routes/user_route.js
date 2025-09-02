const express = require("express");
const router = express.Router();
const {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/user_controller");

router.get("/", getAllUsers);
router.post("/create", createUser);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;