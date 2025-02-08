import { validateSync, ValidationError } from 'class-validator';
import { FieldErrors } from './types';
import { ValidatorFieldInterface } from './validator-fields.interface';

export abstract class ClassValidatorFields<PropsValidated>
  implements ValidatorFieldInterface<PropsValidated>
{
  errors: FieldErrors;
  validatedData: PropsValidated;
  validate(data: PropsValidated): boolean {
    const errors = validateSync(data as object);
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
