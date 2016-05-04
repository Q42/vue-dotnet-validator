var validator = require('./src/validator.vue');
var validatorGroup = require('./src/validator-group.vue');


Vue.component('vue-dotnet-validator', validator);
Vue.component('vue-dotnet-validator-group', validatorGroup);

new Vue({
    el: '#example-site'
});
