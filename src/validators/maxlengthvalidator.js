import BaseValidator from './basevalidator.js';

class MaxLengthValidator extends BaseValidator {
  constructor(message, attributes) {
    super(message, attributes);
    this.maxLength = attributes['valMaxlengthMax'];
  }
  isValid(value) {
    return !value || value.length <= this.maxLength;
  }
}

module.exports = MaxLengthValidator;
