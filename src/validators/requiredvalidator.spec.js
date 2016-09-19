import RequiredValidator from '../tools/dotnet-validator/requiredvalidator';

describe('Required validator', () => {

  it('Should accept values', () => {
    const validator = new RequiredValidator('error!');
    expect(validator.isValid('1')).to.equal(true);
    expect(validator.isValid('hisudhuf s')).to.equal(true);
    expect(validator.isValid('DGSFH DFSHFDS')).to.equal(true);
  });

  it('Should reject empty values', () => {
    const validator = new RequiredValidator('error!');
    expect(validator.isValid('')).to.equal(false);
  });

});
