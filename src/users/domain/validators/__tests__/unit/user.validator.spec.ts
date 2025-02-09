import { UserDataBuilder } from '@/users/domain/tests/helpers/user-data-builder';
import {
  UserRules,
  UserValidatorFactory,
  UserValidatorFields,
} from '../../user.validator';

describe('UserValidator unit tests', () => {
  let sut: UserValidatorFields;

  beforeEach(() => {
    sut = UserValidatorFactory.create();
  });

  describe('Name field', () => {
    it('Should validate name field with invalid values', () => {
      const isValid = sut.isValid({});

      expect(isValid).toBeFalsy();
      expect(sut.errors['name']).toStrictEqual([
        'name must be a string',
        'name should not be empty',
        'name must be shorter than or equal to 255 characters',
      ]);
    });

    it('Should validate name field with invalid length', () => {
      const name = 'a'.repeat(256);
      const userProps = { ...UserDataBuilder(), name: name };
      const isValid = sut.isValid(userProps);

      expect(isValid).toBeFalsy();
      expect(sut.errors['name']).toStrictEqual([
        'name must be shorter than or equal to 255 characters',
      ]);
    });

    it('Should validate name field with empty value', () => {
      const userProps = { ...UserDataBuilder(), name: '' };
      const isValid = sut.isValid(userProps);

      expect(isValid).toBeFalsy();
      expect(sut.errors['name']).toStrictEqual(['name should not be empty']);
    });

    it('Should validate name field with invalid type', () => {
      const name = 1234 as any;
      const userProps = { ...UserDataBuilder(), name: name };
      const isValid = sut.isValid(userProps);

      expect(isValid).toBeFalsy();
      expect(sut.errors['name']).toStrictEqual([
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ]);
    });

    it('Should validate name field without errors', () => {
      const userProps = UserDataBuilder();
      const isValid = sut.isValid(userProps);

      expect(isValid).toBeTruthy();
      expect(sut.errors).toBeUndefined();
      expect(sut.validatedData).toStrictEqual(new UserRules(userProps));
    });
  });
});
