import BaseValidator from './basevalidator.js';

export default class StringLengthValidator extends BaseValidator {
  constructor(message, attributes) {
    super(message, attributes);
    this.maxLength = attributes['valLengthMax'];
    this.minLength = attributes['valLengthMin'];
  }
  isValid(value) {
    return !value ||
      (value.length >= this.minLength && value.length <= this.maxLength);
  }
}
