import MaxlengthValidator from './maxlengthvalidator.js';

describe('Maximum length validator', () => {

  it('Should ignore empty values', () => {
    const validator = new MaxlengthValidator('error!', {'valMaxlengthMax': 3});
    expect(validator.isValid('')).toBe(true);
  });

  it('Should accept values that are below the maximum length', () => {
    const validator = new MaxlengthValidator('error!', {'valMaxlengthMax': 7});
    expect(validator.isValid('dag')).toBe(true);
    expect(validator.isValid('hallo')).toBe(true);
    expect(validator.isValid('1234567')).toBe(true);
  });

  it('Should not accept values that are above the maximum length', () => {
    const validator = new MaxlengthValidator('error!', {'valMaxlengthMax': 7});
    expect(validator.isValid('12345678')).toBe(false);
    expect(validator.isValid('halloditistelang')).toBe(false);
  });
});
