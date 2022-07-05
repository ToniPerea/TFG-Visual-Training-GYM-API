const express = require("express");
const {register, login, update_user, get_user_by_email, users_list} = require("../controller/UserController");
const {
    add_exercise,
    get_exercise_by_id,
    update_exercise,
    delete_exercise
} = require("../controller/ExerciseController");
const {
    add_training,
    get_training_by_id,
    update_training,
    delete_training,
    trainings_list
} = require("../controller/TrainingController");

const router = express.Router();

// User Routes
router.post("/register", register);
router.post("/login", login);
router.put("/updateUser/:email", update_user)
router.get("/getUserByEmail/:email", get_user_by_email)
router.get("/getUsersList", users_list)

// Exercise Routes
router.post("/exercise", add_exercise)
router.get("/getExercise/:id", get_exercise_by_id)
router.put("/updateExercise", update_exercise)
router.delete("/deleteExercise/:id", delete_exercise)

// Training Routes
router.post("/training", add_training)
router.get("/getTraining", get_training_by_id)
router.put("/updateTraining", update_training)
router.delete("/deleteTraining", delete_training)
router.get("/getTrainingsList", trainings_list)

module.exports = router;
