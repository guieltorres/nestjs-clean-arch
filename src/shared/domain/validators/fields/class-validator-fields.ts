import { validateSync, ValidationError } from 'class-validator';
import { FieldErrors } from './types';
import { ValidatorFieldInterface } from './validator-fields.interface';

export abstract class ClassValidatorFields<PropsValidated>
  implements ValidatorFieldInterface<PropsValidated>
{
  errors: FieldErrors = null;
  validatedData: PropsValidated | null = null;
  validate(data: any): boolean {
    const errors = validateSync(data);
    const hasErrors = errors.length > 0;
    if (hasErrors) {
      this.errors = this.formatErrors(errors);
      return false;
    }
    this.validatedData = data;
    return true;
  }

  private formatErrors(errors: ValidationError[]): FieldErrors {
    return errors.reduce((acc, error) => {
      if (acc) acc[error.property] = Object.values(error.constraints ?? {});
      return acc;
    }, {});
  }
}
