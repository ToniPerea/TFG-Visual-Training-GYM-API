const training = require("../model/TrainingSchema")
const user = require("../model/UserSchema");

const add_training = async (req, res) => {
    try {
        // const {name, weight, series, repetitions, gif} = req.body;

        const newTraining = new training(req.body);

        await newTraining.save().then(() => {
            res.status(200).send({msg: "Training Added", data: newTraining});
        }).catch((error) => {
            res.status(404).send("Training NOT Added Correctly!!! Error: " + error.msg);
        })
    } catch
        (err) {
        res.status(500).json({
            error: err.message,
        });
    }

}

const get_training_by_id = async (req, res) => {
    try {
        await training.findOne({_id: req.body}).then((result) => {
            if (!result) {
                res.status(404).json({
                    msg: "Training not found.",
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

const update_training = async (req, res) => {
    const id = {'_id': req.body._id};

    try {
        await training.findOneAndUpdate(id, req.body).then((result) => {
            if (!result) {
                res.status(404).json({
                    msg: "Training Not Found.",
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

const delete_training = async (req, res) => {
    try {
        await training.deleteOne({_id: req.body}).then(() => {
            res.status(200).json({msg: 'Training Delete'});
        })
    } catch
        (err) {
        res.status(500).json({
            error: err.message,
        });
    }
}

const trainings_list = async (req, res) => {
    try {
        await training.find().then((result) => {
            res.status(200).json(result);
        })
    } catch
        (err) {
        res.status(500).json({
            error: err.message,
        });
    }

}


module.exports = {add_training, get_training_by_id, update_training, delete_training, trainings_list};