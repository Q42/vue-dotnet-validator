import EqualToValidator from './equaltovalidator.js';

function getFakeValidatorGroup(value) {
  return {
    findValidatorsByName() {
      return [{
        val: value
      }];
    }
  };
}

describe('Equal to validator', () => {

  it('Should ignore empty values', () => {
    const validator = new EqualToValidator('error!', {'valEqualtoOther': '*.testField'}, getFakeValidatorGroup(''));
    expect(validator.isValid('')).to.equal(true);
  });

  it('Should make sure the values of two fields are equal', () => {
    const validator = new EqualToValidator('error!', {'valEqualtoOther': '*.testField'}, getFakeValidatorGroup('Hello 1234'));
    expect(validator.isValid('Hello 1234')).to.equal(true);
  });

  it('Should fail when values are not equal', () => {
    const validator = new EqualToValidator('error!', {'valEqualtoOther': '*.testField'}, getFakeValidatorGroup('Awesome text'));
    expect(validator.isValid('Not the same as the other')).to.equal(false);
  });

});
