import * as defaultValidators from './validators'
import util from './util'

export default (extraValidators = {}) => {
  const validators = {
    ...defaultValidators,
    ...extraValidators
  }

  const validationStyles = {
    afterBlur: 'after-blur', // default
    afterChange: 'after-change',
    afterSubmit: 'after-submit'
  }

  const validClass = 'field-validation-valid'
  const invalidClass = 'field-validation-error'
  let validatorGroup = null

  return {
    name: 'vue-dotnet-validator',
    template: '<slot v-bind="{ isValid, shouldValidate, val}" />',
    props: {
      value: {
        default: ''
      },
      // This parameter can be used to provide additional complex validation from your app
      extraErrorMessage: {
        default: ''
      },
      validationStyle: {
        default: validationStyles.afterBlur
      },
      refId: {
        default: null
      },
      refId2: {
        default: undefined
      }
    },
    emits: ['valid-field', 'blur-field', 'valid-field', 'invalid-field', 'change-field'],
    data() {
      return {
        validators: [],
        blurred: false,
        hasValidationError: false,
        localInputValue: this.value,
        isTwoWayBind: false,
        hasChanged: false,
        hasForced: false,
        hasBlurred: false,
        name: '',
        field: null,
        refs: {
          message: null,
          field: null
        }
      }
    },
    updated() {
      this.initialize()
    },
    mounted() {
      if (!this.refId) {
        console.error('Geen id opgegeven voor element', this.$el)
      }

      validatorGroup = util.findValidatorGroup(this)
      validatorGroup.addValidator(this)

      this.refs.field = document.getElementById(this.refId)
      this.refs.message = document.getElementById(`${this.refId}-validation`)

      this.initialize()
    },
    unmounted() {
      this.$nextTick(() => {
        validatorGroup.removeValidator(this)
      })
    },
    methods: {
      initialize() {
        // already initialized
        if (this.field) {
          return
        }

        this.field = this.refs.field

        if (!this.field) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn(
              'Field is missing. This could be an error or it will resolve if the input is mounted async.',
              this.$el
            )
          }
          return
        }

        this.name = this.field.name

        this.findValidators()
        this.addAriaDescribedBy()

        if (this.refs.message.innerText) {
          // When we already have innerText, it means the server has output a validation error.
          // We need to replace that validation message as soon as the user changes the value of the input
          this.hasValidationError = true
          this.blurred = true
        }

        if (!this.isCheckbox && !this.isRadio) {
          this.field.addEventListener('blur', this.blurField)
        }
        this.field.addEventListener('change', this.changeField)
        this.field.addEventListener('input', this.changeField)

        // TODO: refactor this, now needed to get required radio inputs working
        if (this.refId2) {
          const el = document.getElementById(this.refId2)
          if (el) {
            el.addEventListener('change', this.changeField)
          }
        }
      },
      blurField(event) {
        if (event && event.target.value !== '') {
          this.val = event.target.value
        }
        this.blurred = true
        this.hasBlurred = true
        this.$emit('blur-field', this)
        this.showValidationMessage(false)
      },
      changeField(event) {
        if (event) {
          if (this.isCheckbox || this.isRadio) {
            this.blurred = true // We are not using blur-event on checkbox, so lets force blurred here.
            this.val = this.isCheckbox
              ? event.target.checked
              : event.target.checked
                ? event.target.value
                : ''
          } else {
            this.val = event.target.value
          }
        }
        this.hasChanged = true
        this.$emit('change-field', this)
        this.showValidationMessage(false)

        if (this.isValid) {
          this.$emit('valid-field', this.localInputValue)
        } else {
          this.$emit('invalid-field')
        }
      },
      // Initializes custom validators by looking at the attributes in the DOM.
      findValidators() {
        const dataAttributes = this.field.dataset
        const validatorKeys = Object.keys(validators)

        validatorKeys.forEach(validatorKey => {
          const sanitzedKey =
            validatorKey.charAt(0).toUpperCase() + validatorKey.slice(1).toLowerCase()
          const validationMessage = dataAttributes['val' + sanitzedKey]

          if (!validationMessage) {
            // Validator should not be activated
            return
          }
          this.validators.push(
            new validators[validatorKey](validationMessage, dataAttributes, validatorGroup)
          )
        })
      },
      showValidationMessage(forced = false) {
        if (!forced && !this.shouldValidate) {
          return
        }

        if (!this.refs.message) {
          return
        }

        this.refs.message.innerHTML = this.validationMessage

        if (this.validationMessage) {
          this.hasValidationError = true
          return this.refs.message.classList.remove(validClass)
        }
        this.hasValidationError = false
        return this.refs.message.classList.add(validClass)
      },
      addAriaDescribedBy() {
        // Make kind of sure that the id does not exist yet.
        // No need to force this kind of stuff, in almost any case this will be enough.
        const id = `vue-validator-${parseInt(Math.random() * 100)}-${this.refId}`
        this.refs.message.id = id
        this.field.setAttribute('aria-describedby', id)
        this.refs.message.setAttribute('role', 'alert')
      },
      setRenderedState(isValid) {
        if (isValid) {
          this.refs.field.classList.add(validClass)
          this.refs.field.classList.remove(invalidClass)
          this.refs.message.classList.add(validClass)
          this.refs.message.classList.remove(invalidClass)
        } else {
          this.refs.field.classList.add(invalidClass)
          this.refs.field.classList.remove(validClass)
          this.refs.message.classList.add(invalidClass)
          this.refs.message.classList.remove(validClass)
        }
      }
    },
    computed: {
      shouldValidate() {
        if (!this.field) return false

        if (this.validationStyle === validationStyles.afterBlur && !this.hasBlurred) {
          return false
        }

        if (this.validationStyle === validationStyles.afterSubmit && !this.hasForced) {
          return false
        }

        if (this.validationStyle === validationStyles.afterChange && !this.hasChanged) {
          return false
        }

        return true
      },
      isValid() {
        if (!this.field) {
          return false
        }

        return (
          this.validators.filter(validator => {
            return validator.isValid(this.val)
          }).length === this.validators.length && !this.extraErrorMessage
        )
      },
      // Returns the error-message
      validationMessage() {
        if (!this.field) {
          return 'The field was not ready yet, please try again.'
        }

        let message = ''
        this.validators.forEach(validator => {
          const valid = validator.isValid(this.val)
          if (!valid && !message) {
            message = validator.getMessage()
          }
        })

        return message || this.extraErrorMessage
      },
      // This is the internally used value
      val: {
        get() {
          return this.localInputValue
        },
        set(value) {
          this.hasChanged = true
          return (this.localInputValue = value)
        }
      },
      isCheckbox() {
        return this.field && this.field.type === 'checkbox'
      },
      isRadio() {
        return this.field && this.field.type === 'radio'
      }
    },
    watch: {
      isValid: {
        handler: function (isValid) {
          if (this.field && this.shouldValidate) {
            this.field.setAttribute('aria-invalid', !this.isValid)
          }

          this.setRenderedState(isValid)
          this.showValidationMessage(!isValid)
        }
      },
      validationMessage: {
        handler: function () {
          this.showValidationMessage()
        }
      },
      shouldValidate: {
        handler: function (shouldValidate) {
          if (shouldValidate) {
            this.setRenderedState(this.isValid)
          }
        }
      }
    }
  }
}
