/******/ (function(modules) { // webpackBootstrap
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

	var validator = __webpack_require__(1);
	var validatorGroup = __webpack_require__(45);

	Vue.component('vue-dotnet-validator', validator);
	Vue.component('vue-dotnet-validator-group', validatorGroup);

	new Vue({
	    el: '#example-site'
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(2)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\validator.vue: named exports in *.vue files are ignored.")}
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "c:\\projects\\vue-dotnet-validator\\src\\validator.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _keys = __webpack_require__(3);

	var _keys2 = _interopRequireDefault(_keys);

	var _validators = __webpack_require__(38);

	var _validators2 = _interopRequireDefault(_validators);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'vue-dotnet-validator',
	  props: {
	    'value': {
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
	    this.value = this.$els.field.value;
	    this.getValidators();

	    if (this.$els.message.innerText) {
	      this.blurred = true;
	    }

	    this.$watch('validationMessage', this.showValidationMessage);

	    this.$els.field.addEventListener('blur', this.blurField);
	  },
	  created: function created() {
	    this.$dispatch('validator-created', this);
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.$dispatch('validator-removed', this);
	  },

	  methods: {
	    blurField: function blurField() {
	      this.blurred = true;
	      this.showValidationMessage();
	      this.$dispatch('blur');
	    },
	    getValidators: function getValidators() {
	      var _this = this;

	      var dataAttributes = this.getDataAttributes();
	      var validatorKeys = (0, _keys2.default)(_validators2.default);
	      validatorKeys.forEach(function (validatorKey) {
	        var validationMessage = dataAttributes['val-' + validatorKey];
	        if (!validationMessage) {
	          return;
	        }
	        _this.validators.push(new _validators2.default[validatorKey](validationMessage, dataAttributes));
	      });
	    },
	    getDataAttributes: function getDataAttributes() {
	      var dataset = {};
	      var element = this.$els.field;
	      for (var i = 0; i < element.attributes.length; i++) {
	        var name = element.attributes[i].name;
	        if (name.indexOf('data-') !== 0) {
	          continue;
	        }
	        name = name.replace('data-', '');
	        dataset[name] = element.attributes[i].value;
	      }
	      return dataset;
	    },
	    showValidationMessage: function showValidationMessage() {
	      if (!this.blurred) {
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
	      }).length === this.validators.length;
	    },
	    validationMessage: function validationMessage() {
	      var _this3 = this;

	      var message = '';
	      this.validators.forEach(function (validator) {
	        var valid = validator.isValid(_this3.value);
	        if (!valid && !message) {
	          message = validator.getMessage();
	        }
	      });
	      return message;
	    }
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(5);
	module.exports = __webpack_require__(25).Object.keys;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(6),
	    $keys = __webpack_require__(8);

	__webpack_require__(23)('keys', function () {
	  return function keys(it) {
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(7);
	module.exports = function (it) {
	  return Object(defined(it));
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(9),
	    enumBugKeys = __webpack_require__(22);

	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var has = __webpack_require__(10),
	    toIObject = __webpack_require__(11),
	    arrayIndexOf = __webpack_require__(14)(false),
	    IE_PROTO = __webpack_require__(18)('IE_PROTO');

	module.exports = function (object, names) {
	  var O = toIObject(object),
	      i = 0,
	      result = [],
	      key;
	  for (key in O) {
	    if (key != IE_PROTO) has(O, key) && result.push(key);
	  } // Don't enum bug & hidden keys
	  while (names.length > i) {
	    if (has(O, key = names[i++])) {
	      ~arrayIndexOf(result, key) || result.push(key);
	    }
	  }return result;
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(12),
	    defined = __webpack_require__(7);
	module.exports = function (it) {
	  return IObject(defined(it));
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(13);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	var toString = {}.toString;

	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(11),
	    toLength = __webpack_require__(15),
	    toIndex = __webpack_require__(17);
	module.exports = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this),
	        length = toLength(O.length),
	        index = toIndex(fromIndex, length),
	        value;
	    // Array#includes uses SameValueZero equality algorithm
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      if (value != value) return true;
	      // Array#toIndex ignores holes, Array#includes - not
	    } else for (; length > index; index++) {
	        if (IS_INCLUDES || index in O) {
	          if (O[index] === el) return IS_INCLUDES || index || 0;
	        }
	      }return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(16),
	    min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	// 7.1.4 ToInteger
	var ceil = Math.ceil,
	    floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toInteger = __webpack_require__(16),
	    max = Math.max,
	    min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var shared = __webpack_require__(19)('keys'),
	    uid = __webpack_require__(21);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(20),
	    SHARED = '__core-js_shared__',
	    store = global[SHARED] || (global[SHARED] = {});
	module.exports = function (key) {
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	var id = 0,
	    px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	// IE 8- don't enum bug keys
	module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(24),
	    core = __webpack_require__(25),
	    fails = __webpack_require__(34);
	module.exports = function (KEY, exec) {
	  var fn = (core.Object || {})[KEY] || Object[KEY],
	      exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function () {
	    fn(1);
	  }), 'Object', exp);
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(20),
	    core = __webpack_require__(25),
	    ctx = __webpack_require__(26),
	    hide = __webpack_require__(28),
	    PROTOTYPE = 'prototype';

	var $export = function $export(type, name, source) {
	  var IS_FORCED = type & $export.F,
	      IS_GLOBAL = type & $export.G,
	      IS_STATIC = type & $export.S,
	      IS_PROTO = type & $export.P,
	      IS_BIND = type & $export.B,
	      IS_WRAP = type & $export.W,
	      exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
	      expProto = exports[PROTOTYPE],
	      target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE],
	      key,
	      own,
	      out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && key in exports) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? function (C) {
	      var F = function F(a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0:
	              return new C();
	            case 1:
	              return new C(a);
	            case 2:
	              return new C(a, b);
	          }return new C(a, b, c);
	        }return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	      // make static versions for prototype methods
	    }(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1; // forced
	$export.G = 2; // global
	$export.S = 4; // static
	$export.P = 8; // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	$export.U = 64; // safe
	$export.R = 128; // real proto method for `library`
	module.exports = $export;

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	var core = module.exports = { version: '2.3.0' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// optional / simple context binding
	var aFunction = __webpack_require__(27);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };
	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };
	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }
	  return function () /* ...args */{
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var dP = __webpack_require__(29),
	    createDesc = __webpack_require__(37);
	module.exports = __webpack_require__(33) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var anObject = __webpack_require__(30),
	    IE8_DOM_DEFINE = __webpack_require__(32),
	    toPrimitive = __webpack_require__(36),
	    dP = Object.defineProperty;

	exports.f = __webpack_require__(33) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) {/* empty */}
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(31);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	module.exports = function (it) {
	  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = !__webpack_require__(33) && !__webpack_require__(34)(function () {
	  return Object.defineProperty(__webpack_require__(35)('div'), 'a', { get: function get() {
	      return 7;
	    } }).a != 7;
	});

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(34)(function () {
	  return Object.defineProperty({}, 'a', { get: function get() {
	      return 7;
	    } }).a != 7;
	});

/***/ },
/* 34 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(31),
	    document = __webpack_require__(20).document
	// in old IE typeof document.createElement is 'object'
	,
	    is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(31);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// This is the total list of available validators.
	// Note: The list here is in logical order, if you are adding or moving validators around, check if the order makes sense.
	exports.default = {
	  required: __webpack_require__(39),
	  range: __webpack_require__(41),
	  regex: __webpack_require__(42),
	  minlength: __webpack_require__(43),
	  maxlength: __webpack_require__(44)
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _basevalidator = __webpack_require__(40);

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
/* 40 */
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _basevalidator = __webpack_require__(40);

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

	    _this.min = parseInt(attributes['val-range-min']);
	    _this.max = parseInt(attributes['val-range-max']);
	    return _this;
	  }

	  _createClass(RangeValidator, [{
	    key: 'isValid',
	    value: function isValid(value) {
	      var parsedValue = parseInt(value, 10) || -1;
	      return !value || !isNaN(parsedValue) && parsedValue >= this.min && parsedValue <= this.max;
	    }
	  }]);

	  return RangeValidator;
	}(_basevalidator2.default);

	module.exports = RangeValidator;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _basevalidator = __webpack_require__(40);

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

	    _this.regex = new RegExp(attributes['val-regex-pattern']);
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _basevalidator = __webpack_require__(40);

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

	    _this.minLength = attributes['val-minlength-min'];
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _basevalidator = __webpack_require__(40);

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

	    _this.maxLength = attributes['val-maxlength-max'];
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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(46)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\validator-group.vue: named exports in *.vue files are ignored.")}
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "c:\\projects\\vue-dotnet-validator\\src\\validator-group.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  name: 'vue-dotnet-validator-group',
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
	        validator.blurField();
	      });
	      this.loading = valid;
	      return false;
	    }
	  },
	  events: {
	    'validator-created': function validatorCreated(validator) {
	      this.validators.push(validator);
	      return true;
	    },
	    'validator-removed': function validatorRemoved(validator) {
	      this.validators.splice(this.validators.indexOf(validator), 1);
	      return true;
	    }
	  },
	  components: {
	    'validator': __webpack_require__(1)
	  }
	};

/***/ }
/******/ ]);