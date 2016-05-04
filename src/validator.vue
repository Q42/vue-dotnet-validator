<script>
  import validators from './validators/validators';

  export default {
    name: 'vue-dotnet-validator',
    validators: validators,
    props: {
      'value': {
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
      this.value = this.$els.field.value;
      this.getValidators();

      if(this.$els.message.innerText) {
        // When we already have innerText, it means the server has output a validation error.
        // We need to replace that validation message as soon as the user changes the value of the input
        this.blurred = true;
      }

      // Make sure we update the validation message as soon as it changes.
      this.$watch('validationMessage', this.showValidationMessage);

      this.$els.field.addEventListener('blur', this.blurField);
    },
    created() {
      this.$dispatch('validator-created', this);
    },
    beforeDestroy() {
      this.$dispatch('validator-removed', this);
    },
    methods: {
      blurField() {
        this.blurred = true;
        this.showValidationMessage();
        this.$dispatch('blur');
      },
      // Initializes custom validators by looking at the attributes in the DOM.
      getValidators() {
        let dataAttributes = this.getDataAttributes();
        let validatorKeys = Object.keys(validators);
        validatorKeys.forEach(validatorKey => {
          let validationMessage = dataAttributes['val-' + validatorKey];
        if(!validationMessage) {
          // Validator should not be activated
          return;
        }
        this.validators.push(new validators[validatorKey](validationMessage, dataAttributes));
      });
      },
      getDataAttributes() {
        let dataset = {};
        let element = this.$els.field;
        for(let i=0; i < element.attributes.length; i++) {
          let name = element.attributes[i].name;
          if(name.indexOf('data-') !== 0) {
            continue;
          }
          name = name.replace('data-', '');
          dataset[name] = element.attributes[i].value;
        }
        return dataset;
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
      }).length === this.validators.length;
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
        return message;
      }
    }
  }
</script>
