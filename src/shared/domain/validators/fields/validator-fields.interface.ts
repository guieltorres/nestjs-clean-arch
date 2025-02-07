import { FieldErrors } from './types';

interface ValidatorFieldInterface<PropsValidated> {
  errors: FieldErrors | null;
  validatedData: PropsValidated | null;
  validate(data: any): boolean;
}

export type { ValidatorFieldInterface };
