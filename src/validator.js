import * as defaultValidators from'./validators';
import util from './util';

export default (extraValidators = {}) => {
  const validators = {
    ...defaultValidators,
    ...extraValidators
  }

  const validClass = 'field-validation-valid';
  let validatorGroup = null;

  return {
    name: 'vue-dotnet-validator',
    props: {
      // Value is the value that will be validated
      value: {
        default: ''
      },
      // This parameter can be used to provide additional complex validation from your app
      extraErrorMessage: {
        default: ''
      },
      instantValidation: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        validators: [],
        blurred: false,
        hasValidationError: false,
        // This variable is used to store the current value if not in two-way mode.
        localInputValue: this.value,
        isTwoWayBind: false,
        hasChanged: false,
        name: '',
        field: null
      };
    },
    mounted() {
      // Retrieve server-side value from DOM.
      //this.localInputValue = this.$refs.field.value;
      this.$nextTick(() => {
        this.field = this.resolveField(this);

        if(!this.field) {
            console.error('Field is missing!', this);
            return;
        }

        this.name = this.field.name;

        // We need to know if 2-way binding is being used so we know where to store the adjusted value.
        // This check is a little bit dirty, but the only thing that works.
        // Since vue handles 2-way binding through the 'input' event, we can check if there is something listening to it.
        this.isTwoWayBind = this.$options._parentListeners && !!this.$options._parentListeners.input;

        validatorGroup = util.findValidatorGroup(this);

        this.findValidators();
        this.addAriaDescribedBy();

        if(this.$refs.message.innerText) {
          // When we already have innerText, it means the server has output a validation error.
          // We need to replace that validation message as soon as the user changes the value of the input
          this.hasValidationError = true;
          this.blurred = true;
        } else {
          this.$refs.message.classList.add(validClass);
        }

        // Make sure we update the validation message as soon as it changes.
        this.$watch('validationMessage', this.showValidationMessage);

        if(!this.isCheckbox && !this.isRadio) {
          this.field.addEventListener('blur', this.blurField);
        }
        this.field.addEventListener('change', this.changeField);
        this.field.addEventListener('input', this.changeField);
        validatorGroup.addValidator(this);
      });
    },
    destroyed() {
      this.$nextTick(() => {
        validatorGroup.removeValidator(this);
      });
    },
    methods: {
      resolveField(component) {
          if(!component) {
            return null;
          }

          if(component.$refs.field) {
            return component.$refs.field;
          }

          if(component.$children.length > 0) {
            return component.$children.map(child => this.resolveField(child)).filter(result => !!result)[0];
          }

          return null;
      },
      blurField(event) {
        if(event && event.target.value !== '') {
          this.val = event.target.value;
        }
        this.blurred = true;
        this.$emit('blur-field', this);
        this.showValidationMessage();
      },
      changeField(event) {
        if(event) {
          if(this.isCheckbox || this.isRadio) {
            this.blurred = true; // We are not using blur-event on checkbox, so lets force blurred here.
            this.val = this.isCheckbox
              ? event.target.checked
              : event.target.checked ? event.target.value : '';
          } else {
            this.val = event.target.value;
          }
        }
        this.hasChanged = true;
        this.$emit('change-field', this);
        this.showValidationMessage();
      },
      // Initializes custom validators by looking at the attributes in the DOM.
      findValidators() {
        const dataAttributes = this.field.dataset;
        const validatorKeys = Object.keys(validators);

        validatorKeys.forEach(validatorKey => {
          const sanitzedKey = validatorKey.charAt(0).toUpperCase() + validatorKey.slice(1).toLowerCase();
          const validationMessage = dataAttributes['val' + sanitzedKey];

          if(!validationMessage) {
            // Validator should not be activated
            return;
          }
          this.validators.push(new validators[validatorKey](validationMessage, dataAttributes, validatorGroup));
        });
      },
      showValidationMessage() {
        if((!this.instantValidation && !this.hasChanged) || !this.blurred) {
          // Only show validation when has changed and instant validation is changed or after blur.
          return;
        }
        this.$refs.message.innerHTML = this.validationMessage;
        if(this.validationMessage) {
          this.hasValidationError = true;
          return this.$refs.message.classList.remove(validClass);
        }
        this.hasValidationError = false;
        return this.$refs.message.classList.add(validClass);
      },
      addAriaDescribedBy() {
        // Make kind of sure that the id does not exist yet.
        // No need to force this kind of stuff, in almost any case this will be enough.
        const id = `vue-validator-${parseInt(Math.random()*100)}-${this._uid}`;
        this.$refs.message.id = id;
        this.field.setAttribute('aria-describedby', id);
        this.$refs.message.setAttribute('role', 'alert');
      }
    },
    computed: {
      isValid() {
        return this.validators.filter(validator => {
            return validator.isValid(this.val);
          }).length === this.validators.length && !this.extraErrorMessage;
      },
      // Returns the error-message
      validationMessage() {
        let message = '';
        this.validators.forEach(validator => {
          const valid = validator.isValid(this.val);
          if(!valid && !message) {
            message = validator.getMessage();
          }
        });
        if(!message && !this.hasChanged && this.instantValidation) {
          // User has not done anything yet, if server-side message is present, show that.
          message = this.$refs.message.innerHTML;
        }
        return message || this.extraErrorMessage;
      },
      // This is the internally used value
      val: {
        get() {
          if(this.isTwoWayBind) {
            return this.value;
          }
          return this.localInputValue;
        },
        set(value) {
          this.hasChanged = true;

          if(this.isTwoWayBind) {
            // Two-way binding requires to emit an event in vue 2.x
            return this.$emit('input', value);
          }
          return this.localInputValue = value;
        }
      },
      isCheckbox() {
        return this.field && this.field.type == 'checkbox';
      },
      isRadio() {
        return this.field && this.field.type == 'radio';
      }
    },
    watch: {
      isValid() {
        if(this.field) {
          this.field.setAttribute('aria-invalid', !this.isValid);
        }
      }
    }
  }
};
