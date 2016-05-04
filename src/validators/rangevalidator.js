import BaseValidator from './basevalidator';

class RangeValidator extends BaseValidator {
  constructor(message, attributes) {
    super(message, attributes);
    this.min = parseInt(attributes['val-range-min']);
    this.max = parseInt(attributes['val-range-max']);
  }
  isValid(value) {
    let parsedValue = parseInt(value, 10) || -1;
    return !value || (!isNaN(parsedValue) && parsedValue >= this.min && parsedValue <= this.max);
  }
}

module.exports = RangeValidator;
