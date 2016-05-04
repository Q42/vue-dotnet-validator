var validator = require('./src/validator.vue');
var validatorGroup = require('./src/validator-group.vue');
import BaseValidator from './src/validators/basevalidator';

class CustomValidator extends BaseValidator {
    isValid(value) {
        return !value || value == 'Hello';
    }
}

validator.validators['mycustomvalidator'] = CustomValidator;

Vue.component('vue-dotnet-validator', validator);
Vue.component('vue-dotnet-validator-group', validatorGroup);

new Vue({
    el: '#example-site'
});
