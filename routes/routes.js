const express = require("express");
const { register, login } = require("../controller/UserController");
const { add_exercise, get_exercise_by_id, update_exercise, delete_exercise} = require("../controller/ExerciseController");

const router = express.Router();

// User Routes
router.post("/register", register);
router.post("/login", login);

// Training Routes
router.post("/exercise", add_exercise)
router.get("/getExercise", get_exercise_by_id)
router.put("/updateExercise", update_exercise)
router.delete("/deleteExercise", delete_exercise)

module.exports = router;
