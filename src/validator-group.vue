<script>
  module.exports = {
    name: 'vue-dotnet-validator-group',
    data: function() {
      return {
        validators: [],
        loading: false
      }
    },
    methods: {
      validate: function(event) {
        var valid = true;
        this.validators.forEach(function(validator) {
          if(!validator.isValid) {
            valid = false;
            event.preventDefault();
          }
          validator.blurField(); // Force showing validation.
        });
        this.loading = valid;
        return false;
      }
    },
    events: {
      'validator-created': function(validator) {
        this.validators.push(validator);
        return true; // bubble
      },
      'validator-removed': function(validator) {
        this.validators.splice(this.validators.indexOf(validator), 1);
        return true; // bubble
      }
    },
    components: {
      'validator': require('./validator.vue')
    }
  };
</script>
