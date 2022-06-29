const user = require("../model/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const SECRET_KEY = '8VXWEO1X4IyI1f41Nn4H3g=='

const register = async (req, res) => {
    const {name, age, username, email, password, role, status} = req.body;

    const saltRounds = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new user({name, username, email, password: passwordHash, role, status, age});

    await newUser.save().then(() => {
        res.status(200).send({msg:"Login Successful", data: newUser});
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

const update_user = async (req, res) => {
    const id = {'_id': req.body._id};

    try {
        await user.findOneAndUpdate(id, req.body).then((result) => {
            if (!result) {
                res.status(404).json({
                    msg: "User Not Found.",
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

module.exports = {register, login, update_user};
