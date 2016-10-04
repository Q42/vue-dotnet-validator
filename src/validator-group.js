import pubSub from './pubsub';

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
    mounted() {
        pubSub.subscribe(pubSub.eventTypes.validatorCreated, validator => {
            this.validators.push(validator);
        });
        pubSub.subscribe(pubSub.eventTypes.validatorRemoved, validator => {
            this.validators.splice(this.validators.indexOf(validator), 1);
        });
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
        }
    }
};
