import util from './util';

module.exports = (extraValidators = {}) => {
  let validators = require('./default-validators');
  // Add extraValidators to the default validators.
  for (var attrname in extraValidators) { validators[attrname] = extraValidators[attrname]; }

  const validClass = 'field-validation-valid';
  let validatorGroup = null;

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
        blurred: false,
        localInputValue: ''
      };
    },
    mounted() {
      this.$nextTick(() => {
        if(!this.$refs.field) {
          console.error('Field is missing!', this);
          return;
        }

        validatorGroup = util.findValidatorGroup(this);

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
        this.$refs.field.addEventListener('input', this.changeField);
        validatorGroup.addValidator(this);
      });
    },
    destroyed() {
      this.$nextTick(() => {
        validatorGroup.removeValidator(this);
      });
    },
    methods: {
      blurField(event) {
        if(event) {
          this.localValue = event.target.value;
          this.$emit('input', event.target.value);
        }
        this.blurred = true;
        this.showValidationMessage();
        this.$emit('blur-field', this);
      },
      changeField(event) {
        this.localValue = event.target.value;
        this.$emit('input', event.target.value);
        this.$emit('change-field', this);
        this.showValidationMessage();
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
            return validator.isValid(this.localValue);
          }).length === this.validators.length && !this.extraErrorMessage;
      },
      // Returns the error-message
      validationMessage() {
        let message = '';
        this.validators.forEach(validator => {
          const valid = validator.isValid(this.localValue);
          if(!valid && !message) {
            message = validator.getMessage();
          }
        });
        return message || this.extraErrorMessage;
      },
      localValue: {
        get() {
          return this.value || this.localInputValue;
        },
        set(value) {
          this.localInputValue = value;
        }
      }
    },
    watch: {
      isValid() {
        this.$refs.field.setAttribute('aria-invalid', !this.isValid);
      }
    }
  }
};
