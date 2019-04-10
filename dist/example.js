!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.vueDotnetValidator=t():e.vueDotnetValidator=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(1),f=r(l),s={},c=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"isValid",value:function(e){return!e||"Hello"==e}}]),t}(f.default.BaseValidator);s.Mycustomvalidator=c,Vue.component("validator",f.default.validator(s)),Vue.component("vue-dotnet-validator-group",f.default.validatorGroup),Vue.component("test-component",{data:function(){return{inputValue:""}},watch:{inputValue:function(){console.log("watcher, ",this.inputValue)}}}),new Vue({el:"#example-site"})},function(e,t,n){var r,o,i;(function(e){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(a,u){"object"==n(t)&&"object"==n(e)?e.exports=u():(o=[],r=u,i="function"==typeof r?r.apply(t,o):r,!(void 0!==i&&(e.exports=i)))}(void 0,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}var o=n(3),i=r(o),a=n(14),u=r(a),l=n(7),f=r(l);e.exports={validatorGroup:u.default,validator:i.default,BaseValidator:f.default}},,,function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}var o=n(4),i=r(o);e.exports=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=n(5);for(var r in e)t[r]=e[r];var o="field-validation-valid",a=null;return{props:{value:{default:""},extraErrorMessage:{default:""}},data:function(){return{validators:[],blurred:!1,hasValidationError:!1,localInputValue:this.value,isTwoWayBind:!1,hasChanged:!1,name:"",field:null}},mounted:function(){var e=this;this.$nextTick(function(){return e.field=e.resolveField(e),e.field?(e.name=e.field.name,e.isTwoWayBind=e.$options._parentListeners&&!!e.$options._parentListeners.input,a=i.default.findValidatorGroup(e),e.findValidators(),e.addAriaDescribedBy(),e.$refs.message.innerText?(e.hasValidationError=!0,e.blurred=!0):e.$refs.message.classList.add(o),e.$watch("validationMessage",e.showValidationMessage),e.isCheckbox||e.isRadio||e.field.addEventListener("blur",e.blurField),e.field.addEventListener("change",e.changeField),e.field.addEventListener("input",e.changeField),void a.addValidator(e)):void console.error("Field is missing!",e)})},destroyed:function(){var e=this;this.$nextTick(function(){a.removeValidator(e)})},methods:{resolveField:function(e){var t=this;return e?e.$refs.field?e.$refs.field:e.$children.length>0?e.$children.map(function(e){return t.resolveField(e)}).filter(function(e){return!!e})[0]:null:null},blurField:function(e){e&&(this.val=e.target.value),this.blurred=!0,this.$emit("blur-field",this),this.showValidationMessage()},changeField:function(e){e&&(this.isCheckbox||this.isRadio?(this.blurred=!0,this.val=e.target.checked?e.target.value:""):this.val=e.target.value),this.hasChanged=!0,this.$emit("change-field",this),this.showValidationMessage()},findValidators:function(){var e=this,n=this.field.dataset,r=Object.keys(t);r.forEach(function(r){var o=n["val"+r];o&&e.validators.push(new t[r](o,n,a))})},showValidationMessage:function(){if(this.blurred)return this.$refs.message.innerHTML=this.validationMessage,this.validationMessage?(this.hasValidationError=!0,this.$refs.message.classList.remove(o)):(this.hasValidationError=!1,this.$refs.message.classList.add(o))},addAriaDescribedBy:function(){var e="vue-validator-"+parseInt(100*Math.random())+"-"+this._uid;this.$refs.message.id=e,this.field.setAttribute("aria-describedby",e),this.$refs.message.setAttribute("role","alert")}},computed:{isValid:function(){var e=this;return this.validators.filter(function(t){return t.isValid(e.val)}).length===this.validators.length&&!this.extraErrorMessage},validationMessage:function(){var e=this,t="";return this.validators.forEach(function(n){var r=n.isValid(e.val);r||t||(t=n.getMessage())}),t||this.hasChanged||(t=this.$refs.message.innerHTML),t||this.extraErrorMessage},val:{get:function(){return this.isTwoWayBind?this.value:this.localInputValue},set:function(e){return this.hasChanged=!0,this.isTwoWayBind?this.$emit("input",e):this.localInputValue=e}},isCheckbox:function(){return this.field&&"checkbox"==this.field.type},isRadio:function(){return this.field&&"radio"==this.field.type}},watch:{isValid:function(){this.field.setAttribute("aria-invalid",!this.isValid)}}}}},function(e,t){function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function(){function e(){n(this,e)}return r(e,[{key:"findValidatorGroup",value:function(e){if(e.$parent)return e.$parent.isValidatorGroup?e.$parent:this.findValidatorGroup(e.$parent)}}]),e}();t.default=new o},function(e,t,n){e.exports={Required:n(6),Minlength:n(8),Maxlength:n(9),Length:n(10),Range:n(11),Regex:n(12),Equalto:n(13)}},function(e,t,r){function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=("undefined"==typeof t?"undefined":n(t))&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":n(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=r(7),s=o(f),c=function(e){function t(){return i(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),l(t,[{key:"isValid",value:function(e){return!!e}}]),t}(s.default);e.exports=c},function(e,t){function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function(){function e(t,r,o){n(this,e),this.message=t,this.attributes=r,this.validatorGroup=o}return r(e,[{key:"getMessage",value:function(){return this.message}},{key:"isValid",value:function(){}}]),e}();t.default=o},function(e,t,r){function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=("undefined"==typeof t?"undefined":n(t))&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":n(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=r(7),s=o(f),c=function(e){function t(e,n){i(this,t);var r=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return r.minLength=n.valMinlengthMin,r}return u(t,e),l(t,[{key:"isValid",value:function(e){return!e||e.length>=this.minLength}}]),t}(s.default);e.exports=c},function(e,t,r){function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=("undefined"==typeof t?"undefined":n(t))&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":n(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=r(7),s=o(f),c=function(e){function t(e,n){i(this,t);var r=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return r.maxLength=n.valMaxlengthMax,r}return u(t,e),l(t,[{key:"isValid",value:function(e){return!e||e.length<=this.maxLength}}]),t}(s.default);e.exports=c},function(e,t,r){function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=("undefined"==typeof t?"undefined":n(t))&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":n(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=r(7),s=o(f),c=function(e){function t(e,n){i(this,t);var r=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return r.maxLength=n.valLengthMax,r.minLength=n.valLengthMin,r}return u(t,e),l(t,[{key:"isValid",value:function(e){return!e||e.length>=this.minLength&&e.length<=this.maxLength}}]),t}(s.default);e.exports=c},function(e,t,r){function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=("undefined"==typeof t?"undefined":n(t))&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":n(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=r(7),s=o(f),c=function(e){function t(e,n){i(this,t);var r=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return r.min=parseFloat(n.valRangeMin),r.max=parseFloat(n.valRangeMax),r}return u(t,e),l(t,[{key:"isValid",value:function(e){var t=parseFloat(e);return!e&&0!=t||!isNaN(t)&&t>=this.min&&t<=this.max}}]),t}(s.default);e.exports=c},function(e,t,r){function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=("undefined"==typeof t?"undefined":n(t))&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":n(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=r(7),s=o(f),c=function(e){function t(e,n){i(this,t);var r=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return r.regex=new RegExp(n.valRegexPattern),r}return u(t,e),l(t,[{key:"isValid",value:function(e){return!e||this.regex.test(e)}}]),t}(s.default);e.exports=c},function(e,t,r){function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=("undefined"==typeof t?"undefined":n(t))&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":n(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=r(7),s=o(f),c=function(e){function t(e,n,r){i(this,t);var o=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n,r));return o.otherFieldName=n.valEqualtoOther,o}return u(t,e),l(t,[{key:"isValid",value:function(e){var t=this.validatorGroup.findValidatorsByName(this.otherFieldName);if(null==t)return!0;var n=t[0];return!e||!n||e==n.val}}]),t}(s.default);e.exports=c},function(e,t){function n(e,t){return e.indexOf(t,e.length-t.length)!==-1}e.exports={name:"vue-dotnet-validator-group",props:{onValid:{type:Function,default:null}},data:function(){return{validators:[],loading:!1,isValidatorGroup:!0}},methods:{validate:function(e){var t=!0;return this.validators.forEach(function(n){n.isValid||(t=!1,e.preventDefault(),n.blurField())}),t&&this.onValid instanceof Function?(e.preventDefault(),this.onValid(e)):(this.loading=t,t)},findValidatorsByName:function(e){return e=e.replace(/\*/g,"").replace(/\./g,""),this.validators.filter(function(t){return n(t.name,e)})},addValidator:function(e){this.validators.push(e)},removeValidator:function(e){this.validators.splice(this.validators.indexOf(e),1)}}}}])})}).call(t,n(2)(e))},function(e,t){"use strict";e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children=[],e.webpackPolyfill=1),e}}])});