import RequiredValidator from './requiredvalidator.js';

describe('Required validator', () => {

  it('Should accept values', () => {
    const validator = new RequiredValidator('error!');
    expect(validator.isValid('1')).toBe(true);
    expect(validator.isValid('hisudhuf s')).toBe(true);
    expect(validator.isValid('DGSFH DFSHFDS')).toBe(true);
  });

  it('Should reject empty values', () => {
    const validator = new RequiredValidator('error!');
    expect(validator.isValid('')).toBe(false);
  });

});
