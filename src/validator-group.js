module.exports = {
    props: {
        onValid: {
            type: Function,
            default: null
        }
    },
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
            if(valid && this.onValid instanceof Function) {
                event.preventDefault();
                return this.onValid(event);
            }

            this.loading = valid;
            return false;
        },
        cancel() {
            this.$dispatch('cancel-form');
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
    }
};
