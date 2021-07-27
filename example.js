/* global Vue */
import { validatorGroup, validator, BaseValidator } from './index';
import newValidatorGroup from './src/validator-group-new';
import newValidator from './src/validator-new';

import { createApp } from 'vue'
import SomeComponent from './src/components/SomeComponent.vue'

class MyCustomValidator extends BaseValidator {
  isValid(value) {
    return !value || value == 'Hello';
  }
}

const customValidators = {
  MyCustomValidator
};

const app = createApp({})
  .component('validator', validator(customValidators))
  .component('vue-dotnet-validator-group', validatorGroup)

  .component('validator-new', newValidator(customValidators))
  .component('validator-group-new', newValidatorGroup)

  .component('some-component', SomeComponent)
  .component('test-component', {
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
  })
  .component('test-async-component', function (resolve, reject) {
    // setTimeout(function () {
    //   // Pass the component definition to the resolve callback
    //   resolve({})
    // }, 2500)
  })

app.mount('#example-site')
