<!--<template>-->

<!--</template>-->
<!--<script lang="ts">-->
<!--import {Vue, prop} from 'vue-class-component';-->

<!--function endsWith(string, suffix) {-->
<!--  return string.indexOf(suffix, string.length - suffix.length) !== -1;-->
<!--}-->

<!--class Props {-->
<!--  onValid = prop<Function>({ default: null })-->
<!--  // validators = prop<[]>({ default: [] })-->
<!--  // loading = prop<boolean>({ default: false })-->
<!--  // isValidatorGroup = prop<boolean>({ default: true })-->
<!--}-->

<!--export default class ValidatorGroup extends Vue.with(Props) {-->
<!--  validators: [];-->
<!--  loading: false;-->
<!--  isValidatorGroup: true;-->

<!--  validate(event) {-->
<!--    let valid = true;-->
<!--    this.validators.forEach(validator => {-->
<!--      validator.hasForced = true;-->
<!--      if (!validator.isValid) {-->
<!--        valid = false;-->
<!--        event.preventDefault();-->
<!--        validator.showValidationMessage(true);-->
<!--        validator.blurField(); // Force showing validation.-->
<!--      }-->
<!--    });-->
<!--    if (valid && this.onValid instanceof Function) {-->
<!--      event.preventDefault();-->
<!--      return this.onValid(event);-->
<!--    }-->

<!--    this.loading = valid;-->
<!--    return valid;-->
<!--  }-->

<!--  findValidatorsByName(name) {-->
<!--    // Normalize string, in some cases the name contains a * or a ., like in equal-to validation.-->
<!--    name = name.replace(/\*/g, '').replace(/\./g, '');-->
<!--    return this.validators.filter(validator => endsWith(validator.name, name));-->
<!--  }-->

<!--  addValidator(validator) {-->
<!--    this.validators.push(validator);-->
<!--  }-->

<!--  removeValidator(validator) {-->
<!--    this.validators.splice(this.validators.indexOf(validator), 1);-->
<!--  }-->

<!--}-->
<!--</script>-->
<!--<style lang="scss">-->
<!--</style>-->
