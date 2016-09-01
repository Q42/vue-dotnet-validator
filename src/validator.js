module.exports = (extraValidators = {}) => {
  let validators = require('./default-validators');
  // Add extraValidators to the default validators.
  for (var attrname in extraValidators) { validators[attrname] = extraValidators[attrname]; }

  return {
    props: {
      // Value is the value that will be validated
      'value': {
        default: ''
      },
      // This parameter can be used to provide additional complex validation from your app
      'extra-error-message': {
        default: ''
      }
    },
    data() {
      return {
        validators: [],
        blurred: false
      };
    },
    attached() {
      if(!this.$els.field) {
        console.error('Field is missing!', this);
        return;
      }

      this.findValidators();

      if(this.$els.message.innerText) {
        // When we already have innerText, it means the server has output a validation error.
        // We need to replace that validation message as soon as the user changes the value of the input
        this.blurred = true;
      }

      // Make sure we update the validation message as soon as it changes.
      this.$watch('validationMessage', this.showValidationMessage);

      this.$els.field.addEventListener('blur', this.blurField);
      this.$els.field.addEventListener('change', this.changeField);
      this.$dispatch('validator-created', this);
    },
    beforeDestroy() {
      this.$dispatch('validator-removed', this);
    },
    methods: {
      blurField() {
        this.blurred = true;
        this.showValidationMessage();
        this.$dispatch('blur-field', this);
      },
      changeField() {
        this.$dispatch('change-field', this);
      },
      // Initializes custom validators by looking at the attributes in the DOM.
      findValidators() {
        let dataAttributes = this.$els.field.dataset;
        let validatorKeys = Object.keys(validators);
        validatorKeys.forEach(validatorKey => {
          let validationMessage = dataAttributes['val' + validatorKey];
          if(!validationMessage) {
            // Validator should not be activated
            return;
          }
          this.validators.push(new validators[validatorKey](validationMessage, dataAttributes));
        });
      },
      showValidationMessage() {
        if(!this.blurred) {
          // Only show validation after blur.
          return;
        }
        this.$els.message.innerHTML = this.validationMessage;
      }
    },
    computed: {
      isValid() {
        return this.validators.filter(validator => {
            return validator.isValid(this.value);
          }).length === this.validators.length && !this.extraErrorMessage;
      },
      // Returns the error-message
      validationMessage() {
        let message = '';
        this.validators.forEach(validator => {
          const valid = validator.isValid(this.value);
          if(!valid && !message) {
            message = validator.getMessage();
          }
        });
        return message || this.extraErrorMessage;
      }
    }
  }
}
