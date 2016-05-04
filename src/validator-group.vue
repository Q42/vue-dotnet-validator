<script>
  export default {
    name: 'vue-dotnet-validator-group',
    data() {
      return {
        validators: [],
        loading: false
      }
    },
    methods: {
      validate(event) {
        let valid = true;
        this.validators.forEach(validator => {
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
      'validator-created'(validator) {
        this.validators.push(validator);
        return true; // bubble
      },
      'validator-removed'(validator) {
        this.validators.splice(this.validators.indexOf(validator), 1);
        return true; // bubble
      }
    },
    components: {
      'validator': require('./validator.vue')
    }
  }
</script>
