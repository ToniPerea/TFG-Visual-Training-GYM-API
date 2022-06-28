const mongoose = require("mongoose");
const exercise = require("../model/ExerciseSchema");

const exerciseCompleteSchema = new mongoose.Schema({
    exercise: {type: exercise.schema, required:true},
    weight: {type: String, required: true},
    series: {type: Number, required: true},
    repetitions: {type: Number, required: true},
    _id: false
})

const trainingSchema = new mongoose.Schema({
    exercises: {type: Array, of: exerciseCompleteSchema, required: true},
    date_of_training: {type: String, required: true},
    email_client: {type: String, required: true},
    email_trainer: {type: String, required: true}
});

module.exports = mongoose.model("trainings", trainingSchema);