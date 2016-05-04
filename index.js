var validator = require('./src/validator.vue');
var validatorGroup = require('./src/validator-group.vue');
var baseValidator = require('./src/validators/basevalidator');

module.exports = {
    validatorGroup: validatorGroup,
    validator: validator,
    validatorBaseClass: baseValidator
};
