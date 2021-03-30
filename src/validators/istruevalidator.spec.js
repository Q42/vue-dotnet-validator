import IsTrueValidator from './istruevalidator.js';

describe('Is True validator', () => {

  it('Should accept true', () => {
    const validator = new IsTrueValidator('error!');
    expect(validator.isValid(true)).toBe(true);
  });

  it('Should reject false', () => {
    const validator = new IsTrueValidator('error!');
    expect(validator.isValid(false)).toBe(false);
  });

});
