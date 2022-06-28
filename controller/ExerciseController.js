const exercise = require("../model/ExerciseSchema")

const add_exercise = async (req, res) => {
    try {
        // const {name, weight, series, repetitions, gif} = req.body;

        const newExercise = new exercise(req.body);

        await newExercise.save().then(() => {
            res.status(200).send({msg: "Exercise Added", data: newExercise});
        }).catch((error) => {
            res.status(404).send("Exercise NOT Added Correctly!!! Error: " + error.msg);
        })
    } catch
        (err) {
        res.status(500).json({
            error: err.message,
        });
    }

}

const get_exercise_by_id = async (req, res) => {
    try {
        await exercise.findOne({_id: req.body}).then((result) => {
            if (!result) {
                res.status(404).json({
                    msg: "Exercise not found.",
                });
            }

            res.status(200).json(result);
        })


    } catch
        (err) {
        res.status(500).json({
            error: err.message,
        });
    }
}

const update_exercise = async (req, res) => {
    const id = {'_id': req.body._id};

    try {
        await exercise.findOneAndUpdate(id, req.body).then((result) => {
            if (!result) {
                res.status(404).json({
                    msg: "Exercise Not Found.",
                });
            }

            res.status(200).json(req.body);
        })


    } catch
        (err) {
        res.status(500).json({
            error: err.message,
        });
    }

}

const delete_exercise = async (req, res) => {
    try {
        await exercise.deleteOne({_id: req.body}).then(() => {
            res.status(200).json({msg: 'Exercise Delete'});
        })
    } catch
        (err) {
        res.status(500).json({
            error: err.message,
        });
    }
}


module.exports = {add_exercise, get_exercise_by_id, update_exercise, delete_exercise};