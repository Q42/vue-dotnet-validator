import BaseValidator from './basevalidator.js';

export default class RequiredValidator extends BaseValidator {
  isValid(value) {
    return !!value;
  }
}
