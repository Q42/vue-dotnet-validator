import RegexValidator from './regexvalidator.js';

describe('Regex validator', () => {

  it('Should ignore empty values', () => {
    const validator = new RegexValidator('error!', {'valRegexPattern': '^[1-9][0-9]{3} ?[a-zA-Z]{2}$'});
    expect(validator.isValid('')).toBe(true);
  });

  it('Should validate values that match the regex', () => {
    // This test uses the dutch postal code regex
    const validator = new RegexValidator('error!', {'valRegexPattern': '^[1-9][0-9]{3} ?[a-zA-Z]{2}$'});
    expect(validator.isValid('1111aa')).toBe(true);
    expect(validator.isValid('1234ba')).toBe(true);
    expect(validator.isValid('9999hd')).toBe(true);
    expect(validator.isValid('9999 HD')).toBe(true);
  });

  it('Should reject values that do not match the regex', () => {
    // This test uses the dutch postal code regex
    const validator = new RegexValidator('error!', {'valRegexPattern': '^[1-9][0-9]{3} ?[a-zA-Z]{2}$'});
    expect(validator.isValid('g')).toBe(false);
    expect(validator.isValid('1111DHD')).toBe(false);
    expect(validator.isValid('geen postcode')).toBe(false);
  });

});
