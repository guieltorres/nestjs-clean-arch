import { FieldErrors } from '../validators/fields/types';

class ValidationError extends Error {}

class EntityValidationError extends Error {
  constructor(public error: FieldErrors) {
    super('Entity validation error');
    this.name = 'EntityValidationError';
  }
}

export { EntityValidationError, ValidationError };
