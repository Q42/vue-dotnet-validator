/* global Vue */
import { validatorGroup, validator, BaseValidator } from './index';

class MyCustomValidator extends BaseValidator {
    isValid(value) {
        return !value || value == 'Hello';
    }
}

const customValidators = {
  MyCustomValidator
};

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

Vue.component('test-async-component', function (resolve, reject) {
  setTimeout(function () {
    // Pass the component definition to the resolve callback
    resolve({})
  }, 2500)
})

new Vue({
    el: '#example-site'
});
