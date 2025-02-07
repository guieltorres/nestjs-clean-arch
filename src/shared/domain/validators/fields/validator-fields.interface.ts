import { FieldErrors } from './types';

interface ValidatorFieldInterface<PropsValidated> {
  errors: FieldErrors;
  validatedData: PropsValidated;
  validate(data: any): boolean;
}

export type { ValidatorFieldInterface };
