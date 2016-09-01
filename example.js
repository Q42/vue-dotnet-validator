import dotnetValidator from './index';

var customValidators = {};

class CustomValidator extends dotnetValidator.BaseValidator {
    isValid(value) {
        return !value || value == 'Hello';
    }
}

customValidators.Customvalidator = CustomValidator;



Vue.component('validator', dotnetValidator.validator(customValidators));
Vue.component('validator-group', dotnetValidator.validatorGroup);

new Vue({
    el: '#example-site'
});
