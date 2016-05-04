import BaseValidator from './basevalidator';

class RegexValidator extends BaseValidator {
  constructor(message, attributes) {
    super(message, attributes);
    this.regex = new RegExp(attributes['val-regex-pattern']);
  }
  isValid(value) {
    return !value || this.regex.test(value);
  }
}

module.exports = RegexValidator;
