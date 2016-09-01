import BaseValidator from './basevalidator';

class RangeValidator extends BaseValidator {
  constructor(message, attributes) {
    super(message, attributes);
    this.min = parseFloat(attributes['valRangeMin']);
    this.max = parseFloat(attributes['valRangeMax']);
  }
  isValid(value) {
    let parsedValue = parseFloat(value);
    return (!value && parsedValue != 0) || (!isNaN(parsedValue) && parsedValue >= this.min && parsedValue <= this.max);
  }
}

module.exports = RangeValidator;
