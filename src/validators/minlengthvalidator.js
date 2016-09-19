import BaseValidator from './basevalidator.js';

class MinLengthValidator extends BaseValidator {
  constructor(message, attributes) {
    super(message, attributes);
    this.minLength = attributes['valMinlengthMin'];
  }
  isValid(value) {
    return !value || value.length >= this.minLength;
  }
}

module.exports = MinLengthValidator;
