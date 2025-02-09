import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { UserDataBuilder } from '@/users/domain/tests/helpers/user-data-builder';
import { UserEntity } from '../../user.entity';
import { UserProps } from '../../user.types';

enum UserErrorTypeEnum {
  Empty = 'empty',
  InvalidType = 'invalid type',
  TooLong = 'too long',
  InvalidValue = 'invalid value',
}

describe('UserEntity integration tests', () => {
  const longString = 'a'.repeat(256);
  const invalidNumber = 1234;
  const invalidString = 'a';

  describe('Constructor method', () => {
    const invalidCases = [
      { field: 'name', value: '', errorType: UserErrorTypeEnum.Empty },
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
      { field: 'email', value: '', errorType: UserErrorTypeEnum.Empty },
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
      { field: 'password', value: '', errorType: UserErrorTypeEnum.Empty },
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

    it('Should create a valid user', () => {
      expect.assertions(0);
      const userProps: UserProps = UserDataBuilder();
      new UserEntity(userProps);
    });
  });
});
