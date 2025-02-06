import { faker } from '@faker-js/faker';
import { UserProps } from '../../entities/user.types';

export const UserDataBuilder = ({
  name,
  email,
  password,
  createdAt,
}: Partial<UserProps> = {}): UserProps => {
  return {
    name: name ?? faker.person.fullName(),
    email: email ?? faker.internet.email(),
    password: password ?? faker.internet.password(),
    createdAt,
  };
};
