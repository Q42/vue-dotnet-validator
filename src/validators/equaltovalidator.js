import BaseValidator from './basevalidator.js';

export default class EqualToValidator extends BaseValidator {
  constructor(message, attributes, validatorGroup) {
    super(message, attributes, validatorGroup);
    this.otherFieldName = attributes['valEqualtoOther'];
  }
  isValid(value) {
    const fields = this.validatorGroup.findValidatorsByName(this.otherFieldName);
    if(fields == null) {
      return true;
    }
    const otherField = fields[0];

    return !value || !otherField || value == otherField.val;
  }
}
