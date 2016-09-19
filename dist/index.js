(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vueDotnetValidator"] = factory();
	else
		root["vueDotnetValidator"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _validator = __webpack_require__(3);

	var _validator2 = _interopRequireDefault(_validator);

	var _validatorGroup = __webpack_require__(12);

	var _validatorGroup2 = _interopRequireDefault(_validatorGroup);

	var _basevalidator = __webpack_require__(6);

	var _basevalidator2 = _interopRequireDefault(_basevalidator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
	    validatorGroup: _validatorGroup2.default,
	    validator: _validator2.default,
	    BaseValidator: _basevalidator2.default
	};

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function () {
	  var extraValidators = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var validators = __webpack_require__(4);
	  // Add extraValidators to the default validators.
	  for (var attrname in extraValidators) {
	    validators[attrname] = extraValidators[attrname];
	  }

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
	    data: function data() {
	      return {
	        validators: [],
	        blurred: false
	      };
	    },
	    attached: function attached() {
	      if (!this.$els.field) {
	        console.error('Field is missing!', this);
	        return;
	      }

	      this.findValidators();

	      if (this.$els.message.innerText) {
	        // When we already have innerText, it means the server has output a validation error.
	        // We need to replace that validation message as soon as the user changes the value of the input
	        this.blurred = true;
	      }

	      // Make sure we update the validation message as soon as it changes.
	      this.$watch('validationMessage', this.showValidationMessage);

	      this.$els.field.addEventListener('blur', this.blurField);
	      this.$els.field.addEventListener('change', this.changeField);
	      this.$dispatch('validator-created', this);
	    },
	    beforeDestroy: function beforeDestroy() {
	      this.$dispatch('validator-removed', this);
	    },

	    methods: {
	      blurField: function blurField() {
	        this.blurred = true;
	        this.showValidationMessage();
	        this.$dispatch('blur-field', this);
	      },
	      changeField: function changeField() {
	        this.$dispatch('change-field', this);
	      },

	      // Initializes custom validators by looking at the attributes in the DOM.
	      findValidators: function findValidators() {
	        var _this = this;

	        var dataAttributes = this.$els.field.dataset;
	        var validatorKeys = Object.keys(validators);
	        validatorKeys.forEach(function (validatorKey) {
	          var validationMessage = dataAttributes['val' + validatorKey];
	          if (!validationMessage) {
	            // Validator should not be activated
	            return;
	          }
	          _this.validators.push(new validators[validatorKey](validationMessage, dataAttributes));
	        });
	      },
	      showValidationMessage: function showValidationMessage() {
	        if (!this.blurred) {
	          // Only show validation after blur.
	          return;
	        }
	        this.$els.message.innerHTML = this.validationMessage;
	      }
	    },
	    computed: {
	      isValid: function isValid() {
	        var _this2 = this;

	        return this.validators.filter(function (validator) {
	          return validator.isValid(_this2.value);
	        }).length === this.validators.length && !this.extraErrorMessage;
	      },

	      // Returns the error-message
	      validationMessage: function validationMessage() {
	        var _this3 = this;

	        var message = '';
	        this.validators.forEach(function (validator) {
	          var valid = validator.isValid(_this3.value);
	          if (!valid && !message) {
	            message = validator.getMessage();
	          }
	        });
	        return message || this.extraErrorMessage;
	      }
	    }
	  };
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  Required: __webpack_require__(5),
	  Minlength: __webpack_require__(7),
	  Maxlength: __webpack_require__(8),
	  Length: __webpack_require__(9),
	  Range: __webpack_require__(10),
	  Regex: __webpack_require__(11)
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _basevalidator = __webpack_require__(6);

	var _basevalidator2 = _interopRequireDefault(_basevalidator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RequiredValidator = function (_BaseValidator) {
	  _inherits(RequiredValidator, _BaseValidator);

	  function RequiredValidator() {
	    _classCallCheck(this, RequiredValidator);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(RequiredValidator).apply(this, arguments));
	  }

	  _createClass(RequiredValidator, [{
	    key: 'isValid',
	    value: function isValid(value) {
	      return !!value;
	    }
	  }]);

	  return RequiredValidator;
	}(_basevalidator2.default);

	module.exports = RequiredValidator;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This class contains the basic api of a custom validator on the portal site.
	 */

	var BaseValidator = function () {
	  function BaseValidator(message, dataAttributes) {
	    _classCallCheck(this, BaseValidator);

	    this.message = message;
	    this.attributes = dataAttributes;
	  }

	  _createClass(BaseValidator, [{
	    key: "getMessage",
	    value: function getMessage() {
	      return this.message;
	    }
	  }, {
	    key: "isValid",
	    value: function isValid() {}
	  }]);

	  return BaseValidator;
	}();

	exports.default = BaseValidator;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _basevalidator = __webpack_require__(6);

	var _basevalidator2 = _interopRequireDefault(_basevalidator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MinLengthValidator = function (_BaseValidator) {
	  _inherits(MinLengthValidator, _BaseValidator);

	  function MinLengthValidator(message, attributes) {
	    _classCallCheck(this, MinLengthValidator);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MinLengthValidator).call(this, message, attributes));

	    _this.minLength = attributes['valMinlengthMin'];
	    return _this;
	  }

	  _createClass(MinLengthValidator, [{
	    key: 'isValid',
	    value: function isValid(value) {
	      return !value || value.length >= this.minLength;
	    }
	  }]);

	  return MinLengthValidator;
	}(_basevalidator2.default);

	module.exports = MinLengthValidator;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _basevalidator = __webpack_require__(6);

	var _basevalidator2 = _interopRequireDefault(_basevalidator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MaxLengthValidator = function (_BaseValidator) {
	  _inherits(MaxLengthValidator, _BaseValidator);

	  function MaxLengthValidator(message, attributes) {
	    _classCallCheck(this, MaxLengthValidator);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MaxLengthValidator).call(this, message, attributes));

	    _this.maxLength = attributes['valMaxlengthMax'];
	    return _this;
	  }

	  _createClass(MaxLengthValidator, [{
	    key: 'isValid',
	    value: function isValid(value) {
	      return !value || value.length <= this.maxLength;
	    }
	  }]);

	  return MaxLengthValidator;
	}(_basevalidator2.default);

	module.exports = MaxLengthValidator;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _basevalidator = __webpack_require__(6);

	var _basevalidator2 = _interopRequireDefault(_basevalidator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var StringLengthValidator = function (_BaseValidator) {
	  _inherits(StringLengthValidator, _BaseValidator);

	  function StringLengthValidator(message, attributes) {
	    _classCallCheck(this, StringLengthValidator);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(StringLengthValidator).call(this, message, attributes));

	    _this.maxLength = attributes['valLengthMax'];
	    _this.minLength = attributes['valLengthMin'];
	    return _this;
	  }

	  _createClass(StringLengthValidator, [{
	    key: 'isValid',
	    value: function isValid(value) {
	      return !value || value.length >= this.minLength && value.length <= this.maxLength;
	    }
	  }]);

	  return StringLengthValidator;
	}(_basevalidator2.default);

	module.exports = StringLengthValidator;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _basevalidator = __webpack_require__(6);

	var _basevalidator2 = _interopRequireDefault(_basevalidator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RangeValidator = function (_BaseValidator) {
	  _inherits(RangeValidator, _BaseValidator);

	  function RangeValidator(message, attributes) {
	    _classCallCheck(this, RangeValidator);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RangeValidator).call(this, message, attributes));

	    _this.min = parseFloat(attributes['valRangeMin']);
	    _this.max = parseFloat(attributes['valRangeMax']);
	    return _this;
	  }

	  _createClass(RangeValidator, [{
	    key: 'isValid',
	    value: function isValid(value) {
	      var parsedValue = parseFloat(value);
	      return !value && parsedValue != 0 || !isNaN(parsedValue) && parsedValue >= this.min && parsedValue <= this.max;
	    }
	  }]);

	  return RangeValidator;
	}(_basevalidator2.default);

	module.exports = RangeValidator;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _basevalidator = __webpack_require__(6);

	var _basevalidator2 = _interopRequireDefault(_basevalidator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RegexValidator = function (_BaseValidator) {
	  _inherits(RegexValidator, _BaseValidator);

	  function RegexValidator(message, attributes) {
	    _classCallCheck(this, RegexValidator);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RegexValidator).call(this, message, attributes));

	    _this.regex = new RegExp(attributes['valRegexPattern']);
	    return _this;
	  }

	  _createClass(RegexValidator, [{
	    key: 'isValid',
	    value: function isValid(value) {
	      return !value || this.regex.test(value);
	    }
	  }]);

	  return RegexValidator;
	}(_basevalidator2.default);

	module.exports = RegexValidator;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    props: {
	        onValid: {
	            type: Function,
	            default: null
	        }
	    },
	    data: function data() {
	        return {
	            validators: [],
	            loading: false
	        };
	    },

	    methods: {
	        validate: function validate(event) {
	            var valid = true;
	            this.validators.forEach(function (validator) {
	                if (!validator.isValid) {
	                    valid = false;
	                    event.preventDefault();
	                }
	                validator.blurField(); // Force showing validation.
	            });
	            if (valid && this.onValid instanceof Function) {
	                event.preventDefault();
	                return this.onValid(event);
	            }

	            this.loading = valid;
	            return false;
	        },
	        cancel: function cancel() {
	            this.$dispatch('cancel-form');
	        }
	    },
	    events: {
	        'validator-created': function validatorCreated(validator) {
	            this.validators.push(validator);
	            return true; // bubble
	        },
	        'validator-removed': function validatorRemoved(validator) {
	            this.validators.splice(this.validators.indexOf(validator), 1);
	            return true; // bubble
	        }
	    }
	};

/***/ }
/******/ ])
});
;