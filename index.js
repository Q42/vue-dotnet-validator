var validator = require('./src/validator.vue');
var validatorGroup = require('./src/validator-group.vue');
import baseValidator from './src/validators/basevalidator';

module.exports = {
    validatorGroup: validatorGroup,
    validator: validator,
    BaseValidator: baseValidator
};
