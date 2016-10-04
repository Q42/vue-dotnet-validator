module.exports = (extraValidators = {}) => {
  let validators = require('./default-validators');
  // Add extraValidators to the default validators.
  for (var attrname in extraValidators) { validators[attrname] = extraValidators[attrname]; }

  const validClass = 'field-validation-valid';

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
    mounted() {
      this.$nextTick(() => {
        if(!this.$refs.field) {
          console.error('Field is missing!', this);
          return;
        }

        this.findValidators();
        this.addAriaDescribedBy();

        if(this.$refs.message.innerText) {
          // When we already have innerText, it means the server has output a validation error.
          // We need to replace that validation message as soon as the user changes the value of the input
          this.blurred = true;
        } else {
          this.$refs.message.classList.add(validClass);
        }

        // Make sure we update the validation message as soon as it changes.
        this.$watch('validationMessage', this.showValidationMessage);

        this.$refs.field.addEventListener('blur', this.blurField);
        this.$refs.field.addEventListener('change', this.changeField);
        this.$dispatch('validator-created', this);
      });
    },
    destroyed() {
      this.$nextTick(() => {
        this.$dispatch('validator-removed', this);
      });
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
        let dataAttributes = this.$refs.field.dataset;
        let validatorKeys = Object.keys(validators);
        validatorKeys.forEach(validatorKey => {
          let validationMessage = dataAttributes['val' + validatorKey];
          if(!validationMessage) {
            // Validator should not be activated
            return;
          }
          this.validators.push(new validators[validatorKey](validationMessage, dataAttributes, this.$refs.field));
        });
      },
      showValidationMessage() {
        if(!this.blurred) {
          // Only show validation after blur.
          return;
        }
        this.$refs.message.innerHTML = this.validationMessage;
        if(this.validationMessage) {
          return this.$refs.message.classList.remove(validClass);
        }
        return this.$refs.message.classList.add(validClass);
      },
      addAriaDescribedBy() {
        // Make kind of sure that the id does not exist yet.
        // No need to force this kind of stuff, in almost any case this will be enough.
        const id = `vue-validator-${parseInt(Math.random()*100)}-${this._uid}`;
        this.$refs.message.id = id;
        this.$refs.field.setAttribute('aria-describedby', id);
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
    },
    watch: {
      isValid() {
        this.$refs.field.setAttribute('aria-invalid', !this.isValid);
      }
    }
  }
};
