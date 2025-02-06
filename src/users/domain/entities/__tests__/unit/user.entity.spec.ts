import { faker } from '@faker-js/faker';
import { UserProps } from '../../user.types';
import { UserEntity } from '../../user.entity';

describe('UserEntity unit tests', () => {
  let props: UserProps;
  let sut: UserEntity;

  beforeEach(() => {
    props = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    sut = new UserEntity(props);
  });

  it("Should correctly define and validate the user's name property", () => {
    expect(sut.name).toBeDefined();
    expect(sut.name).toEqual(props.name);
    expect(typeof sut.name).toBe('string');
  });

  it("Should correctly define and validate the user's email property", () => {
    expect(sut.email).toBeDefined();
    expect(sut.email).toEqual(props.email);
    expect(typeof sut.email).toBe('string');
  });

  it("Should correctly define and validate the user's password property", () => {
    expect(sut.password).toBeDefined();
    expect(sut.password).toEqual(props.password);
    expect(typeof sut.password).toBe('string');
  });

  it("Should correctly define and validate the user's createdAt property", () => {
    expect(sut.createdAt).toBeDefined();
    expect(sut.createdAt).toEqual(props.createdAt);
    expect(sut.createdAt).toBeInstanceOf(Date);
  });
});
