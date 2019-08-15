import BaseValidator from './basevalidator.js';

export default class RegexValidator extends BaseValidator {
  constructor(message, attributes) {
    super(message, attributes);
    this.regex = new RegExp(attributes['valRegexPattern']);
  }
  isValid(value) {
    return !value || this.regex.test(value);
  }
}
