import RegexValidator from './regexvalidator.js';

describe('Regex validator', () => {

  it('Should ignore empty values', () => {
    const validator = new RegexValidator('error!', {'valRegexPattern': '^[1-9][0-9]{3} ?[a-zA-Z]{2}$'});
    expect(validator.isValid('')).to.equal(true);
  });

  it('Should validate values that match the regex', () => {
    // This test uses the dutch postal code regex
    const validator = new RegexValidator('error!', {'valRegexPattern': '^[1-9][0-9]{3} ?[a-zA-Z]{2}$'});
    expect(validator.isValid('1111aa')).to.equal(true);
    expect(validator.isValid('1234ba')).to.equal(true);
    expect(validator.isValid('9999hd')).to.equal(true);
    expect(validator.isValid('9999 HD')).to.equal(true);
  });

  it('Should reject values that do not match the regex', () => {
    // This test uses the dutch postal code regex
    const validator = new RegexValidator('error!', {'valRegexPattern': '^[1-9][0-9]{3} ?[a-zA-Z]{2}$'});
    expect(validator.isValid('g')).to.equal(false);
    expect(validator.isValid('1111DHD')).to.equal(false);
    expect(validator.isValid('geen postcode')).to.equal(false);
  });

});
