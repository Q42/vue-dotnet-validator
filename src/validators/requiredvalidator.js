import BaseValidator from './basevalidator';

class RequiredValidator extends BaseValidator {
  isValid(value) {
    return !!value;
  }
}

module.exports = RequiredValidator;
