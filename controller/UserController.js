const user = require("../model/UserSchema");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const saltRounds = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new user({ email, password: passwordHash });

    await newUser.save((err) => {
      if (err) {
        res.status(400).send("Error to register user");
      } else {
        res.status(200).send("User registered correctly!!!");
      }
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        msg: "Missing fields email or password",
      });
    }

    const userEmail = await user.findOne({ email: email });

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
      msg: `Login was succesful with email ${userEmail.email}`,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = { register, login };
