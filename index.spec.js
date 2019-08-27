import { validatorGroup, validator, BaseValidator } from './dist/index';

describe('Load module', () => {

  it('Allow ESM import statement', () => {
    expect(validatorGroup).toBeDefined();
    expect(validator).toBeDefined();
    expect(BaseValidator).toBeDefined();
  });

});
