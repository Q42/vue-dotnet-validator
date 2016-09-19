import MinLengthValidator from './minlengthvalidator.js';

describe('Minimum length validator', () => {

  it('Should ignore empty values', () => {
    const validator = new MinLengthValidator('error!', {'valMinlengthMin': 3});
    expect(validator.isValid('')).to.equal(true);
  });

  it('Should accept values above the minimum length', () => {
    const validator = new MinLengthValidator('error!', {'valMinlengthMin': 3});
    expect(validator.isValid('123')).to.equal(true);
    expect(validator.isValid('1234')).to.equal(true);
    expect(validator.isValid('hallo')).to.equal(true);
    expect(validator.isValid('Dit is een string met spaties')).to.equal(true);
  });

  it('Should reject values below the minimum length', () => {
    const validator = new MinLengthValidator('error!', {'valMinlengthMin': 7});
    expect(validator.isValid('123')).to.equal(false);
    expect(validator.isValid('1234')).to.equal(false);
    expect(validator.isValid('hallo')).to.equal(false);
    expect(validator.isValid('dit is')).to.equal(false);
  });
});
