const User = require("../model/UserSchema");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { username, password } = req.body;

  const saltRounds = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({ username, password: passwordHash });

  await newUser.save((err) => {
    if (err) {
      res.status(400).send("Error to register user");
    } else {
      res.status(200).send("User registered correctly!!!");
    }
  });
};

module.exports = { register };
