const user = require("../model/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const training = require("../model/TrainingSchema");
const SECRET_KEY = '8VXWEO1X4IyI1f41Nn4H3g=='

const register = async (req, res) => {
    const {name, age, username, email, password, role, status} = req.body;

    const saltRounds = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new user({name, username, email, password: passwordHash, role, status, age});

    await newUser.save().then(() => {
        res.status(200).send({msg: "Login Successful", data: newUser});
    }).catch((error) => {
        res.status(404).send("User NOT Registered Correctly!!! Error: " + error.msg);
    })
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        let userEmail;

        if (!email || !password) {
            res.status(400).json({
                msg: "Missing fields email or password",
            });
        }

        await user.findOne({email: email}).then((result) => {
            userEmail = result;
            if (!result) {
                res.status(404).json({
                    msg: "Email not found",
                });
            }
        })


        if (!userEmail) {
            res.status(404).json({
                msg: "Email not found",
            });
        }

        const uncryptPass = await bcrypt.compare(password, userEmail.password);

        if (!uncryptPass) {
            res.status(401).json({
                msg: "Incorrect password",
            });
        }
        const expiresIn = 24 * 60 * 60
        const accessToken = jwt.sign({email: userEmail.email}, SECRET_KEY, {expiresIn: expiresIn});

        const dataUser = {
            name: userEmail.name,
            email: userEmail.email,
            accessToken: accessToken,
            expiresIn: expiresIn
        }

        res.status(200).json({
            dataUser,
            msg: `Login was successful with email ${userEmail.email}`,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};

const get_user_by_email = async (req, res) => {
    const {email} = req.params;

    try {
        await user.findOne({email: email}).then((result) => {
            if (!result) {
                res.status(404).json({
                    msg: "User not found.",
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

const update_user = async (req, res) => {
    const email = {'email': req.params.email};

    try {
        if (req.body.role === 'Cliente') {
            await training.updateMany({'email_client': req.params.email}, {'email_client': req.body.email})
        } else if (req.body.role === 'Entrenador') {
            await training.updateMany({'email_trainer': req.params.email}, {'email_trainer': req.body.email})
        }

        await user.findOne(email).then((result) => {
            if (!result) {
                res.status(404).json({
                    msg: "User Not Found.",
                });
            }

            result.name = req.body.name
            result.age = req.body.age
            result.email = req.body.email
            result.role = req.body.role

            result.save()

            const expiresIn = 24 * 60 * 60
            const accessToken = jwt.sign({email: req.body.email}, SECRET_KEY, {expiresIn: expiresIn});

            const dataUser = {
                name: req.body.name,
                email: req.body.email,
                accessToken: accessToken,
                expiresIn: expiresIn
            }

            res.status(200).json({dataUser});
        })


    } catch
        (err) {
        res.status(500).json({
            error: err.message,
        });
    }

}

const users_list = async (req, res) => {
    try {
        await user.find().then((result) => {
            res.status(200).json(result);
        })
    } catch
        (err) {
        res.status(500).json({
            error: err.message,
        });
    }
}

module.exports = {register, login, update_user, get_user_by_email, users_list};
