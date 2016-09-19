import validator from './src/validator.js';
import validatorGroup from './src/validator-group.js';
import baseValidator from './src/validators/basevalidator.js';

module.exports = {
    validatorGroup: validatorGroup,
    validator: validator,
    BaseValidator: baseValidator
};
