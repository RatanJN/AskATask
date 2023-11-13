const Validator = require('validator');
const isEmpty = require('isempty');

//check validity of login inputs
module.exports = function validLoginInput(data) {
  let errors = {};

  data.bu_email = !isEmpty(data.bu_email) ? data.bu_email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.bu_email)) {
    errors.bu_email = 'Email Required';
  } else if (!Validator.isEmail(data.bu_email)) {
    errors.bu_email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'password Required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
