import MaxlengthValidator from './maxlengthvalidator.js';

describe('Maximum length validator', () => {

  it('Should ignore empty values', () => {
    const validator = new MaxlengthValidator('error!', {'valMaxlengthMax': 3});
    expect(validator.isValid('')).to.equal(true);
  });

  it('Should accept values that are below the maximum length', () => {
    const validator = new MaxlengthValidator('error!', {'valMaxlengthMax': 7});
    expect(validator.isValid('dag')).to.equal(true);
    expect(validator.isValid('hallo')).to.equal(true);
    expect(validator.isValid('1234567')).to.equal(true);
  });

  it('Should not accept values that are above the maximum length', () => {
    const validator = new MaxlengthValidator('error!', {'valMaxlengthMax': 7});
    expect(validator.isValid('12345678')).to.equal(false);
    expect(validator.isValid('halloditistelang')).to.equal(false);
  });
});
