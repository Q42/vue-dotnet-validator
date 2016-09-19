import StringLengthValidator from '../tools/dotnet-validator/stringlengthvalidator';

describe('String length validator', () => {

  it('Should accept empty values', () => {
    const validator = new StringLengthValidator('error!', {'valLengthMin': 3, 'valLengthMax': 10});
    expect(validator.isValid('')).to.equal(true);
  });

  it('Should accept strings with lengths within range', () => {
    const validator = new StringLengthValidator('error!', {'valLengthMin': 3, 'valLengthMax': 10});
    expect(validator.isValid('dag')).to.equal(true);
    expect(validator.isValid('dingen')).to.equal(true);
    expect(validator.isValid('hallo dag!')).to.equal(true);
  });

  it('Should reject strings out of the limits of the range', () => {
    const validator = new StringLengthValidator('error!', {'valLengthMin': 3, 'valLengthMax': 10});
    expect(validator.isValid('hi')).to.equal(false);
    expect(validator.isValid('dit is te lang')).to.equal(false);
    expect(validator.isValid('dingen met spullen')).to.equal(false);
  });

});
