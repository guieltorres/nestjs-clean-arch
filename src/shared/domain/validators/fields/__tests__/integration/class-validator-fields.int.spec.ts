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
  constructor({ name, price }: Partial<StubRulesProps>) {
    Object.assign(this, { name, price });
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
    const props: StubRulesProps = { name: 'name', price: 10 };

    expect(validator.isValid(props)).toBeTruthy();
    expect(validator.validatedData).toStrictEqual(new StubRules(props));
    expect(validator.errors).toBeUndefined();
  });
});
