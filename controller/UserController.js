const user = require("../model/UserSchema");
const bcrypt = require("bcrypt");

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

        res.status(200).json({
            msg: `Login was successful with email ${userEmail.email}`,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};

module.exports = {register, login};
