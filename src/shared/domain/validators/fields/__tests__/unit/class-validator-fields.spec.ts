import * as classValidator from 'class-validator';
import { ClassValidatorFields } from '../../class-validator-fields';
import { StubClassValidatorFieldsProps } from './types';

class StubClassValidatorFields extends ClassValidatorFields<StubClassValidatorFieldsProps> {}

describe('ClassValidatorFields unit tests', () => {
  it('Should initialize errors and validateData variables correctly', () => {
    const sut = new StubClassValidatorFields();
    expect(sut.errors).toBeUndefined();
    expect(sut.validatedData).toBeUndefined();
  });

  it('Should validate field with errors', () => {
    const spyValidateSync = jest.spyOn(classValidator, 'validateSync');
    spyValidateSync.mockReturnValue([
      { property: 'field', constraints: { isRequired: 'test error' } },
    ]);

    const sut = new StubClassValidatorFields();
    expect(sut.validate({ field: '' })).toBeFalsy();
    expect(spyValidateSync).toHaveBeenCalled();
    expect(sut.errors).toStrictEqual({ field: ['test error'] });
    expect(sut.validatedData).toBeUndefined();
  });

  it('Should validate field without errors', () => {
    const spyValidateSync = jest.spyOn(classValidator, 'validateSync');
    spyValidateSync.mockReturnValue([]);

    const value = 'value';
    const validateValue: StubClassValidatorFieldsProps = { field: value };

    const sut = new StubClassValidatorFields();
    expect(sut.validate(validateValue)).toBeTruthy();
    expect(spyValidateSync).toHaveBeenCalled();
    expect(sut.errors).toBeUndefined();
    expect(sut.validatedData).toStrictEqual(validateValue);
  });
});
