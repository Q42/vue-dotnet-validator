var validator = require('./src/validator.js');
var validatorGroup = require('./src/validator-group.vue');
import baseValidator from './src/basevalidator';

module.exports = {
    validatorGroup: validatorGroup,
    validator: validator,
    BaseValidator: baseValidator
};
