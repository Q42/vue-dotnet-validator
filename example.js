import dotnetValidator from './dist/index';

var customValidators = {};

class CustomValidator extends dotnetValidator.BaseValidator {
    isValid(value) {
        return !value || value == 'Hello';
    }
}

customValidators.Customvalidator = CustomValidator;



Vue.component('validator', dotnetValidator.validator(customValidators));
Vue.component('vue-dotnet-validator-group', dotnetValidator.validatorGroup);

new Vue({
    el: '#example-site'
});
