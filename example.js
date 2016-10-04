import dotnetValidator from './dist/index';

var customValidators = {};

class MyCustomValidator extends dotnetValidator.BaseValidator {
    isValid(value) {
        return !value || value == 'Hello';
    }
}

customValidators.Mycustomvalidator = MyCustomValidator;



Vue.component('validator', dotnetValidator.validator(customValidators));
Vue.component('vue-dotnet-validator-group', dotnetValidator.validatorGroup);


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
