import BaseValidator from './basevalidator.js';

export default class MinLengthValidator extends BaseValidator {
  constructor(message, attributes) {
    super(message, attributes);
    this.minLength = attributes['valMinlengthMin'];
  }
  isValid(value) {
    return !value || value.length >= this.minLength;
  }
}
