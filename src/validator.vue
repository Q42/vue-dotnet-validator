<script>
  var validators = require('./validators/validators');

  module.exports = {
    name: 'vue-dotnet-validator',
    props: {
      'value': {
        default: ''
      }
    },
    data: function() {
      return {
        validators: [],
        blurred: false
      };
    },
    attached: function() {
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
    created: function() {
      this.$dispatch('validator-created', this);
    },
    beforeDestroy: function() {
      this.$dispatch('validator-removed', this);
    },
    methods: {
      blurField: function() {
        this.blurred = true;
        this.showValidationMessage();
        this.$dispatch('blur');
      },
      // Initializes custom validators by looking at the attributes in the DOM.
      getValidators: function() {
        var self = this;
        var dataAttributes = this.getDataAttributes();
        var validatorKeys = Object.keys(validators);
        validatorKeys.forEach(function(validatorKey ) {
          var validationMessage = dataAttributes['val-' + validatorKey];
          if(!validationMessage) {
            // Validator should not be activated
            return;
          }
          self.validators.push(new validators[validatorKey](validationMessage, dataAttributes));
        });
      },
      getDataAttributes: function() {
        var dataset = {};
        var element = this.$els.field;
        for(var i=0; i < element.attributes.length; i++) {
          var name = element.attributes[i].name;
          if(name.indexOf('data-') !== 0) {
            continue;
          }
          name = name.replace('data-', '');
          dataset[name] = element.attributes[i].value;
        }
        return dataset;
      },
      showValidationMessage: function() {
        if(!this.blurred) {
          // Only show validation after blur.
          return;
        }
        this.$els.message.innerHTML = this.validationMessage;
      }
    },
    computed: {
      isValid: function() {
        var self = this;
        return this.validators.filter(function(validator) {
            return validator.isValid(self.value);
        }).length === this.validators.length;
      },
      // Returns the error-message
      validationMessage: function() {
        var self = this;
        var message = '';
        this.validators.forEach(function(validator) {
          var valid = validator.isValid(self.value);
          if(!valid && !message) {
            message = validator.getMessage();
          }
        });
        return message;
      }
    }
  }
</script>
