import RequiredValidator from './requiredvalidator.js';

describe('Required validator', () => {

  it('Should accept values', () => {
    const validator = new RequiredValidator('error!');
    expect(validator.isValid('1')).toBe(true);
    expect(validator.isValid('hisudhuf s')).toBe(true);
    expect(validator.isValid('DGSFH DFSHFDS')).toBe(true);
    expect(validator.isValid(0)).toBe(true);
    expect(validator.isValid(false)).toBe(true);
    expect(validator.isValid(true)).toBe(true);
  });

  it('Should reject empty values', () => {
    const validator = new RequiredValidator('error!');
    expect(validator.isValid('')).toBe(false);
    expect(validator.isValid(null)).toBe(false);
    expect(validator.isValid(undefined)).toBe(false);
  });

});
