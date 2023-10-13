const Validator = require("validator");
const isEmpty = require("isempty");

//check validity of register inputs
module.exports = function validRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.bu_email = !isEmpty(data.bu_email) ? data.bu_email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.conpass = !isEmpty(data.conpass) ? data.conpass : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name Required";
  }

  if (Validator.isEmpty(data.bu_email)) {
    errors.bu_email = "Email Required";
  } else if (!Validator.isEmail(data.bu_email)) {
    errors.bu_email = "Email is invalid";
  } else if (!data.bu_email.endsWith("@bu.edu")) {
    errors.bu_email = "Only @bu.edu emails are allowed";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "password Required";
  }

  if (!Validator.equals(data.password, data.conpass)) {
    errors.conpass = "Password does not match";
  }

  if (Validator.isEmpty(data.conpass)) {
    errors.conpass = "confirm password Required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
