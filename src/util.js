class Util {
  findValidatorGroup(component) {
    if (!component.$parent) {
      // Something went wrong, no parent found or properties have changed in vue.
      return;
    }
    if (component.$parent.isValidatorGroup) {
      return component.$parent;
    }
    return this.findValidatorGroup(component.$parent);
  }
}

export default new Util();
