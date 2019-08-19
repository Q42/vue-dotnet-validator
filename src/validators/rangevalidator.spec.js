import RangeValidator from './rangevalidator.js';

describe('Range validator', () => {

  it('Should ignore empty values', () => {
    const validator = new RangeValidator('error!', {'valRangeMin': 3, 'valRangeMax': 8});
    expect(validator.isValid('')).toBe(true);
  });

  it('Should accept values that are between 5 and 10', () => {
    const validator = new RangeValidator('error!', {'valRangeMin': 5, 'valRangeMax': 10});
    expect(validator.isValid('5')).toBe(true);
    expect(validator.isValid('5.0000001')).toBe(true);
    expect(validator.isValid('10')).toBe(true);
    expect(validator.isValid('7.5')).toBe(true);
    expect(validator.isValid('7.234332')).toBe(true);
  });

  it('Should rejct values that are not between 5 and 10', () => {
    const validator = new RangeValidator('error!', {'valRangeMin': 5, 'valRangeMax': 10});
    expect(validator.isValid('-1')).toBe(false);
    expect(validator.isValid(0)).toBe(false);
    expect(validator.isValid('11')).toBe(false);
    expect(validator.isValid('25')).toBe(false);
    expect(validator.isValid('4.999999999')).toBe(false);
    expect(validator.isValid('10.00000001')).toBe(false);
  });

});
