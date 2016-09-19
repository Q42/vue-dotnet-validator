import BaseValidator from './basevalidator.js';

class RequiredValidator extends BaseValidator {
  isValid(value) {
    return !!value;
  }
}

module.exports = RequiredValidator;
