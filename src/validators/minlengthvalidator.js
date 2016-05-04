import BaseValidator from './basevalidator';

class MinLengthValidator extends BaseValidator {
  constructor(message, attributes) {
    super(message, attributes);
    this.minLength = attributes['val-minlength-min'];
  }
  isValid(value) {
    return !value || value.length >= this.minLength;
  }
}

module.exports = MinLengthValidator;
