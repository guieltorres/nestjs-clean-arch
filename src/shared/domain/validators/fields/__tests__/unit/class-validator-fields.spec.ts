import * as classValidator from 'class-validator';
import { ClassValidatorFields } from '../../class-validator-fields';

class StubClassValidatorFields extends ClassValidatorFields<{
  field: string;
}> {}

describe('ClassValidatorFields unit tests', () => {
  it('Should initialize errors and validateData variables correctly', () => {
    const sut = new StubClassValidatorFields();
    expect(sut.errors).toBeNull();
    expect(sut.validatedData).toBeNull();
  });

  it('Should validate field with errors', () => {
    const spyValidateSync = jest.spyOn(classValidator, 'validateSync');
    spyValidateSync.mockReturnValue([
      { property: 'field', constraints: { isRequired: 'test error' } },
    ]);

    const sut = new StubClassValidatorFields();
    expect(sut.validate(null)).toBeFalsy();
    expect(spyValidateSync).toHaveBeenCalled();
    expect(sut.errors).toStrictEqual({ field: ['test error'] });
    expect(sut.validatedData).toBeNull();
  });

  it('Should validate field without errors', () => {
    const spyValidateSync = jest.spyOn(classValidator, 'validateSync');
    spyValidateSync.mockReturnValue([]);

    const value = 'value';
    const validatedValue = { field: value };

    const sut = new StubClassValidatorFields();
    expect(sut.validate(validatedValue)).toBeTruthy();
    expect(spyValidateSync).toHaveBeenCalled();
    expect(sut.errors).toBeNull();
    expect(sut.validatedData).toStrictEqual(validatedValue);
  });
});
