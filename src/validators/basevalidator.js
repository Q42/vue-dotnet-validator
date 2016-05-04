/**
 * This class contains the basic api of a custom validator on the portal site.
 */
class BaseValidator {
  constructor(message, dataAttributes) {
    this.message = message;
    this.attributes = dataAttributes;
  }

  getMessage() {
    return this.message;
  }

  isValid() {}
}

export default BaseValidator;
