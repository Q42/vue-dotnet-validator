import MinLengthValidator from './minlengthvalidator.js';

describe('Minimum length validator', () => {

  it('Should ignore empty values', () => {
    const validator = new MinLengthValidator('error!', {'valMinlengthMin': 3});
    expect(validator.isValid('')).toBe(true);
  });

  it('Should accept values above the minimum length', () => {
    const validator = new MinLengthValidator('error!', {'valMinlengthMin': 3});
    expect(validator.isValid('123')).toBe(true);
    expect(validator.isValid('1234')).toBe(true);
    expect(validator.isValid('hallo')).toBe(true);
    expect(validator.isValid('Dit is een string met spaties')).toBe(true);
  });

  it('Should reject values below the minimum length', () => {
    const validator = new MinLengthValidator('error!', {'valMinlengthMin': 7});
    expect(validator.isValid('123')).toBe(false);
    expect(validator.isValid('1234')).toBe(false);
    expect(validator.isValid('hallo')).toBe(false);
    expect(validator.isValid('dit is')).toBe(false);
  });
});
