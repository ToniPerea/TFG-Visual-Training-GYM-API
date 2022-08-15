const exercise = require("../model/ExerciseSchema")
const user = require("../model/UserSchema");

/**
 * @swagger
 * /exercise:
 *  post:
 *    security:
 *       - bearerAuth: []
 *    summary: Crea un ejercicio en la base de datos
 *    tags:
 *      - Exercise
 *    description: Crea un ejercicio en la base de datos
 *    parameters:
 *    - name: name
 *      description: Nombre del ejercicio
 *      in: path
 *      required: true
 *      type: string
 *    - name: gif
 *      description: url del gif
 *      in: path
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Exercise Added y datos del ejercicio
 *      500:
 *        description: Error Message
 *
 */
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

/**
 * @swagger
 * /getExercise/:id:
 *  get:
 *    security:
 *       - bearerAuth: []
 *    summary: Devuelve el ejercicio con el ID coincidente
 *    tags:
 *      - Exercise
 *    description: Devuelve el ejercicio con el ID coincidente
 *    parameters:
 *    - name: id
 *      description: id del ejercicio
 *      in: path
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Objeto JSON
 *
 */
const get_exercise_by_id = async (req, res) => {
    const {id} = req.params;
    try {
        await exercise.findOne({_id: id}).then((result) => {
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
    const {id} = req.params;
    try {
        await exercise.deleteOne({_id: id}).then(() => {
            res.status(200).json({msg: 'Exercise Delete'});
        })
    } catch
        (err) {
        res.status(500).json({
            error: err.message,
        });
    }
}

/**
 * @swagger
 * /getExercisesList:
 *  get:
 *    security:
 *       - bearerAuth: []
 *    summary:  Devuelve una lista de todos los ejercicios
 *    tags:
 *      - Exercise
 *    description: Devuelve una lista de todos los ejercicios
 *    responses:
 *      200:
 *        description: Objeto JSON con la lista
 *
 */
const exercises_list = async (req, res) => {
    try {
        await exercise.find().then((result) => {
            res.status(200).json(result);
        })
    } catch
        (err) {
        res.status(500).json({
            error: err.message,
        });
    }
}


module.exports = {add_exercise, get_exercise_by_id, update_exercise, delete_exercise, exercises_list};