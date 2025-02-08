import { FieldErrors } from './types';

interface ValidatorFieldInterface<PropsValidated> {
  errors: FieldErrors;
  validatedData: PropsValidated;
  validate(data: PropsValidated): boolean;
}

export type { ValidatorFieldInterface };
