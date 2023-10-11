const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validRegisterInput = require("../validations/valid_register");
const validLoginInput = require("../validations/valid_login");

let User = require("../models/user");

//function for registering
exports.register = (req, res) => {
  const { errors, isValid } = validRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ bu_email: req.body.bu_email }).then((register) => {
    if (register) {
      return res.status(400).json({ bu_email: "Email already exists" });
    }

    const newRegister = new User({
      name: req.body.name,
      bu_email: req.body.bu_email,
      password: req.body.password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newRegister.password, salt, (err, hash) => {
        if (err) throw err;
        newRegister.password = hash;
        newRegister
          .save()
          .then((register) => res.json(register))
          .catch((err) => console.log(err));
      });
    });
  });
};

//function for login
exports.login = (req, res) => {
  const { errors, isValid } = validLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const bu_email = req.body.bu_email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ bu_email }).then((login) => {
    // Check if user exists
    if (!login) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, login.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: login.id,
          name: login.name,
        };

        // Sign token
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: "3h",
          },
          (err, token) => {
            res.json({
              payload,
              success: true,
              token: token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
};

//function for required login
exports.requireLogin = (req, res, next) => {
  const token = req.headers.authorization;
  const login = jwt.verify(token, process.env.JWT_SECRET);
  req.login = login;
  next();
};
