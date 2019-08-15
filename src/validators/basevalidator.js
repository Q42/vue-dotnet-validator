/**
 * This class contains the basic api of a custom validator on the portal site.
 */
export default class BaseValidator {
  constructor(message, dataAttributes, validatorGroup) {
    this.message = message;
    this.attributes = dataAttributes;
    this.validatorGroup = validatorGroup;
  }

  getMessage() {
    return this.message;
  }

  isValid() {}
}
