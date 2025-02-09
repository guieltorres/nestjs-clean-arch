import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { UserDataBuilder } from '@/users/domain/tests/helpers/user-data-builder';
import { faker } from '@faker-js/faker';
import { UserEntity } from '../../user.entity';
import { UserProps } from '../../user.types';

enum UserErrorTypeEnum {
  Empty = 'empty',
  InvalidType = 'invalid type',
  TooLong = 'too long',
  InvalidValue = 'invalid value',
}

describe('UserEntity integration tests', () => {
  const emptyValue = '';
  const longString = 'a'.repeat(256);
  const invalidNumber = 1234;
  const invalidString = 'a';

  describe('Constructor method', () => {
    const invalidCases = [
      { field: 'name', value: emptyValue, errorType: UserErrorTypeEnum.Empty },
      {
        field: 'name',
        value: invalidNumber,
        errorType: UserErrorTypeEnum.InvalidType,
      },
      {
        field: 'name',
        value: longString,
        errorType: UserErrorTypeEnum.TooLong,
      },
      { field: 'email', value: emptyValue, errorType: UserErrorTypeEnum.Empty },
      {
        field: 'email',
        value: invalidNumber,
        errorType: UserErrorTypeEnum.InvalidType,
      },
      {
        field: 'email',
        value: longString,
        errorType: UserErrorTypeEnum.TooLong,
      },
      {
        field: 'email',
        value: invalidString,
        errorType: UserErrorTypeEnum.InvalidValue,
      },
      {
        field: 'password',
        value: emptyValue,
        errorType: UserErrorTypeEnum.Empty,
      },
      {
        field: 'password',
        value: invalidNumber,
        errorType: UserErrorTypeEnum.InvalidType,
      },
      {
        field: 'password',
        value: longString,
        errorType: UserErrorTypeEnum.TooLong,
      },
      {
        field: 'createdAt',
        value: invalidString,
        errorType: UserErrorTypeEnum.InvalidType,
      },
      {
        field: 'createdAt',
        value: invalidNumber,
        errorType: UserErrorTypeEnum.InvalidType,
      },
    ];

    it.each(invalidCases)(
      'Should throw an error when creating a user with $errorType $field',
      ({ field, value }) => {
        const userProps: UserProps = UserDataBuilder({ [field]: value });

        expect(() => new UserEntity(userProps)).toThrow(EntityValidationError);
      },
    );

    it('Should create a user correctly', () => {
      expect.assertions(0);
      const userProps: UserProps = UserDataBuilder();
      new UserEntity(userProps);
    });
  });

  describe('Update method', () => {
    it('Should throw an error when update a user name with an invalid value', () => {
      const userProps = UserDataBuilder();
      const user = new UserEntity(userProps);

      expect(() => user.update(emptyValue)).toThrow(EntityValidationError);
      expect(() => user.update(invalidNumber as any)).toThrow(
        EntityValidationError,
      );
      expect(() => user.update(longString)).toThrow(EntityValidationError);
    });

    it('Should update a user correctly', () => {
      expect.assertions(0);
      const userProps = UserDataBuilder();
      const user = new UserEntity(userProps);
      user.update('value');
    });

    it('Should throw an error when update a user password with an invalid value', () => {
      const userProps = UserDataBuilder();
      const user = new UserEntity(userProps);

      expect(() => user.updatePassword(emptyValue)).toThrow(
        EntityValidationError,
      );
      expect(() => user.updatePassword(invalidNumber as any)).toThrow(
        EntityValidationError,
      );
      expect(() => user.updatePassword(longString)).toThrow(
        EntityValidationError,
      );
    });

    it('Should update a user password correctly', () => {
      expect.assertions(0);
      const userProps = UserDataBuilder();
      const user = new UserEntity(userProps);
      const password = faker.internet.password();
      user.updatePassword(password);
    });
  });
});
