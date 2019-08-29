import { validatorGroup, validator, BaseValidator } from './dist/index';

var customValidators = {};

class MyCustomValidator extends BaseValidator {
    isValid(value) {
        return !value || value == 'Hello';
    }
}

customValidators.Mycustomvalidator = MyCustomValidator;

Vue.component('validator', validator(customValidators));
Vue.component('vue-dotnet-validator-group', validatorGroup);


Vue.component('test-component', {
  data() {
    return {
        inputValue: ''
    }
  },
    watch: {
      inputValue() {
          console.log('watcher, ', this.inputValue);
      }
    }
});

new Vue({
    el: '#example-site'
});
