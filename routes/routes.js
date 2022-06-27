const express = require("express");
const { register, login } = require("../controller/UserController");
const { add_training, get_training_by_id, update_training, delete_training} = require("../controller/TrainingController");

const router = express.Router();

// User Routes
router.post("/register", register);
router.post("/login", login);

// Training Routes
router.post("/training", add_training)
router.get("/getTraining", get_training_by_id)
router.put("/updateTraining", update_training)
router.delete("/deleteTraining", delete_training)

module.exports = router;
