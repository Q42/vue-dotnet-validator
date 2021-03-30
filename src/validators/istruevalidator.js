import BaseValidator from './basevalidator.js';

export default class IsTrueValidator extends BaseValidator {
  isValid(value) {
    return value === true;
  }
}
