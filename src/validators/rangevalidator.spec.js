import RangeValidator from '../tools/dotnet-validator/rangevalidator';

describe('Range validator', () => {

  it('Should ignore empty values', () => {
    const validator = new RangeValidator('error!', {'valRangeMin': 3, 'valRangeMax': 8});
    expect(validator.isValid('')).to.equal(true);
  });

  it('Should accept values that are between 5 and 10', () => {
    const validator = new RangeValidator('error!', {'valRangeMin': 5, 'valRangeMax': 10});
    expect(validator.isValid('5')).to.equal(true);
    expect(validator.isValid('5.0000001')).to.equal(true);
    expect(validator.isValid('10')).to.equal(true);
    expect(validator.isValid('7.5')).to.equal(true);
    expect(validator.isValid('7.234332')).to.equal(true);
  });

  it('Should rejct values that are not between 5 and 10', () => {
    const validator = new RangeValidator('error!', {'valRangeMin': 5, 'valRangeMax': 10});
    expect(validator.isValid('-1')).to.equal(false);
    expect(validator.isValid(0)).to.equal(false);
    expect(validator.isValid('11')).to.equal(false);
    expect(validator.isValid('25')).to.equal(false);
    expect(validator.isValid('4.999999999')).to.equal(false);
    expect(validator.isValid('10.00000001')).to.equal(false);
  });

});
