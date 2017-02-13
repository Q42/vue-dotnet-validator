/**
 * This class contains the basic api of a custom validator on the portal site.
 */
class BaseValidator {
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

export default BaseValidator;
