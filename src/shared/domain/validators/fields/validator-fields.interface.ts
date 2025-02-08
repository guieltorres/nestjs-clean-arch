import { FieldErrors } from './types';

interface ValidatorFieldInterface<PropsValidated> {
  errors: FieldErrors;
  validatedData: PropsValidated;
  isValid(data: PropsValidated): boolean;
}

export type { ValidatorFieldInterface };
