import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { ClassValidatorFields } from '../../class-validator-fields';
import { StubRulesProps } from './types';

class StubRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
  constructor(data: Partial<StubRulesProps>) {
    Object.assign(this, data);
  }
}

class StubClassValidatorFields extends ClassValidatorFields<StubRules> {
  isValid(data: Partial<StubRulesProps>): boolean {
    return super.isValid(new StubRules(data));
  }
}

describe('ClassValidatorFields integration tests', () => {
  it('Should validate fields with errors', () => {
    const validator = new StubClassValidatorFields();

    expect(validator.isValid({})).toBeFalsy();
    expect(validator.errors).toStrictEqual({
      name: [
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ],
      price: [
        'price should not be empty',
        'price must be a number conforming to the specified constraints',
      ],
    });
  });

  it('Should validate fields without errors', () => {
    const validator = new StubClassValidatorFields();

    expect(validator.isValid({ name: 'name', price: 10 })).toBeTruthy();
    expect(validator.errors).toBeUndefined();
  });
});
